"use client";

import { useCallback, useState } from "react";

type BaseUrlCardProps = {
  url: string;
  label?: string;
};

function CopyIcon() {
  return (
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
}

function CheckIcon() {
  return (
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
}

export function BaseUrlCard({ url, label = "BASE URL" }: BaseUrlCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 6000);
    } catch {
      setCopied(false);
    }
  }, [url]);

  return (
    <div className="base-url-card">
      <div className="base-url-card__header">
        <span className="base-url-card__label">{label}</span>
        <div className="base-url-card__icons">
          <button
            type="button"
            className="base-url-card__icon-btn"
            onClick={handleCopy}
            aria-label="کپی آدرس"
          >
            <span className="base-url-card__icon-inner">
              {copied ? <CheckIcon /> : <CopyIcon />}
            </span>
          </button>
        </div>
      </div>
      <div className="base-url-card__body">
        <code className="base-url-card__url">{url}</code>
      </div>
    </div>
  );
}

