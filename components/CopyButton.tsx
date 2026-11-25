"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  value: string;
  className?: string;
  children: ReactNode;
  label?: string;
};

export function CopyButton({ value, className, children, label = "Copy to clipboard" }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      data-copied={copied || undefined}
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => setCopied(true), () => {});
      }}
    >
      {children}
      <span className="copy-icon" aria-hidden>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
