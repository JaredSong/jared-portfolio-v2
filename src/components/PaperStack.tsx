"use client";

import { useState } from "react";

/**
 * Tumulte-style sliding paper stack.
 * Used twice: homepage "Other sides" (3 papers) and the /caca surface
 * navigator (5 papers) — the folder's inner pages, same metaphor.
 */

export type Paper = {
  id: string;
  label: string;
  sub?: string;
  gradient: string; // tailwind gradient classes
  mark: string; // corner mark, e.g. "C /"
  note?: string; // small label suffix, e.g. "coming soon"
};

// transforms per stack position (0 = front)
const positionCls = [
  "z-50 translate-y-0 rotate-1 scale-100",
  "z-40 -translate-y-5 -rotate-2 scale-[0.97] brightness-95",
  "z-30 -translate-y-10 rotate-2 scale-[0.94] brightness-90",
  "z-20 -translate-y-14 -rotate-3 scale-[0.91] brightness-[0.85]",
  "z-10 -translate-y-[4.5rem] rotate-3 scale-[0.88] brightness-75",
];

export default function PaperStack({
  papers,
  onOpen,
  hint,
  className = "",
}: {
  papers: Paper[];
  onOpen: (paper: Paper) => void;
  hint?: string;
  className?: string;
}) {
  const [activeId, setActiveId] = useState(papers[0].id);

  const order = [
    papers.find((p) => p.id === activeId)!,
    ...papers.filter((p) => p.id !== activeId),
  ];

  return (
    <div className={className}>
      {/* labels */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {papers.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={`rounded-sm px-2 py-1 text-base tracking-wide transition-colors md:text-lg ${
              p.id === activeId
                ? "text-neutral-900 outline outline-1 outline-blue-500 dark:text-white"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
            }`}
          >
            {p.label}
            {p.note && (
              <span className="ml-2 align-middle text-[10px] lowercase text-neutral-400">
                {p.note}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* stack */}
      <div className="relative mx-auto mt-16 h-[300px] w-[440px] max-w-full">
        {order.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() =>
              p.id === activeId ? onOpen(p) : setActiveId(p.id)
            }
            aria-label={
              p.id === activeId ? `Open ${p.label}` : `Bring ${p.label} forward`
            }
            className={`absolute inset-0 rounded-lg shadow-lg transition-[transform,filter] duration-500 ease-in-out motion-reduce:transition-none ${p.gradient} ${positionCls[i] ?? positionCls[positionCls.length - 1]} ${
              p.id === activeId ? "cursor-pointer active:scale-[0.98]" : ""
            }`}
          >
            <span className="absolute left-4 top-3 font-mono text-sm text-white/80">
              {p.mark}
            </span>
            {p.id === activeId && p.sub && (
              <span className="absolute bottom-4 left-4 text-left text-sm text-white/90">
                {p.sub}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tumulte vertical line + hint */}
      <div className="mx-auto mt-10 h-16 w-px bg-neutral-300 dark:bg-white/20" />
      {hint && (
        <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500">{hint}</p>
      )}
    </div>
  );
}
