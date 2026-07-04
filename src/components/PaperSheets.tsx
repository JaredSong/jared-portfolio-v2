"use client";

/**
 * PaperSheets — the v2 "paper coming in" scroll experience (Tumulte-style).
 *
 * MODEL: a textured "desk" (body background) with paper PAGES stacking on it.
 * Each page is near-full width, flush to the BOTTOM of the viewport (desk
 * shows only above and beside it), and carries a slight alternating rotation
 * so the pile reads as physically stacked sheets — each new page lands a
 * little askew over the last.
 *
 * HOW IT WORKS (and why it isn't buggy like v1):
 *   Each sheet is a `position: sticky; top: 0` full-viewport section with an
 *   increasing z-index; native scroll slides the next page up over the last,
 *   which stays pinned underneath. We NEVER touch the wheel/scroll event
 *   (that hijacking is what made v1 fight trackpads/momentum). A scroll-driven
 *   entry lift (globals.css `.sheet-paper`) adds the settle as a page comes in.
 *
 *   NOTE: rotation lives on a WRAPPER div, not the paper itself — the entry
 *   animation owns `transform` on `.sheet-paper` and would override an inline
 *   rotate. Each sheet also gets a small translateY so its rotated bottom
 *   corners stay below the viewport edge (no desk peeking through).
 *
 * The page reads as real paper: warm grained surface, punched binder holes +
 * a red margin line down the left, a soft drop shadow against the desk.
 *
 * CONTENT RULE: each page fits within one viewport — no internal scrolling
 * (that's what forced v1's wheel hijack). Long chapters split into more pages.
 */

import type { ReactNode } from "react";

export type SheetData = {
  id: string;
  kicker?: string;
  title: string;
  body?: string;
  /* tailwind text-color classes for the kicker */
  accent?: string;
  /* optional content under the body — CTA, tiles, a diagram slot, etc. */
  footer?: ReactNode;
};

/* Alternating skew per stack position — deterministic, repeats past 8. */
const ROTATIONS = [0.6, -0.5, 0.45, -0.65, 0.55, -0.4, 0.7, -0.55];

/* Stack cascade: sheet i sits CASCADE_PX lower than the one before, so the
   previous paper's top edge peeks out above the current one — a real pile. */
const TOP_PX = 12; // first sheet's top peek
const CASCADE_PX = 7; // each next sheet a tad lower
const OVERHANG_PX = 48; // paper bottom always this far below the viewport

export default function PaperSheets({
  sheets,
  corner,
}: {
  sheets: SheetData[];
  /* optional element pinned inside each paper's top-right corner (e.g. ✕) */
  corner?: ReactNode;
}) {
  return (
    <div className="relative">
      {sheets.map((sheet, i) => {
        const rotate = ROTATIONS[i % ROTATIONS.length];
        const top = TOP_PX + i * CASCADE_PX;

        return (
          <section
            key={sheet.id}
            id={sheet.id}
            className="sticky top-0 flex min-h-[100svh] items-end justify-center px-2 pb-0 sm:px-4 md:px-8"
            style={{ zIndex: i + 1, paddingTop: `${top}px` }}
          >
            {/* rotation wrapper — see NOTE above */}
            <div
              className="w-full max-w-7xl origin-bottom"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              {/* The paper. Height alone carries the bottom overhang: the
                  sheet's bottom edge always sits OVERHANG_PX below the
                  viewport, so a rotated corner can never lift into view. */}
              <div
                className="sheet-paper paper-grain relative flex w-full flex-col justify-center overflow-hidden rounded-t-2xl border border-b-0 border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--paper-shadow)] md:rounded-t-[2rem]"
                style={{ minHeight: `calc(100svh + ${OVERHANG_PX - top}px)` }}
              >
                {/* paper details */}
                <div aria-hidden className="paper-holes" />
                <div aria-hidden className="paper-margin-line" />

                {/* corner action (e.g. ✕ close) — lives ON the paper.
                    top-16 on mobile: the fixed header spans the full width
                    there and would cover a top-4 corner */}
                {corner && (
                  <div className="absolute right-4 top-16 z-10 md:right-6 md:top-6">
                    {corner}
                  </div>
                )}

                {/* content — left-aligned inside the ruled margin, like a page */}
                {/* bottom padding is heavier than top to re-center the text
                    optically — the paper's bottom 3rem is off-screen */}
                <div className="w-full max-w-3xl pt-20 pb-32 pl-14 pr-5 sm:pl-16 sm:pr-8 md:pt-24 md:pb-36 md:pl-32 md:pr-16">
                  {sheet.kicker && (
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                        sheet.accent ?? "text-neutral-400 dark:text-neutral-500"
                      }`}
                    >
                      {sheet.kicker}
                    </p>
                  )}
                  <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-6xl">
                    {sheet.title}
                  </h2>
                  {sheet.body && (
                    <p className="mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg md:text-xl">
                      {sheet.body}
                    </p>
                  )}
                  {sheet.footer && <div className="mt-8">{sheet.footer}</div>}
                </div>

                {/* page number, bottom-right, like a printed sheet */}
                {/* bottom-[4.5rem] = 1.5rem above the fold once the 3rem
                    off-screen overhang is accounted for */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-[4.5rem] right-6 font-mono text-xs text-neutral-400 dark:text-neutral-600"
                >
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(sheets.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
