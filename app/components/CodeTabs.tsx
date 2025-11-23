"use client";

import { Children, ReactNode, useState } from "react";

interface CodeTabsProps {
  children: ReactNode;
  labels: string[];
  defaultTab?: number;
}

export function CodeTabs({ children, labels, defaultTab = 0 }: CodeTabsProps) {
  const totalTabs = labels.length;
  const safeDefaultTab =
    totalTabs > 0 ? Math.min(Math.max(defaultTab, 0), totalTabs - 1) : 0;
  const [activeTab, setActiveTab] = useState(safeDefaultTab);

  const normalizedChildren = Children.toArray(children).filter((child) => {
    if (typeof child === "string") {
      return child.trim().length > 0;
    }
    return true;
  });

  const panels = labels.map((_, index) => normalizedChildren[index] ?? null);

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
              {panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}


