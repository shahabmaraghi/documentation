"use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItem = {
  title: string;
  href: string;
  external?: boolean;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};

type NavSection = {
  title: string;
  description?: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    title: "مرور کلی",
    description: "راهنمای شروع و معرفی سرویس قاصدک",
    items: [
      {
        title: "نمای کلی مستندات",
        href: "/",
      },
    ],
  },
  {
    title: "وب سرویس ارسال",
    description: "انواع روش‌های ارسال پیامک از طریق وب‌سرویس",
    items: [
      { title: "ارسال تکی", href: "/guides/send-single", method: "POST" },
      { title: "ارسال گروهی", href: "/guides/send-bulk", method: "POST" },
      {
        title: "ارسال گروهی نظیر به نظیر",
        href: "/guides/send-bulk-peer-to-peer",
        method: "POST",
      },
    ],
  },
  {
    title: "کتابخانه‌ها و SDK",
    description: "کتابخانه‌های آماده برای زبان‌های برنامه‌نویسی مختلف",
    items: [
      { title: "SDK", href: "/guides/sdk" },
    ],
  },
  {
    title: "سرویس اعتبار سنجی",
    description: "مدیریت کامل پیامک‌های OTP و قالب‌ها",
    items: [
      {
        title: "ارسال پیامک اعتبار سنجی (OTP)",
        href: "/guides/sendOtpSms",
        method: "POST",
      },
      {
        title: "ارسال پیامک OTP جدید",
        href: "/guides/send-otp-new",
        method: "POST",
      },
      {
        title: "دریافت پارامترهای قالب OTP",
        href: "/guides/otp-template-params",
        method: "GET",
      },
    ],
  },
  {
    title: "گزارش وضعیت",
    description: "مشاهده وضعیت و جزئیات پیام‌های ارسال‌شده",
    items: [
      {
        title: "وضعیت پیام های ارسالی",
        href: "/reports/outbox-status",
        method: "GET",
      },
    ],
  },
  {
    title: "پیام های دریافتی",
    description: "گزارش پیام‌های ورودی خطوط شما",
    items: [
      {
        title: "100 پیام آخر",
        href: "/inbox/latest-100",
        method: "GET",
      },
      {
        title: "صفحه بندی",
        href: "/inbox/paginated",
        method: "GET",
      },
    ],
  },
];

const ROOT_SECTION_KEY = "__root__";

const findSectionTitleForHref = (href?: string | null): string | null => {
  if (!href) {
    return null;
  }
  for (const section of navSections) {
    if (section.items.some((item) => item.href === href)) {
      return section.title;
    }
  }
  return null;
};

const getSectionKey = (title: string | null) => title ?? ROOT_SECTION_KEY;

const getSectionLabel = (key: string) =>
  key === ROOT_SECTION_KEY ? "سایر صفحات" : key;

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSectionTitle = useMemo(
    () => findSectionTitleForHref(pathname),
    [pathname]
  );
  const initialSectionKey = getSectionKey(currentSectionTitle);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(() =>
    navSections.reduce<Record<string, boolean>>((accumulator, section) => {
      accumulator[section.title] = true;
      return accumulator;
    }, {})
  );
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  const autoAdvanceLockRef = useRef(false);
  const articleEndRef = useRef<HTMLDivElement | null>(null);
  const isManualNavigationRef = useRef(false);
  const [sectionStacks, setSectionStacks] = useState<Record<string, string[]>>(
    () => (pathname ? { [initialSectionKey]: [pathname] } : {})
  );
  const [visitedSectionOrder, setVisitedSectionOrder] = useState<string[]>(
    pathname ? [initialSectionKey] : []
  );
  const [pageSnapshots, setPageSnapshots] = useState<Record<string, string>>(
    {}
  );
  const normalizedQuery = searchTerm.trim().toLowerCase();
  const isSearchMode = normalizedQuery.length > 0;
  const orderedNavItems = useMemo(
    () =>
      navSections.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          sectionTitle: section.title,
        }))
      ),
    []
  );

  const filteredNavSections = useMemo(() => {
    if (!normalizedQuery) {
      return navSections;
    }

    return navSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.title.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [normalizedQuery]);

  const handleToggleSection = useCallback((title: string) => {
    setExpandedSections((current) => ({
      ...current,
      [title]: !(current[title] ?? true),
    }));
  }, []);

  const captureSnapshot = useCallback(() => {
    if (!pathname) {
      return;
    }

    const pageElement = document.querySelector<HTMLElement>(
      `.doc-article__page[data-page-href="${pathname}"]`
    );

    if (!pageElement || !pageElement.innerHTML) {
      return;
    }

    setPageSnapshots((previous) => {
      const nextMarkup = pageElement.innerHTML;
      const existingMarkup = previous[pathname];
      if (
        existingMarkup &&
        existingMarkup.length >= nextMarkup.length
      ) {
        return previous;
      }
      return {
        ...previous,
        [pathname]: nextMarkup,
      };
    });
  }, [pathname]);

  useEffect(() => {
    const snapshotTimer = window.setTimeout(captureSnapshot, 1200);
    return () => window.clearTimeout(snapshotTimer);
  }, [captureSnapshot, children]);

  useEffect(() => {
    const handleScalarReady = (event: Event) => {
      const detail = (event as CustomEvent<{ pathname: string }>).detail;
      if (!detail || detail.pathname !== pathname) {
        return;
      }
      captureSnapshot();
    };

    window.addEventListener(
      "ghasedak:scalar-ready",
      handleScalarReady as EventListener
    );
    return () =>
      window.removeEventListener(
        "ghasedak:scalar-ready",
        handleScalarReady as EventListener
      );
  }, [captureSnapshot, pathname]);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const isManual = isManualNavigationRef.current;
    const sectionKey = getSectionKey(currentSectionTitle);

    if (isManual) {
      setSectionStacks({
        [sectionKey]: [pathname],
      });
      setVisitedSectionOrder([sectionKey]);
    } else {
      setSectionStacks((previous) => {
        const currentStack = previous[sectionKey] ?? [];
        if (currentStack.includes(pathname)) {
          return previous;
        }
        return {
          ...previous,
          [sectionKey]: [...currentStack, pathname],
        };
      });

      setVisitedSectionOrder((previous) => {
        if (previous.includes(sectionKey)) {
          return previous;
        }
        return [...previous, sectionKey];
      });
    }

    setActiveMenuItem(pathname);
    const parentSection = navSections.find((section) =>
      section.items.some((item) => item.href === pathname)
    );
    if (parentSection) {
      setExpandedSections((current) => ({
        ...current,
        [parentSection.title]: true,
      }));
    }

    if (isManual) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const hideLoadingTimer = window.setTimeout(() => {
      setIsNavigating(false);
    }, 300);

    isManualNavigationRef.current = false;

    const timeoutId = window.setTimeout(() => {
      autoAdvanceLockRef.current = false;
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(hideLoadingTimer);
    };
  }, [currentSectionTitle, orderedNavItems, pathname]);

  useEffect(() => {
    if (!activeItemRef.current || isMobileViewport) {
      return;
    }
    activeItemRef.current.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeMenuItem, isMobileViewport]);

  useEffect(() => {
    const sentinel = articleEndRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          !entry?.isIntersecting ||
          autoAdvanceLockRef.current ||
          !pathname
        ) {
          return;
        }

        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 120;

        if (!nearBottom) {
          return;
        }

        const currentIndex = orderedNavItems.findIndex(
          (item) => item.href === pathname
        );
        if (currentIndex === -1) {
          return;
        }

        const currentItem = orderedNavItems[currentIndex];
        const nextItem = orderedNavItems[currentIndex + 1];
        if (
          !nextItem ||
          !currentItem ||
          nextItem.sectionTitle !== currentItem.sectionTitle
        ) {
          return;
        }

        autoAdvanceLockRef.current = true;
        captureSnapshot();
        router.push(nextItem.href);
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [orderedNavItems, pathname, router, captureSnapshot]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    const body = document.body;
    body.classList.remove("is-dark");
    if (!body.classList.contains("is-light")) {
      body.classList.add("is-light");
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (isMobileViewport) {
      setSidebarOpen(true);
      return;
    }

    setSidebarOpen(false);
  }, [isMobileViewport]);

  useEffect(() => {
    if (sidebarOpen && isMobileViewport) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen, isMobileViewport]);

  return (
    <div className={`doc-shell ${isNavigating ? 'doc-freeze' : ''}`}>
      {isNavigating && (
        <>
          <div className="doc-route-backdrop" />
          <div className="doc-route-loader">
            <div className="doc-route-loader__spinner"></div>
            <p className="doc-route-loader__text">در حال بارگذاری...</p>
          </div>
        </>
      )}
      <header className="doc-header">
        <div className="doc-header__brand">
          <button
            className="doc-header__menu-toggle"
            type="button"
            onClick={() => {
              if (isMobileViewport) {
                setSidebarOpen((previous) => !previous);
              }
            }}
            aria-label={sidebarOpen ? "بستن فهرست" : "باز کردن فهرست"}
            aria-expanded={isMobileViewport ? sidebarOpen : false}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {sidebarOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
          <Link href="/" className="doc-logo">
            <span className="doc-logo__symbol">
              <img src="/images/logo.png" alt="logo" width={32} height={32} />
            </span>
            <span className="doc-logo__text">مستندات اس ام اس قاصدک</span>
          </Link>
        </div>
        <nav className="doc-header__nav" aria-label="Primary">
          <div className="doc-header__controls">
            {/* Theme toggle removed per design request */}
          </div>
        </nav>
      </header>

      {sidebarOpen && isMobileViewport && (
        <div
          className="doc-sidebar__backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="doc-main">
        <aside
          className={`doc-sidebar ${sidebarOpen ? "is-open" : ""}`}
          aria-label="Documentation navigation"
        >
          <div className="doc-sidebar__content">
            {isMobileViewport ? (
              <div className="doc-sidebar__mobile-header">
                <p className="doc-sidebar__mobile-title">فهرست مستندات</p>
                <button
                  type="button"
                  className="doc-sidebar__mobile-close"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="بستن منو"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>بستن</span>
                </button>
              </div>
            ) : null}
            <div className="doc-search">
              <input
                className="doc-search__input"
                placeholder="جست و جو در مستندات ..."
                type="search"
                aria-label="Search documentation"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {searchTerm.trim() && filteredNavSections.length === 0 ? (
                <p className="doc-search__empty-state">نتیجه ای یافت نشد.</p>
              ) : null}
            </div>
            {filteredNavSections.map((section) => {
              const sectionId = `${section.title.replace(/\s+/g, "-")}-items`;
              const isExpanded =
                isSearchMode ? true : expandedSections[section.title] ?? true;

              return (
                <section key={section.title} className="doc-sidebar__section">
                  <header className="doc-sidebar__section-header">
                    <button
                      type="button"
                      className="doc-sidebar__section-toggle"
                      onClick={() => {
                        if (!isSearchMode) {
                          handleToggleSection(section.title);
                        }
                      }}
                      aria-expanded={isExpanded}
                      aria-controls={sectionId}
                      data-expanded={isExpanded}
                      disabled={isSearchMode}
                    >
                      <span className="doc-sidebar__section-title">
                        {section.title}
                      </span>
                      <svg
                        className="doc-sidebar__section-arrow"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </button>
                    {section.description ? <p>{section.description}</p> : null}
                  </header>
                  {isExpanded && (
                    <ul id={sectionId}>
                      {section.items.map((item) => {
                        const isActive = activeMenuItem === item.href;
                        return (
                          <li
                            key={item.href}
                            ref={isActive ? activeItemRef : null}
                            className={
                              isActive ? "doc-sidebar__item--active" : ""
                            }
                          >
                        <Link
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer" : undefined}
                              className={
                                isActive ? "doc-sidebar__link--active" : ""
                              }
                              onClick={() => {
                            captureSnapshot();
                                isManualNavigationRef.current = true;
                                setIsNavigating(true);
                                if (isMobileViewport) {
                                  setSidebarOpen(false);
                                }
                                setActiveMenuItem(item.href);
                              }}
                            >
                              <span className="doc-sidebar__link-text">
                                {item.title}
                              </span>
                              {item.method && (
                                <span
                                  className={`doc-sidebar__method-badge doc-sidebar__method-badge--${item.method.toLowerCase()}`}
                                >
                                  {item.method}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </aside>

        <main className="doc-content" role="main">
          <article className="doc-article">
            <DocContentTrail
              sectionStacks={sectionStacks}
              visitedSectionOrder={visitedSectionOrder}
              activePath={pathname ?? ""}
              pageSnapshots={pageSnapshots}
              activeContent={children}
            />
            <div
              ref={articleEndRef}
              className="doc-article__sentinel"
              aria-hidden="true"
            />
          </article>
        </main>
      </div>

      <footer className="doc-footer">
        <div>
          <strong>© 2025 </strong>راهنمای سامانه پیام کوتاه قاصدک.
        </div>
        {/* <div className="doc-footer__links">
          <Link
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          <Link href="/reference/release-notes">Release Notes</Link>
          <Link
            href="https://community.example.com"
            target="_blank"
            rel="noreferrer"
          >
            Community
          </Link>
        </div> */}
      </footer>
    </div>
  );
}

type DocContentTrailProps = {
  sectionStacks: Record<string, string[]>;
  visitedSectionOrder: string[];
  activePath: string;
  pageSnapshots: Record<string, string>;
  activeContent: ReactNode;
};

function DocContentTrail({
  sectionStacks,
  visitedSectionOrder,
  activePath,
  pageSnapshots,
  activeContent,
}: DocContentTrailProps) {
  const fallbackSectionKey = getSectionKey(findSectionTitleForHref(activePath));

  const sectionsToRender =
    visitedSectionOrder.length > 0
      ? visitedSectionOrder
      : activePath
      ? [fallbackSectionKey]
      : [];

  if (sectionsToRender.length === 0) {
    return null;
  }

  return (
    <>
      {sectionsToRender.map((sectionKey) => {
        const pages = sectionStacks[sectionKey] ?? [];
        const label = getSectionLabel(sectionKey);
        const showHeader = sectionKey !== ROOT_SECTION_KEY && pages.length > 1;

        if (pages.length === 0) {
          if (!activePath || sectionKey !== fallbackSectionKey) {
            return null;
          }
        }

        const resolvedPages =
          pages.length > 0 ? pages : activePath ? [activePath] : [];

        return (
          <div key={sectionKey} className="doc-article__section">
            {showHeader ? (
              <div className="doc-article__section-header">
                <h2 className="doc-section-title">{label}</h2>
              </div>
            ) : null}
            {resolvedPages.map((href, pageIndex) => {
              const isActive = href === activePath;
              const cachedMarkup = pageSnapshots[href];

              if (!isActive && !cachedMarkup) {
                return null;
              }

              return (
                <div key={href}>
                  <div className="doc-article__page" data-page-href={href}>
                    {isActive ? (
                      activeContent
                    ) : (
                      <div
                        className="doc-article__page-snapshot"
                        dangerouslySetInnerHTML={{ __html: cachedMarkup }}
                      />
                    )}
                  </div>
                  {pageIndex < resolvedPages.length - 1 && (
                    <div className="doc-article__page-divider" />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

