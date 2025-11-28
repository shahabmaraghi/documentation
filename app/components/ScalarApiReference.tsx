"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { ApiReferenceReact } from "@scalar/api-reference-react";
import type { AnyApiReferenceConfiguration } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

interface ScalarApiReferenceProps {
  spec: object;
  instanceKey?: string;
}

type ScalarConfiguration = AnyApiReferenceConfiguration & {
  spec?: {
    url?: string;
    content?: object;
  };
};

const STRIPPED_LAYOUT_CSS = `
.scalar-api-reference .references-header,
.scalar-api-reference .references-classic-header,
.scalar-api-reference .references-footer,
.scalar-api-reference .scalar-toolbar,
.scalar-api-reference [role="search"] {
  display: none !important;
}

/* Hide only "Show More" content expansion buttons, not test/request buttons */
.scalar-api-reference [class*="show-more"],
.scalar-api-reference [class*="showMore"],
.scalar-api-reference [class*="ShowMore"],
.scalar-api-reference [class*="show-less"],
.scalar-api-reference [class*="showLess"],
.scalar-api-reference [class*="ShowLess"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* Force all collapsible/truncated content to be fully expanded */
.scalar-api-reference [class*="collapsed"],
.scalar-api-reference [class*="Collapsed"],
.scalar-api-reference [class*="truncated"],
.scalar-api-reference [class*="Truncated"],
.scalar-api-reference [class*="truncate"],
.scalar-api-reference [class*="Truncate"] {
  max-height: none !important;
  height: auto !important;
  overflow: visible !important;
  -webkit-line-clamp: unset !important;
  line-clamp: unset !important;
  display: block !important;
}

/* Ensure markdown and description content is fully expanded */
.scalar-api-reference .markdown,
.scalar-api-reference [class*="markdown"],
.scalar-api-reference [class*="Markdown"],
.scalar-api-reference [class*="description"],
.scalar-api-reference [class*="Description"] {
  max-height: none !important;
  height: auto !important;
  overflow: visible !important;
  -webkit-line-clamp: unset !important;
  line-clamp: unset !important;
}

/* Remove line-clamp on any element */
.scalar-api-reference [class*="line-clamp"],
.scalar-api-reference [class*="lineClamp"],
.scalar-api-reference [class*="clamp"] {
  -webkit-line-clamp: unset !important;
  line-clamp: unset !important;
  display: block !important;
  overflow: visible !important;
  max-height: none !important;
  height: auto !important;
}

/* Target summary elements that might be collapsible */
.scalar-api-reference summary,
.scalar-api-reference [class*="summary"],
.scalar-api-reference [class*="Summary"] {
  max-height: none !important;
  overflow: visible !important;
}

/* Ensure details elements are always open */
.scalar-api-reference details {
  max-height: none !important;
  overflow: visible !important;
}

.scalar-api-reference details > *:not(summary) {
  display: block !important;
  max-height: none !important;
  overflow: visible !important;
}

.scalar-api-reference .section-columns {
  display: flex !important;
  flex-direction: row !important;
  align-items: flex-start !important;
  gap: 24px !important;
  flex-wrap: nowrap !important;
  width: 100% !important;
  max-width: 100% !important;
}

  .markdown .line-clamp-(--markdown-clamp) .markdown-summary .truncate {
    margin-right: 20px !important;
  }

.scalar-api-reference .section-column {
  flex: 1 1 0 !important;
  width: auto !important;
  max-width: none !important;
  min-width: 0 !important;
}

/* Move HTTP verb to operation header */
.scalar-api-reference [class*="operation"] [class*="http-verb"],
.scalar-api-reference [class*="operation"] [class*="method"],
.scalar-api-reference [class*="operation"] [class*="verb"],
.scalar-api-reference [class*="operation"] button[class*="method"],
.scalar-api-reference [class*="operation"] span[class*="method"],
.scalar-api-reference [class*="operation"] [data-method],
.scalar-api-reference [class*="endpoint"] [class*="http-verb"],
.scalar-api-reference [class*="endpoint"] [class*="method"],
.scalar-api-reference [class*="endpoint"] [class*="verb"],
.scalar-api-reference [class*="operation"] [class*="http-method"],
.scalar-api-reference [class*="endpoint"] [class*="http-method"],
.scalar-api-reference [class*="operation"] [aria-label*="POST"],
.scalar-api-reference [class*="operation"] [aria-label*="GET"],
.scalar-api-reference [class*="operation"] [aria-label*="PUT"],
.scalar-api-reference [class*="operation"] [aria-label*="DELETE"],
.scalar-api-reference [class*="operation"] [aria-label*="PATCH"] {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  margin: 0 !important;
  padding: 0.5rem 1rem !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  z-index: 10 !important;
}

.scalar-api-reference [class*="operation"] [class*="header"],
.scalar-api-reference [class*="operation"] [class*="title"],
.scalar-api-reference [class*="endpoint"] [class*="header"],
.scalar-api-reference [class*="endpoint"] [class*="title"],
.scalar-api-reference [class*="operation"] > div:first-child,
.scalar-api-reference [class*="endpoint"] > div:first-child {
  position: relative !important;

}

/* Hide API path/title at the top of operations */
.scalar-api-reference [class*="operation"] [class*="path"],
.scalar-api-reference [class*="endpoint"] [class*="path"],
.scalar-api-reference [class*="operation"] [class*="url"],
.scalar-api-reference [class*="endpoint"] [class*="url"],
.scalar-api-reference [class*="operation"] [class*="route"],
.scalar-api-reference [class*="endpoint"] [class*="route"],
.scalar-api-reference [class*="operation-title"],
.scalar-api-reference [class*="endpoint-title"],
.scalar-api-reference [class*="operation"] > [class*="title"]:first-child,
.scalar-api-reference [class*="endpoint"] > [class*="title"]:first-child,
.scalar-api-reference [class*="operation"] h1:first-of-type,
.scalar-api-reference [class*="operation"] h2:first-of-type,
.scalar-api-reference [class*="operation"] h3:first-of-type,
.scalar-api-reference [class*="endpoint"] h1:first-of-type,
.scalar-api-reference [class*="endpoint"] h2:first-of-type,
.scalar-api-reference [class*="endpoint"] h3:first-of-type,
.scalar-api-reference [data-path],
.scalar-api-reference [data-url],
.scalar-api-reference [class*="operation"] [class*="header"] > [class*="title"],
.scalar-api-reference [class*="endpoint"] [class*="header"] > [class*="title"] {
  display: none !important;
}

/* Ensure operation boxes are positioned at top */
.scalar-api-reference [class*="operation"],
.scalar-api-reference [class*="endpoint"] {
  position: relative !important;
  margin-top: 0 !important;
}

@media (max-width: 1024px) {
  .scalar-api-reference .section-columns {
    flex-direction: column !important;
  }

  .scalar-api-reference .section-column {
    width: 100% !important;
    max-width: 100% !important;
  }
}

.scalar-api-reference pre,
.scalar-api-reference code,
.scalar-api-reference [class*="code-block"],
.scalar-api-reference [class*="CodeBlock"],
.scalar-api-reference [class*="code-wrapper"] {
  direction: ltr !important;
  text-align: left !important;
  unicode-bidi: plaintext !important;
}

.scalar-api-reference .examples {
  position: static !important;
  top: auto !important;
  max-height: none !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.scalar-api-reference .introduction-section {
  display: none !important;
}

.scalar-api-reference a[href="https://www.scalar.com"] {
  display: none !important;
}

.scalar-api-reference .scroll-mt-24 {
  position: relative !important;
}

.scalar-api-reference .scroll-mt-24 > button {
  left: auto !important;
  right: -1rem !important;
  padding: 0 !important;
  padding-left: 0.5rem !important;
  width: auto !important;
  justify-content: flex-start !important;
}

.scalar-api-reference .scroll-mt-24 > button .scalar-icon,
.scalar-api-reference .scroll-mt-24 > button svg {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.scalar-api-reference .property-example-value {
  direction: ltr !important;
  text-align: left !important;
  unicode-bidi: plaintext !important;
  display: grid !important;
  grid-template-columns: 1fr auto !important;
  align-items: center !important;
  gap: 12px !important;
  width: 100% !important;
}

.scalar-api-reference .property-example-value > span:first-of-type {
  justify-self: start !important;
}

.scalar-api-reference .property-example-value .scalar-icon,
.scalar-api-reference .property-example-value svg {
  justify-self: end !important;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.scalar-api-reference .property-example-value:hover svg {
  opacity: 1;
}

.scalar-api-reference .request-body-header {
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  flex-wrap: wrap !important;
  position: relative;
}

/* Show "Body" label via CSS ::before as fallback - positioned first */
.scalar-api-reference .request-body-header::before {
  content: "Body";
  font-weight: 600;
  color: var(--doc-text, #0f172a);
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-inline-end: 0.75rem;
  order: 0;
  flex-shrink: 0;
}

/* When JavaScript-added label exists, hide the ::before */
.scalar-api-reference .request-body-header.has-body-label::before {
  content: none;
  display: none;
}

/* Ensure JavaScript-added label is visible and positioned first */
.scalar-api-reference .request-body-header .gh-body-label {
  font-weight: 600 !important;
  color: var(--doc-text, #0f172a) !important;
  font-size: 0.95rem !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
  visibility: visible !important;
  opacity: 1 !important;
  margin-inline-end: 0.75rem !important;
  order: 0 !important;
  flex-shrink: 0 !important;
}

/* Ensure second child (like content type selector) appears after Body */
.scalar-api-reference .request-body-header > :nth-child(2):not(.gh-body-label) {
  margin-inline-start: auto !important;
  order: 1;
}

.scalar-api-reference .request-body-title {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  margin: 0 !important;
}

.scalar-api-reference .request-body-title::before {
  content: "Body";
  font-weight: 600;
  color: var(--doc-text, #0f172a);
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.scalar-api-reference .request-body-title .gh-body-label {
  font-weight: 600;
  color: var(--doc-text, #0f172a);
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.scalar-api-reference .request-body-title .gh-body-label::after {
  content: ":";
  font-weight: inherit;
}



.scalar-api-reference {
  position: relative !important;
  z-index: 0 !important;
  width: 100% !important;
  max-width: 90% !important;
  margin: 0 auto !important;
  box-sizing: border-box !important;
}

.scalar-api-reference * {
  box-sizing: border-box !important;
}

.scalar-api-reference header {
  position: static !important;
  z-index: 0 !important;
  pointer-events: none !important;
}


.scalar-api-reference [class*="references-classic"],
.scalar-api-reference [class*="references-layout"],
.scalar-api-reference [class*="references-content"] {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
`;

const PARAMETER_ANCHOR_SEGMENT = ".parameters.";
let hasPatchedParameterClipboard = false;

const extractParameterNameFromClipboardPayload = (value: unknown) => {
  if (typeof value !== "string") {
    return null;
  }

  const anchorCandidate = value.includes("#")
    ? value.slice(value.indexOf("#") + 1)
    : value;
  const segmentIndex = anchorCandidate.lastIndexOf(PARAMETER_ANCHOR_SEGMENT);

  if (segmentIndex === -1) {
    return null;
  }

  const tail = anchorCandidate.slice(
    segmentIndex + PARAMETER_ANCHOR_SEGMENT.length
  );

  if (!tail) {
    return null;
  }

  const sanitizedTail = tail.split(/[?#]/)[0];
  const parts = sanitizedTail.split(".");
  const candidate = parts.pop();

  if (!candidate) {
    return null;
  }

  try {
    const decoded = decodeURIComponent(candidate).trim();
    return decoded || null;
  } catch {
    const fallback = candidate.trim();
    return fallback || null;
  }
};

const patchClipboardWriterForParameterCopy = () => {
  if (
    hasPatchedParameterClipboard ||
    typeof navigator === "undefined" ||
    typeof window === "undefined"
  ) {
    return;
  }

  const { clipboard } = navigator;
  if (!clipboard || typeof clipboard.writeText !== "function") {
    return;
  }

  const originalWriteText = clipboard.writeText.bind(clipboard);
  const patchedWriter: typeof clipboard.writeText = (text: string) => {
    const parameterName = extractParameterNameFromClipboardPayload(text);
    if (parameterName) {
      return originalWriteText(parameterName);
    }
    return originalWriteText(text);
  };

  try {
    clipboard.writeText = patchedWriter;
    hasPatchedParameterClipboard = true;
  } catch {
    // Clipboard might be read-only in certain contexts; ignore if patch fails.
  }
};

const MODAL_STYLE_ID = "scalar-modal-global-overrides";
let isEnsuringModalCss = false;
let modalEnforceHandle: number | null = null;

const GLOBAL_MODAL_CSS = String.raw`
.scalar-modal-layout {
  background-color: rgb(245, 246, 251) !important;
  backdrop-filter: blur(8px) !important;
  z-index: 99999 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}

.scalar-modal-layout.scalar-modal-layout-full {
  background-color: rgb(245, 246, 251) !important;
  z-index: 99999 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 1.5rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}

.scalar-modal-layout .scalar-modal {
  box-shadow: 0 30px 70px rgba(2, 6, 23, 0.45) !important;
  z-index: 10000 !important;
  position: relative !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
  width: 100% !important;
  max-width: 100% !important;
  max-height: calc(100vh - 3rem) !important;
  margin: 0 !important;
  box-sizing: border-box !important;
}
  
.scalar-app-layout{
  
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    flex-direction: column !important;
    flex-wrap: wrap !important;
    flex-grow: 1 !important;
    flex-shrink: 1 !important;
    flex-basis: 100% !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

.scalar-container {
  width: 100% !important;
  margin: 0 auto !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column !important;
  flex-wrap: wrap !important;
  flex-grow: 1 !important;
  flex-shrink: 1 !important;
  flex-basis: 100% !important;
}

.scalar-api-reference-container {
  position: relative !important;
  overflow: visible !important;
  isolation: isolate !important;
}

/* Ensure modals at body level always appear above header - CRITICAL for desktop */
body > .scalar-modal-layout,
html > body > .scalar-modal-layout {
  z-index: 99999 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  transform: none !important;
  isolation: isolate !important;
}

/* Override any potential stacking context issues from header backdrop-filter */
.doc-shell ~ .scalar-modal-layout,
.doc-header ~ .scalar-modal-layout,
.doc-main ~ .scalar-modal-layout {
  z-index: 99999 !important;
}

/* Force modal above header on desktop - header has z-index: 100 */
.scalar-modal-layout {
  z-index: 99999 !important;
  isolation: isolate !important;
}

/* Additional specific selectors to ensure styles apply */
.scalar-api-reference-container .scalar-modal-layout,
body .scalar-modal-layout,
.scalar-modal-layout {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 1.5rem !important;
  border-radius: 0 !important;
  background-color: rgb(245, 246, 251) !important;
  backdrop-filter: blur(6px) !important;
  z-index: 99999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}

.scalar-api-reference-container .scalar-modal-layout .scalar-modal,
body .scalar-modal-layout .scalar-modal,
.scalar-modal-layout .scalar-modal {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
  width: 100% !important;
  max-width: 100% !important;
  max-height: calc(100vh - 3rem) !important;
  margin: 0 !important;
  box-sizing: border-box !important;
}
`;

const applyInlineModalOverrides = (containerEl?: HTMLDivElement | null) => {
  if (typeof document === "undefined") {
    return;
  }

  // Apply z-index to ALL modals, regardless of location
  document
    .querySelectorAll<HTMLElement>(".scalar-modal-layout")
    .forEach((layout) => {
      // CRITICAL: ALWAYS move modal to body level as LAST CHILD
      // This ensures it's not inside any container and appears after header in DOM order
      if (layout.parentElement !== document.body) {
        document.body.appendChild(layout);
      } else {
        // Even if already in body, move to end to ensure it's last
        document.body.appendChild(layout);
      }
      
      // CRITICAL: Set z-index FIRST and ALWAYS - much higher than header (z-index: 100)
      // Using 99999 to ensure it's above everything including header with backdrop-filter
      layout.style.setProperty("z-index", "99999", "important");
      layout.style.setProperty("position", "fixed", "important");
      layout.style.setProperty("display", "flex", "important");
      layout.style.setProperty("align-items", "center", "important");
      layout.style.setProperty("justify-content", "center", "important");
      layout.style.setProperty("padding", "1.5rem", "important");
      layout.style.setProperty("box-sizing", "border-box", "important");

      // Always set full viewport coverage
      layout.style.setProperty("top", "0", "important");
      layout.style.setProperty("left", "0", "important");
      layout.style.setProperty("right", "0", "important");
      layout.style.setProperty("bottom", "0", "important");
      layout.style.setProperty("width", "100vw", "important");
      layout.style.setProperty("height", "100vh", "important");
      layout.style.setProperty("margin", "0", "important");
      
      // Remove any transform or isolation that might create stacking context
      layout.style.setProperty("transform", "none", "important");
      layout.style.setProperty("isolation", "isolate", "important");
      layout.style.setProperty("will-change", "auto", "important");
      
      // Force all children to inherit z-index
      const modalChildren = layout.querySelectorAll("*");
      modalChildren.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.setProperty("position", "relative", "important");
          child.style.setProperty("z-index", "inherit", "important");
        }
      });
      
      layout.style.setProperty(
        "background-color",
        "rgb(245, 246, 251)",
        "important"
      );
      layout.style.setProperty("backdrop-filter", "blur(8px)", "important");
    });

  document
    .querySelectorAll<HTMLElement>(".scalar-modal-layout .scalar-modal")
    .forEach((modal) => {
      modal.style.setProperty(
        "box-shadow",
        "0 30px 70px rgba(2, 6, 23, 0.45)",
        "important"
      );
      modal.style.setProperty("z-index", "10000", "important");
      modal.style.setProperty("position", "relative", "important");
      modal.style.setProperty("top", "auto", "important");
      modal.style.setProperty("left", "auto", "important");
      modal.style.setProperty("transform", "none", "important");
      modal.style.setProperty("width", "100%", "important");
      modal.style.setProperty("max-width", "100%", "important");
      modal.style.setProperty("max-height", "calc(100vh - 3rem)", "important");
      modal.style.setProperty("margin", "0", "important");
      modal.style.setProperty("box-sizing", "border-box", "important");
    });
};



const startModalEnforcementLoop = (
  containerEl?: HTMLDivElement | null,
  onTick?: () => void
) => {
  if (typeof window === "undefined" || modalEnforceHandle !== null) {
    return;
  }

  modalEnforceHandle = window.setInterval(() => {
    // 1. Find all modals in the DOM
    const modals = document.querySelectorAll<HTMLElement>(".scalar-modal-layout");
    let isAnyModalOpen = false;

    if (modals.length > 0) {
        modals.forEach((modal) => {
            // Force move to body to break out of any container stacking contexts
            if (modal.parentElement !== document.body) {
                document.body.appendChild(modal);
            }
            
            // Check visibility
            const style = window.getComputedStyle(modal);
            if (style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0") {
                isAnyModalOpen = true;
            }
        });
    }

    // 2. Add/Remove class to body to trigger CSS overrides
    if (isAnyModalOpen) {
      if (!document.body.classList.contains("has-scalar-modal-open")) {
          document.body.classList.add("has-scalar-modal-open");
      }
    } else {
      if (document.body.classList.contains("has-scalar-modal-open")) {
          document.body.classList.remove("has-scalar-modal-open");
      }
    }

    // 3. Keep applying inline style overrides just in case
    applyInlineModalOverrides(containerEl);
    onTick?.();
  }, 100); // Check every 100ms is sufficient and less performance intensive
};

const stopModalEnforcementLoop = () => {
  if (typeof window === "undefined" || modalEnforceHandle === null) {
    return;
  }

  window.clearInterval(modalEnforceHandle);
  modalEnforceHandle = null;
};

const ensureGlobalModalCss = () => {
  if (typeof document === "undefined") {
    return;
  }

  if (isEnsuringModalCss) {
    return;
  }

  isEnsuringModalCss = true;
  let styleElement = document.getElementById(
    MODAL_STYLE_ID
  ) as HTMLStyleElement | null;
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = MODAL_STYLE_ID;
    document.head.appendChild(styleElement);
  }

  if (styleElement.textContent !== GLOBAL_MODAL_CSS) {
    styleElement.textContent = GLOBAL_MODAL_CSS;
  }

  // Ensure our overrides stay last in <head> so they win after RTL/LTR toggles
  document.head.appendChild(styleElement);

  applyInlineModalOverrides();
  isEnsuringModalCss = false;
};

export function ScalarApiReference({
  spec,
  instanceKey,
}: ScalarApiReferenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const readyAnnouncedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const scalarTheme: "default" = "default";
  const fallbackInstanceKey = useId();
  const scalarInstanceKey = instanceKey ?? fallbackInstanceKey;

  const configuration = useMemo(
    () =>
      ({
        spec: {
          content: spec,
        },
        theme: scalarTheme,
        layout: "modern",
        darkMode: false,
        hideDownloadButton: false,
        hideModels: false,
        showSidebar: false,
        hideSearch: true,
        showToolbar: "never",
        customCss: STRIPPED_LAYOUT_CSS,
        defaultHttpClient: {
          targetKey: "js",
          clientKey: "fetch",
        },
      }) as ScalarConfiguration,
    [scalarTheme, spec]
  );

  const moveModalsToBody = () => {
    if (typeof document === "undefined") {
      return;
    }

    // Always move modals to body level to ensure they appear above header
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>(".scalar-modal-layout")
        .forEach((modal) => {
          // Remove from current parent
          const currentParent = modal.parentElement;
          if (currentParent && currentParent !== document.body) {
            // Move to body as last child to ensure it's rendered after header
            document.body.appendChild(modal);
          } else if (currentParent === document.body) {
            // Already in body, but move to end to ensure it's last
            document.body.appendChild(modal);
          }
          modal.classList.remove("scalar-modal-layout--embedded");
          
          // Force immediate style application
          modal.style.setProperty("z-index", "99999", "important");
          modal.style.setProperty("position", "fixed", "important");
          modal.style.setProperty("top", "0", "important");
          modal.style.setProperty("left", "0", "important");
          modal.style.setProperty("right", "0", "important");
          modal.style.setProperty("bottom", "0", "important");
        });
    });
  };

  const detachEmbeddedModals = () => {
    if (typeof document === "undefined") {
      return;
    }

    // Ensure all modals are at body level
    document
      .querySelectorAll<HTMLElement>(".scalar-modal-layout")
      .forEach((modal) => {
        if (modal.parentElement && modal.parentElement !== document.body) {
          document.body.appendChild(modal);
        }
        modal.classList.remove("scalar-modal-layout--embedded");
      });
  };

  const announceReady = useCallback(() => {
    if (readyAnnouncedRef.current || typeof window === "undefined") {
      return;
    }
    readyAnnouncedRef.current = true;
    setIsReady(true);
    window.dispatchEvent(
      new CustomEvent("ghasedak:scalar-ready", {
        detail: {
          pathname: window.location.pathname,
        },
      })
    );
  }, []);

  const readinessSelectors = useRef([
    ".scalar-api-reference .section-columns",
    ".scalar-api-reference [class*='operation']",
    ".scalar-api-reference [class*='endpoint']",
    ".scalar-api-reference pre code",
  ]);

  useEffect(() => {
    readyAnnouncedRef.current = false;
    setIsReady(false);
  }, [scalarInstanceKey, spec]);

  const isScalarContentReady = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return false;
    }

    return readinessSelectors.current.some((selector) =>
      container.querySelector(selector)
    );
  }, []);

  const ensureBodyLabels = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // First, try to find request-body-header specifically
    const requestBodyHeader = container.querySelector<HTMLElement>(".request-body-header, [class*='request-body-header']");
    if (requestBodyHeader) {
      // Check for existing label
      let existingLabel = requestBodyHeader.querySelector<HTMLElement>(".gh-body-label");
      if (existingLabel) {
        // Ensure it's visible and positioned first
        existingLabel.style.display = "inline-flex";
        existingLabel.style.visibility = "visible";
        existingLabel.style.opacity = "1";
        existingLabel.style.order = "0";
        requestBodyHeader.classList.add("has-body-label");
      } else {
        // Create new label and insert as first child
        const bodyLabel = document.createElement("span");
        bodyLabel.className = "gh-body-label";
        bodyLabel.textContent = "Body";
        bodyLabel.setAttribute("aria-hidden", "true");
        bodyLabel.style.display = "inline-flex";
        bodyLabel.style.visibility = "visible";
        bodyLabel.style.opacity = "1";
        bodyLabel.style.order = "0";
        bodyLabel.style.marginInlineEnd = "0.75rem";
        
        // Insert at the very beginning
        requestBodyHeader.insertBefore(bodyLabel, requestBodyHeader.firstChild);
        requestBodyHeader.classList.add("has-body-label");
      }
    }

    // Also check for request-body-title as fallback
    const targets = [
      ".request-body-title",
      "[class*='request-body-title']",
      "[data-section='requestBody'] [class*='title']",
    ];

    targets.forEach((selector) => {
      container.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        // Skip if this is inside a header we already processed
        if (el.closest(".request-body-header")) {
          return;
        }

        const existingLabel = el.querySelector(".gh-body-label");
        if (existingLabel) {
          (existingLabel as HTMLElement).style.display = "inline-flex";
          (existingLabel as HTMLElement).style.visibility = "visible";
          (existingLabel as HTMLElement).style.opacity = "1";
          el.classList.add("has-body-label");
          return;
        }

        const bodyLabel = document.createElement("span");
        bodyLabel.className = "gh-body-label";
        bodyLabel.textContent = "Body";
        bodyLabel.setAttribute("aria-hidden", "true");
        bodyLabel.style.display = "inline-flex";
        bodyLabel.style.visibility = "visible";
        bodyLabel.style.opacity = "1";

        el.prepend(bodyLabel);
        el.classList.add("has-body-label");
      });
    });
  }, []);

  const removeShowMoreButtons = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

  
    // Also find buttons by exact text content for "Show More" / "Show Less"
    const allButtons = container.querySelectorAll<HTMLButtonElement>("button");
    allButtons.forEach((button) => {
      const text = button.textContent?.toLowerCase() || "";
      // Only hide if it's specifically "show more" or "show less", not other buttons
      if (text === "show more" || text === "show less" || text.trim() === "show more" || text.trim() === "show less") {
        button.click();
        button.style.display = "none";
      }
    });

    // Remove line-clamp classes
    const clampedElements = container.querySelectorAll('[class*="line-clamp"]');
    clampedElements.forEach((el) => {
      (el as HTMLElement).style.webkitLineClamp = "unset";
      (el as HTMLElement).style.display = "block";
      (el as HTMLElement).style.overflow = "visible";
      (el as HTMLElement).style.maxHeight = "none";
    });
  }, []);

  const watchForReadyState = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (isScalarContentReady()) {
      window.setTimeout(() => {
        removeShowMoreButtons();
        ensureBodyLabels();
        announceReady();
      }, 100);
      return;
    }

    let frame = window.requestAnimationFrame(function checkLoop() {
      if (isScalarContentReady()) {
        window.cancelAnimationFrame(frame);
        window.setTimeout(() => {
          removeShowMoreButtons();
          ensureBodyLabels();
          announceReady();
        }, 100);
        frame = 0;
        return;
      }
      frame = window.requestAnimationFrame(checkLoop);
    });

    const observer = new MutationObserver(() => {
      if (isScalarContentReady()) {
        window.setTimeout(() => {
          removeShowMoreButtons();
          ensureBodyLabels();
          announceReady();
        }, 100);
        observer.disconnect();
        if (frame) {
          window.cancelAnimationFrame(frame);
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [announceReady, ensureBodyLabels, isScalarContentReady, removeShowMoreButtons]);

  useEffect(() => {
    ensureGlobalModalCss();
    const containerEl = containerRef.current;
    startModalEnforcementLoop(containerEl, moveModalsToBody);
    moveModalsToBody();
    const stopWatchingReady = watchForReadyState();

    // Continuously remove "Show More" buttons
    const showMoreInterval = window.setInterval(() => {
      removeShowMoreButtons();
      ensureBodyLabels();
    }, 500);

    return () => {
      stopModalEnforcementLoop();
      detachEmbeddedModals();
      stopWatchingReady?.();
      window.clearInterval(showMoreInterval);
    };
  }, [ensureBodyLabels, watchForReadyState, removeShowMoreButtons]);

  useEffect(() => {
    ensureGlobalModalCss();
    if (typeof document !== "undefined") {
      const headObserver = new MutationObserver((mutations) => {
        const cssNodeInjected = mutations.some((mutation) =>
          Array.from(mutation.addedNodes).some(
            (node) =>
              node instanceof HTMLElement &&
              node.id !== MODAL_STYLE_ID &&
              (node.tagName === "STYLE" || node.tagName === "LINK")
          )
        );

        if (cssNodeInjected) {
          ensureGlobalModalCss();
          const containerEl = containerRef.current;
          startModalEnforcementLoop(containerEl, moveModalsToBody);
        }
      });

      headObserver.observe(document.head, { childList: true });
      return () => headObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    ensureGlobalModalCss();

    const moveModalToBodyImmediately = (modal: HTMLElement) => {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (modal.parentElement !== document.body) {
          document.body.appendChild(modal);
        }
        // Force z-index immediately
        modal.style.setProperty("z-index", "9999", "important");
        modal.style.setProperty("position", "fixed", "important");
        applyInlineModalOverrides(containerRef.current);
      });
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Check if the node itself is a modal
              if (node.classList.contains("scalar-modal-layout")) {
                moveModalToBodyImmediately(node);
              }
              // Check for modals inside the node
              const modals = node.querySelectorAll?.(".scalar-modal-layout");
              modals?.forEach((modal) => {
                if (modal instanceof HTMLElement) {
                  moveModalToBodyImmediately(modal);
                }
              });
            }
          });

          // Also check all existing modals
          const containerEl = containerRef.current;
          moveModalsToBody();
          applyInlineModalOverrides(containerEl);
          startModalEnforcementLoop(containerEl, moveModalsToBody);
        }

        if (
          mutation.type === "attributes" &&
          mutation.target instanceof HTMLElement &&
          mutation.target.classList.contains("scalar-modal-layout")
        ) {
          const containerEl = containerRef.current;
          moveModalsToBody();
          applyInlineModalOverrides(containerEl);
          startModalEnforcementLoop(containerEl, moveModalsToBody);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    // Also observe document.documentElement to catch modals added at root level
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    ensureGlobalModalCss();
    const html = document.documentElement;

    const observer = new MutationObserver(() => {
      ensureGlobalModalCss();
      const containerEl = containerRef.current;
      applyInlineModalOverrides(containerEl);
      startModalEnforcementLoop(containerEl, moveModalsToBody);
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme", "dir"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const replaceToastText = () => {
      const replacements: Record<string, string> = {
        "Copied to clipboard": "کپی شد",
        "Copied to the clipboard": "کپی شد",
      };

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );

      let currentNode: Node | null = walker.nextNode();
      while (currentNode) {
        if (currentNode.textContent) {
          const textContent = currentNode.textContent;
          Object.entries(replacements).forEach(([source, target]) => {
            if (textContent.includes(source)) {
              currentNode!.textContent = textContent.replace(source, target);
            }
          });
        }

        currentNode = walker.nextNode();
      }
    };

    replaceToastText();

    const observer = new MutationObserver(replaceToastText);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    patchClipboardWriterForParameterCopy();
  }, []);

  return (
    <div
      className="scalar-api-reference-wrapper"
      data-scalar-ready={isReady ? "true" : "false"}
      aria-busy={!isReady}
    >
      {!isReady ? (
        <div
          className="scalar-api-reference-loader"
          role="status"
          aria-live="polite"
        >
          <div className="scalar-skeleton-container">
            <div className="scalar-skeleton-right">
              <div className="scalar-skeleton-item">
                <div className="scalar-skeleton-line scalar-skeleton-line--title"></div>
                <div className="scalar-skeleton-line scalar-skeleton-line--medium"></div>
                <div className="scalar-skeleton-line scalar-skeleton-line--short"></div>
              </div>
              <div className="scalar-skeleton-item">
                <div className="scalar-skeleton-line scalar-skeleton-line--long"></div>
                <div className="scalar-skeleton-line scalar-skeleton-line--medium"></div>
              </div>
              <div className="scalar-skeleton-item">
                <div className="scalar-skeleton-line scalar-skeleton-line--short"></div>
                <div className="scalar-skeleton-line scalar-skeleton-line--long"></div>
              </div>
            </div>
            <div className="scalar-skeleton-left">
              <div className="scalar-skeleton-box scalar-skeleton-box--request">
                <div className="scalar-skeleton-box__header">
                  <div className="scalar-skeleton-line scalar-skeleton-line--method-badge"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--endpoint"></div>
                </div>
                <div className="scalar-skeleton-box__body">
                  <div className="scalar-skeleton-line scalar-skeleton-line--label"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--code"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--code"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--code-short"></div>
                </div>
              </div>
              <div className="scalar-skeleton-box scalar-skeleton-box--response">
                <div className="scalar-skeleton-box__header">
                  <div className="scalar-skeleton-line scalar-skeleton-line--title"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--status"></div>
                </div>
                <div className="scalar-skeleton-box__body">
                  <div className="scalar-skeleton-line scalar-skeleton-line--label"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--code"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--code"></div>
                  <div className="scalar-skeleton-line scalar-skeleton-line--code-short"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "100%",
          minHeight: "600px",
          margin: "2rem auto",
          position: "relative",
          overflow: "hidden",
        }}
        className="scalar-api-reference-container"
        data-scalar-instance={scalarInstanceKey}
      >
        <ApiReferenceReact
          key={scalarInstanceKey}
          configuration={configuration}
        />
      </div>
    </div>
  );
}
