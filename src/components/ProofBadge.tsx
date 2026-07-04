import type { ReactNode } from "react";

/**
 * Store-badge-style proof link (dark pill, icon left, two-line label).
 * Color follows the case's brand via `className` (default: black badge);
 * icon defaults to a globe for plain website links.
 */

export function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-6"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9Zm-8.716-6.747h17.432M3.284 9.747h17.432"
      />
    </svg>
  );
}

export default function ProofBadge({
  href,
  top,
  bottom,
  icon,
  className = "border-white/20 bg-neutral-950",
}: {
  href: string;
  top: string;
  bottom: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex w-fit items-center gap-2.5 rounded-lg border px-4 py-2 text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none ${className}`}
    >
      {icon ?? <GlobeIcon />}
      <span className="leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-white/70">
          {top}
        </span>
        <span className="block text-sm font-semibold">{bottom}</span>
      </span>
    </a>
  );
}
