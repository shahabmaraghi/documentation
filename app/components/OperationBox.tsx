"use client";

import { ReactNode, useState } from "react";

interface OperationBoxProps {
  method: string;
  endpoint: string;
  children?: ReactNode;
}

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

export function OperationBox({ method, endpoint, children }: OperationBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(endpoint);
      setCopied(true);
      setTimeout(() => setCopied(false), 6000);
    } catch (error) {
      console.error("Failed to copy endpoint", error);
    }
  };

  return (
    <div className="operation-box">
      <div className="operation-box__header">
        <span className="operation-box__method">{method}</span>
        <div className="operation-box__icons">
          <button
            type="button"
            className="operation-box__icon-btn"
            onClick={handleCopy}
            aria-label="کپی آدرس"
          >
            <span className="operation-box__icon-inner">
              {copied ? <CheckIcon /> : <CopyIcon />}
            </span>
          </button>
        </div>
      </div>
      <div className="operation-box__body">
        <code className="operation-box__url">{endpoint}</code>
      </div>
      {children ? <div className="operation-box__codes">{children}</div> : null}
    </div>
  );
}

