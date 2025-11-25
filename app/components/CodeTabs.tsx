"use client";

import {
  Children,
  ReactElement,
  ReactNode,
  isValidElement,
  useMemo,
  useState,
} from "react";

interface CodeTabsProps {
  children: ReactNode;
  labels: string[];
  defaultTab?: number;
}

type CodeDetails = {
  code: string;
  language: string;
};

const isPreElement = (
  node: ReactNode
): node is ReactElement<{ children?: ReactNode }> =>
  isValidElement<{ children?: ReactNode }>(node) && node.type === "pre";

const normalizeCodeLanguage = (className?: string) => {
  if (!className) {
    return "text";
  }

  const match = className.match(/language-([\w+#.-]+)/i);
  return match?.[1] ?? "text";
};

const getStringFromChildren = (node: ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(getStringFromChildren).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getStringFromChildren(node.props.children);
  }

  return "";
};

const extractCodeDetails = (panel: ReactNode): CodeDetails | null => {
  if (!isPreElement(panel)) {
    return null;
  }

  const codeChild = panel.props.children;

  if (
    !isValidElement<{ children?: ReactNode; className?: string }>(codeChild)
  ) {
    return null;
  }

  const rawCode = getStringFromChildren(codeChild.props.children).trimEnd();
  const language = normalizeCodeLanguage(codeChild.props.className);

  return rawCode ? { code: rawCode, language } : null;
};

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path
      d="M8 3h9a2 2 0 0 1 2 2v13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M6 7h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const EnhancedCodePanel = ({ code, language }: CodeDetails): ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code snippet", error);
    }
  };

  const normalizedLanguage = language.toLowerCase();

  return (
    <div className="code-tabs__panel-shell">
      <div className="code-tabs__copy-wrapper">
        <button
          type="button"
          className={`code-tabs__copy-btn ${copied ? "is-copied" : ""}`}
          onClick={handleCopy}
          aria-label="کپی کردن کد"
          title={copied ? "کپی شد" : "کپی کردن کد"}
        >
          <span className="code-tabs__copy-icon" aria-hidden="true">
            {copied ? <CheckIcon /> : <CopyIcon />}
          </span>
        </button>
      </div>
      <div className="code-tabs__code-surface">
        <pre>
          <code
            className={`language-${normalizedLanguage}`}
            dir="ltr"
            tabIndex={0}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export function CodeTabs({ children, labels, defaultTab = 0 }: CodeTabsProps) {
  const totalTabs = labels.length;
  const safeDefaultTab =
    totalTabs > 0 ? Math.min(Math.max(defaultTab, 0), totalTabs - 1) : 0;
  const [activeTab, setActiveTab] = useState(safeDefaultTab);

  const normalizedChildren = useMemo(
    () =>
      Children.toArray(children).filter((child) => {
        if (typeof child === "string") {
          return child.trim().length > 0;
        }
        return true;
      }),
    [children]
  );

  const panels = useMemo(
    () => labels.map((_, index) => normalizedChildren[index] ?? null),
    [labels, normalizedChildren]
  );

  const normalizeLabel = (label: string) =>
    label
      .trim()
      .toLowerCase()
      .replace(/\+/g, "plus")
      .replace(/#/g, "sharp")
      .replace(/\s+/g, "")
      .replace(/\./g, "");

  type IconToken = {
    text?: string;
    background?: string;
    color?: string;
    icon?: string;
  };

  const iconTokens: Record<string, IconToken> = {
    curl: { text: "sh", background: "#0f172a", color: "#e2e8f0" },
    csharp: { text: "C#", background: "#1f2937", color: "#e5e7eb" },
    netcore: { icon: "/netcore.png", background: "#f3f4f6" },
    php: { icon: "/php.svg", background: "#f8fafc" },
    java: { icon: "/java.svg", background: "#fff7ed" },
    nodejs: { icon: "/nodejs.svg", background: "#ecfdf5" },
    python: { icon: "/python.svg", background: "#e0f2fe" },
    go: { icon: "/go.svg", background: "#ecfeff" },
    ruby: { text: "Rb", background: "#fdf2f8", color: "#9d174d" },
    default: { text: "{ }", background: "#1e1b4b", color: "#ede9fe" },
  };

  const getIconToken = (label: string) =>
    iconTokens[normalizeLabel(label)] ?? iconTokens.default;

  return (
    <div className="code-tabs">
      <div className="code-tabs__header" role="tablist">
        {labels.map((label, index) => {
          const normalized = normalizeLabel(label);
          const tabId = `code-tab-${normalized}-${index}`;
          const panelId = `${tabId}-panel`;

          return (
            <button
              key={tabId}
              id={tabId}
              className={`code-tabs__tab ${activeTab === index ? "is-active" : ""}`}
              onClick={() => setActiveTab(index)}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={panelId}
            >
              {(() => {
                const token = getIconToken(label);
                const iconContent = token.icon ? (
                  <img src={token.icon} alt={`${label} icon`} loading="lazy" />
                ) : (
                  token.text ?? label.charAt(0).toUpperCase()
                );

                return (
                  <span className="code-tabs__tab-label">
                    <span
                      className="code-tabs__tab-icon"
                      style={{
                        backgroundColor: token.background ?? "var(--doc-surface-alt)",
                        color: token.color ?? "var(--doc-text)",
                      }}
                      aria-hidden={token.icon ? true : undefined}
                    >
                      {iconContent}
                    </span>
                    <span>{label}</span>
                  </span>
                );
              })()}
            </button>
          );
        })}
      </div>
      <div className="code-tabs__content">
        {panels.map((panel, index) => {
          const label = labels[index] ?? `tab-${index + 1}`;
          const normalized = normalizeLabel(label);
          const tabId = `code-tab-${normalized}-${index}`;
          const panelId = `${tabId}-panel`;

          return (
            <div
              key={panelId}
              id={panelId}
              className={`code-tabs__panel ${activeTab === index ? "is-active" : ""}`}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={activeTab !== index}
            >
              {(() => {
                const details = extractCodeDetails(panel);
                if (details) {
                  return (
                    <EnhancedCodePanel
                      code={details.code}
                      language={details.language}
                    />
                  );
                }
                return panel;
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}


