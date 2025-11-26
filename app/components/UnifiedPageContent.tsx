"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import UnifiedOverviewMDX from "../unified-overview.mdx";
import UnifiedSendServiceMDX from "../unified-send-service.mdx";
import UnifiedSdkMDX from "../unified-sdk.mdx";
import UnifiedOtpServiceMDX from "../unified-otp-service.mdx";
import UnifiedReportsMDX from "../unified-reports.mdx";
import UnifiedInboxMDX from "../unified-inbox.mdx";

// Map routes to their main menu unified files
const routeToUnifiedFile: Record<string, React.ComponentType> = {
  "/": UnifiedOverviewMDX,
  "/guides/sdk": UnifiedSdkMDX,
  "/guides/web-service-send": UnifiedSendServiceMDX,
  "/guides/send-single": UnifiedSendServiceMDX,
  "/guides/send-bulk": UnifiedSendServiceMDX,
  "/guides/send-bulk-peer-to-peer": UnifiedSendServiceMDX,
  "/guides/otp-service": UnifiedOtpServiceMDX,
  "/guides/sendOtpSms": UnifiedOtpServiceMDX,
  "/guides/send-otp-new": UnifiedOtpServiceMDX,
  "/guides/otp-template-params": UnifiedOtpServiceMDX,
  "/reports/outbox-status": UnifiedReportsMDX,
  "/inbox": UnifiedInboxMDX,
  "/inbox/latest-100": UnifiedInboxMDX,
  "/inbox/paginated": UnifiedInboxMDX,
};

// Map section IDs to their unified files
const sectionIdToUnifiedFile: Record<string, React.ComponentType> = {
  "home": UnifiedOverviewMDX,
  "sdk": UnifiedSdkMDX,
  "send-single": UnifiedSendServiceMDX,
  "send-bulk": UnifiedSendServiceMDX,
  "send-bulk-peer-to-peer": UnifiedSendServiceMDX,
  "send-otp-sms": UnifiedOtpServiceMDX,
  "send-otp-new": UnifiedOtpServiceMDX,
  "otp-template-params": UnifiedOtpServiceMDX,
  "outbox-status": UnifiedReportsMDX,
  "inbox-latest-100": UnifiedInboxMDX,
  "inbox-paginated": UnifiedInboxMDX,
};

// Map section IDs to their actual routes
const sectionIdToRoute: Record<string, string> = {
  "home": "/",
  "sdk": "/guides/sdk",
  "send-single": "/guides/send-single",
  "send-bulk": "/guides/send-bulk",
  "send-bulk-peer-to-peer": "/guides/send-bulk-peer-to-peer",
  "send-otp-sms": "/guides/sendOtpSms",
  "send-otp-new": "/guides/send-otp-new",
  "otp-template-params": "/guides/otp-template-params",
  "outbox-status": "/reports/outbox-status",
  "inbox-latest-100": "/inbox/latest-100",
  "inbox-paginated": "/inbox/paginated",
};

interface UnifiedPageContentProps {
  activeSectionId?: string;
}

export function UnifiedPageContent({ activeSectionId }: UnifiedPageContentProps) {
  const pathname = usePathname();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const observerRefs = useRef<IntersectionObserver[]>([]);

  // Helper function to update Scalar box visibility based on active section
  const resetScalarVisibility = useCallback(() => {
    const unifiedContent = document.querySelector(".unified-page-content");
    if (!unifiedContent) return;

    const scalarWrappers =
      unifiedContent.querySelectorAll<HTMLElement>(
        ".scalar-api-wrapper[data-scalar-section]"
      );
    scalarWrappers.forEach((wrapper) => {
      wrapper.style.display = "";
      wrapper.classList.remove("scalar-api-wrapper--active");
      wrapper.dataset.active = "false";
    });
  }, []);

  const updateScalarVisibility = useCallback(
    (activeSectionId: string) => {
      if (!activeSectionId) return;

      const unifiedContent = document.querySelector(".unified-page-content");
      if (!unifiedContent) return;

      const scalarWrappers =
        unifiedContent.querySelectorAll<HTMLElement>(
          ".scalar-api-wrapper[data-scalar-section]"
        );
      scalarWrappers.forEach((wrapper) => {
        const scalarSectionId = wrapper.getAttribute("data-scalar-section");
        const isActive = scalarSectionId === activeSectionId;
        wrapper.style.display = "";
        wrapper.dataset.active = isActive ? "true" : "false";
        wrapper.classList.toggle("scalar-api-wrapper--active", Boolean(isActive));
      });
    },
    []
  );

  // Initial Scalar visibility setup - hide all, then show only the active one
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetScalarVisibility();

      // Highlight the active one if we have an activeSectionId
      if (activeSectionId) {
        updateScalarVisibility(activeSectionId);
      } else {
        // If no activeSectionId, try to determine from URL hash or pathname
        const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
        if (hash) {
          updateScalarVisibility(hash);
        } else {
          // Fallback: try to determine from pathname (legacy routes)
          const inboxRoutes = ["/inbox/latest-100", "/inbox/paginated"];
          if (pathname && inboxRoutes.includes(pathname)) {
            const sectionId = pathname === "/inbox/latest-100" ? "inbox-latest-100" : "inbox-paginated";
            updateScalarVisibility(sectionId);
          }
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, activeSectionId, updateScalarVisibility, resetScalarVisibility]);

  // Scroll to section when activeSectionId changes and update Scalar visibility
  useEffect(() => {
    if (activeSectionId) {
      // Update Scalar visibility first
      updateScalarVisibility(activeSectionId);
      
      const sectionElement = sectionRefs.current[activeSectionId];
      if (sectionElement) {
        const headerOffset = 80;
        const elementPosition = sectionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeSectionId, updateScalarVisibility]);

  // Set up intersection observers for auto-scrolling between sections within the same main menu
  useEffect(() => {
    // Wait for content to load
    const timeoutId = setTimeout(() => {
      // Clean up previous observers
      observerRefs.current.forEach((observer) => observer.disconnect());
      observerRefs.current = [];

      // Only get sections from the currently loaded unified file (same main menu)
      const allSections = Array.from(document.querySelectorAll<HTMLElement>(".unified-section"));
      
      // Filter sections to only include those in the current unified file
      // All sections in the same unified file are siblings, so we can use the parent container
      const currentUnifiedFile = document.querySelector(".unified-page-content");
      if (!currentUnifiedFile) return;

      const sectionsInCurrentMenu = allSections.filter(section => 
        currentUnifiedFile.contains(section)
      );
      
      // Track which section is most visible for Scalar visibility updates
      const sectionVisibility = new Map<string, number>();

      sectionsInCurrentMenu.forEach((sectionElement, index) => {
        const sectionId = sectionElement.id;
        if (!sectionId) return;

        sectionRefs.current[sectionId] = sectionElement;

        // Observe the section header to determine visibility
        const sectionHeader = sectionElement.querySelector<HTMLElement>('.unified-section__header');
        if (!sectionHeader) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                sectionVisibility.set(sectionId, entry.intersectionRatio);
                
                // Find the most visible section
                let maxRatio = 0;
                let mostVisibleSection = sectionId;
                sectionVisibility.forEach((ratio, id) => {
                  if (ratio > maxRatio) {
                    maxRatio = ratio;
                    mostVisibleSection = id;
                  }
                });
                
                // Update Scalar visibility for the most visible section
                updateScalarVisibility(mostVisibleSection);
              } else {
                sectionVisibility.delete(sectionId);
              }
            });
          },
          {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0, 0.25, 0.5, 0.75, 1],
          }
        );

        observer.observe(sectionHeader);
        observerRefs.current.push(observer);

        // Create sentinel element at the end of each section for auto-scroll
        const sentinel = document.createElement("div");
        sentinel.className = "section-sentinel";
        sentinel.style.height = "1px";
        sentinel.style.width = "100%";
        sentinel.style.position = "absolute";
        sentinel.style.bottom = "0";
        sentinel.style.pointerEvents = "none";

        // Check if sentinel already exists
        const existingSentinel = sectionElement.querySelector(".section-sentinel");
        if (existingSentinel) {
          existingSentinel.remove();
        }

        sectionElement.style.position = "relative";
        sectionElement.appendChild(sentinel);

        const sentinelObserver = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry?.isIntersecting) {
              // Check if user is near the bottom of the viewport
              const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.scrollHeight - 150;

              // Only auto-scroll to next section if it's within the same main menu
              if (nearBottom && index < sectionsInCurrentMenu.length - 1) {
                // Auto-scroll to next section within the same main menu
                const nextSection = sectionsInCurrentMenu[index + 1];
                if (nextSection) {
                  const headerOffset = 80;
                  const elementPosition = nextSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });

                  // Update URL hash without triggering scroll
                  const nextSectionId = nextSection.id;
                  if (nextSectionId) {
                    window.history.replaceState(
                      null,
                      "",
                      `#${nextSectionId}`
                    );
                    setCurrentSectionIndex(index + 1);
                    // Update Scalar visibility for next section
                    updateScalarVisibility(nextSectionId);
                  }
                }
              }
            }
          },
          {
            root: null,
            rootMargin: "0px 0px -20% 0px",
            threshold: 0,
          }
        );

        sentinelObserver.observe(sentinel);
        observerRefs.current.push(sentinelObserver);
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      observerRefs.current.forEach((observer) => observer.disconnect());
    };
  }, [activeSectionId, updateScalarVisibility]);

  // Hide sections that don't match the current pathname
  useEffect(() => {
    if (!pathname) return;
    
    // Unified routes that should show ALL sections
    const unifiedRoutes = [
      "/guides/web-service-send",
      "/guides/otp-service",
      "/inbox",
    ];
    
    // Routes that should show ALL sections (legacy routes - for backward compatibility)
    const showAllSectionsRoutes = [
      "/guides/sendOtpSms",
      "/guides/send-otp-new",
      "/guides/otp-template-params",
      "/inbox/latest-100",
      "/inbox/paginated",
    ];
    
    // Routes that should hide non-matching sections
    const hideNonMatchingRoutes = [
      "/guides/send-single",
      "/guides/send-bulk",
      "/guides/send-bulk-peer-to-peer",
    ];
    
    // Check if current route is a unified route
    const isUnifiedRoute = unifiedRoutes.includes(pathname);
    
    // For unified routes and legacy routes, show all sections and scroll to matching one
    if (isUnifiedRoute || showAllSectionsRoutes.includes(pathname)) {
      const unifiedContent = document.querySelector(".unified-page-content");
      if (!unifiedContent) return;

      const allSections = unifiedContent.querySelectorAll<HTMLElement>(".unified-section[data-section-route]");
      
      // Show all sections
      allSections.forEach((section) => {
        section.style.display = "";
      });

      // Show all dividers
      const allDividers = unifiedContent.querySelectorAll<HTMLElement>(".unified-section__divider");
      allDividers.forEach((divider) => {
        divider.style.display = "";
      });
      
      // Scroll to matching section based on hash or route
      const hash = window.location.hash.slice(1);
      let targetSectionId = hash;
      
      // If no hash, try to find section matching current route
      if (!targetSectionId) {
        const matchingSection = Array.from(allSections).find((section) => {
          const sectionRoute = section.getAttribute("data-section-route");
          return sectionRoute === pathname;
        });
        if (matchingSection) {
          targetSectionId = matchingSection.id;
        }
      }
      
      // Ensure all scalar boxes stay visible
      resetScalarVisibility();

      if (targetSectionId) {
        updateScalarVisibility(targetSectionId);
      }
      
      // Scroll to target section
      if (targetSectionId) {
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
          setTimeout(() => {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
            
            // Update hash in URL if not already set
            if (!hash && window.location.hash !== `#${targetSectionId}`) {
              window.history.replaceState(null, "", `#${targetSectionId}`);
            }
          }, 300);
        }
      }
      
      return;
    }
    
    // For other routes, hide non-matching sections
    if (!hideNonMatchingRoutes.includes(pathname)) {
      return;
    }
    
    const hideNonMatchingSections = () => {
      const unifiedContent = document.querySelector(".unified-page-content");
      if (!unifiedContent) return;

      const allSections = unifiedContent.querySelectorAll<HTMLElement>(".unified-section[data-section-route]");
      
      // First, show all sections by default
      allSections.forEach((section) => {
        section.style.display = "";
      });
      
      // Then hide only the ones that don't match
      allSections.forEach((section) => {
        const sectionRoute = section.getAttribute("data-section-route");
        if (sectionRoute && sectionRoute !== pathname) {
          section.style.display = "none";
        }
      });
      
      // Also hide dividers that come after or before hidden sections
      const allDividers = unifiedContent.querySelectorAll<HTMLElement>(".unified-section__divider");
      allDividers.forEach((divider) => {
        const prevSection = divider.previousElementSibling as HTMLElement;
        const nextSection = divider.nextElementSibling as HTMLElement;
        const prevHidden = prevSection && prevSection.style.display === "none";
        const nextHidden = nextSection && nextSection.style.display === "none";
        
        if (prevHidden || nextHidden) {
          divider.style.display = "none";
        } else {
          divider.style.display = "";
        }
      });
    };

    // Run after a delay to ensure DOM is ready
    const timeoutId = setTimeout(hideNonMatchingSections, 100);
    const timeoutId2 = setTimeout(hideNonMatchingSections, 500);

      return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [pathname, activeSectionId, updateScalarVisibility, resetScalarVisibility]);

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const sectionElement = document.getElementById(hash);
        if (sectionElement) {
          const allSections = Array.from(document.querySelectorAll<HTMLElement>(".unified-section"));
          const sectionIndex = allSections.findIndex((s) => s.id === hash);
          if (sectionIndex !== -1) {
            setCurrentSectionIndex(sectionIndex);
            // Update Scalar visibility when hash changes
            updateScalarVisibility(hash);
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [updateScalarVisibility]);

  // Determine which unified file to load based on pathname
  const getUnifiedComponent = () => {
    if (pathname && pathname !== "/") {
      return routeToUnifiedFile[pathname] || null;
    }
    return null;
  };

  const UnifiedComponent = getUnifiedComponent();
  
  // Don't render if no unified component found or on home page
  if (!UnifiedComponent || pathname === "/") {
    return null;
  }

  return (
    <div className="unified-page-content">
      <UnifiedComponent />
    </div>
  );
}

