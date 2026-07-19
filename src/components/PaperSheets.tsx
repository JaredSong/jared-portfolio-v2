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

import { useEffect, useRef, type ReactNode } from "react";

/* NOTE: paper-edge "index tabs" (Notebook-Tabs ref) were built and DROPPED
   2026-07-09 by Jared's call. Lesson: the ref is a slide deck — one flat
   layer that repaints its tabs every slide. This stack is 16 REAL z-layers;
   a tab that must stay visible above every paper cannot also tuck under
   them, and the ±0.7° paper rotations bury any edge protrusion. Chapter
   orientation lives in the TOC sheet (jumpToSheet) + folios instead. */

export type SheetData = {
  id: string;
  kicker?: string;
  title: string;
  body?: string;
  /* tailwind text-color classes for the kicker */
  accent?: string;
  /* optional content under the body — CTA, tiles, a diagram slot, etc. */
  footer?: ReactNode;
  /* optional visual (photo, diagram): right column on desktop, flows
     between body and footer on mobile */
  aside?: ReactNode;
};

/* Jump the window to sheet `index` — exported so case pages can drive it
   from custom content (e.g. TOC rows). Anchor links can't do this: the
   sections are sticky against the whole stack, so their bounding rects sit
   at top 0 for the entire scroll and the browser thinks they're in view.
   We compute the FLOW position instead — by SUMMING real section heights,
   not dividing (sheets whose content outgrows a short viewport are taller
   than the rest) — and run a fast ease of our own: native smooth scroll
   over ~14 viewports crawls; the papers should visibly riffle past. Any
   user input cancels the ride. */
export function jumpToSheet(index: number) {
  const stack = document.querySelector<HTMLElement>("[data-paper-stack]");
  if (!stack) return;
  const sections = Array.from(stack.querySelectorAll(":scope > section"));
  if (!sections.length) return;
  const rect = stack.getBoundingClientRect();
  let flowTop = 0;
  for (let k = 0; k < Math.min(index, sections.length - 1); k++) {
    flowTop += sections[k].getBoundingClientRect().height;
  }
  const target = rect.top + window.scrollY + flowTop;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: target, behavior: "instant" });
    return;
  }

  const startY = window.scrollY;
  const dist = target - startY;
  if (Math.abs(dist) < 1) return;
  // ~90ms per viewport of distance, capped under a second
  const duration = Math.min(
    950,
    300 + (Math.abs(dist) / window.innerHeight) * 90,
  );
  const start = performance.now();
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const opts: AddEventListenerOptions = { passive: true, once: true };
  window.addEventListener("wheel", cancel, opts);
  window.addEventListener("touchstart", cancel, opts);
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const frame = (now: number) => {
    if (cancelled) return;
    const p = Math.min(1, (now - start) / duration);
    // behavior:"instant" — html has CSS scroll-behavior:smooth, which would
    // otherwise turn every rAF step into its own smooth animation
    window.scrollTo({ top: startY + dist * ease(p), behavior: "instant" });
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* Alternating skew per stack position — deterministic, repeats past 8. */
const ROTATIONS = [0.6, -0.5, 0.45, -0.65, 0.55, -0.4, 0.7, -0.55];

/* Stack cascade: sheet i sits CASCADE_PX lower than the one before, so the
   previous paper's top edge peeks out above the current one — a real pile.
   CAPPED at CASCADE_MAX steps: past that, new sheets land on the same line
   (only their rotation differs), so a 16-sheet case shows a calm ~4-edge
   pile instead of a heavy 15-edge band at the top (Jared, 2026-07-09). */
const TOP_PX = 12; // first sheet's top peek
const CASCADE_PX = 7; // each next sheet a tad lower
const CASCADE_MAX = 4; // most cascade steps ever visible
const OVERHANG_PX = 48; // paper bottom always this far below the viewport

export default function PaperSheets({
  sheets,
  corner,
  runhead,
}: {
  sheets: SheetData[];
  /* optional element pinned inside each paper's top-right corner (e.g. ✕) */
  corner?: ReactNode;
  /* optional running-head label (e.g. "CaCa · Case study"). When set, the
     kicker row renders as a runhead: kicker left, this label right, hairline
     rule below — numbering lives in the TOP chrome only (Jared 2026-07-09:
     bottom stays cropped/clean for the continuous-page look; folio removed). */
  runhead?: string;
}) {
  const stackRef = useRef<HTMLDivElement>(null);

  /* Contain elastic overscroll while a stack page is mounted. The macOS
     rubber-band scrolls PAST the document end; sticky sections have zero
     slack there, so the overshoot shoves every sheet upward at once and
     unequal-height sheets bleed out from under each other (the "last
     page" tear). Scoped to stack pages; restored on unmount. */
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overscrollBehaviorY;
    html.style.overscrollBehaviorY = "none";
    return () => {
      html.style.overscrollBehaviorY = prev;
    };
  }, []);

  /* Content-reveal trigger. Sticky rects are useless for "which sheet just
     arrived" (they pin at top 0), but the intersection RATIO still moves
     during arrival — a section slides up from below. PAPER FIRST, THEN TEXT
     (Jared 2026-07-09): the text starts only when the paper is ~fully
     seated — firing mid-arrival made two motions fight and read as jank.
     The trigger adapts per sheet: taller-than-viewport sheets can never
     reach high ratios, so it's 90% of the max ratio that sheet can hit.
     Marked once, then unwatched: content stays put on the way back up,
     keeping the continuous-page feel. `reveal-ready` gates the hidden
     initial state so a no-JS render shows everything. */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    stack.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const maxRatio = Math.min(
            1,
            window.innerHeight / entry.boundingClientRect.height,
          );
          if (entry.intersectionRatio >= maxRatio * 0.9) {
            entry.target.classList.add("sheet-arrived");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: [0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95] },
    );
    for (const section of Array.from(
      stack.querySelectorAll(":scope > section"),
    )) {
      io.observe(section);
    }
    return () => io.disconnect();
  }, [sheets.length]);

  return (
    <div ref={stackRef} data-paper-stack className="relative">
      {sheets.map((sheet, i) => {
        const top = TOP_PX + Math.min(i, CASCADE_MAX) * CASCADE_PX;
        /* The LAST sheet lands straight and ends exactly at the viewport
           bottom (no rotation → no corner dip → no overhang needed). That
           makes its section exactly one viewport tall, so the document
           ends the instant the final sheet arrives — no dead-scroll tail
           where every jammed sticky section gets shoved up together (the
           "last page" tear). */
        const isLast = i === sheets.length - 1;
        const rotate = isLast ? 0 : ROTATIONS[i % ROTATIONS.length];
        const overhang = isLast ? -top : OVERHANG_PX - top;

        return (
          <section
            key={sheet.id}
            id={sheet.id}
            className="sticky top-0 flex min-h-[100svh] items-end justify-center px-2 pb-0 sm:px-4 md:px-8"
            style={{ zIndex: i + 1, paddingTop: `${top}px` }}
          >
            {/* rotation wrapper — see NOTE above */}
            <div
              className="relative w-full max-w-7xl origin-bottom"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              {/* The paper. Height alone carries the bottom overhang: the
                  sheet's bottom edge always sits OVERHANG_PX below the
                  viewport, so a rotated corner can never lift into view.
                  min-height itself lives in globals.css (.sheet-paper) with
                  a vh fallback under the svh calc — only the per-sheet
                  overhang is set here. */}
              <div
                className="sheet-paper paper-grain relative flex w-full flex-col overflow-hidden rounded-t-xl border border-b-0 border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--paper-shadow)] md:rounded-t-3xl"
                style={
                  {
                    "--sheet-overhang": `${overhang}px`,
                  } as React.CSSProperties
                }
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

                {/* running head — spans the FULL paper width (margin line to
                    right padding edge) like a printed page's running head,
                    pinned to the top while the body stays centered (ref
                    layout, Jared 2026-07-09). Sits below the ✕ corner zone.
                    Right label hidden on mobile. */}
                {runhead && sheet.kicker && (
                  // margins (not paddings) carry the gutters so the hairline
                  // starts at the text margin — it must not cross the binder
                  // holes or the red margin line (ref layout)
                  <div className="sheet-reveal d1 ml-14 mr-6 flex items-baseline justify-between gap-4 border-b border-[var(--paper-edge)] pb-3 pt-28 sm:ml-16 sm:mr-8 md:ml-32 md:mr-16 md:pt-20">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                        sheet.accent ??
                        "text-neutral-400 dark:text-neutral-500"
                      }`}
                    >
                      {sheet.kicker}
                    </p>
                    <p className="hidden text-[10px] uppercase tracking-[0.22em] text-neutral-400 sm:block dark:text-neutral-500">
                      {runhead}
                    </p>
                  </div>
                )}

                {/* content zone — vertically centered in the space left
                    under the runhead */}
                <div className="flex w-full flex-1 items-center">
                {/* content — left-aligned inside the ruled margin, like a page */}
                {/* bottom padding is heavier than top to re-center the text
                    optically — the paper's bottom 3rem is off-screen.
                    Mobile: text starts just inside the (narrower) margin
                    line with a balanced right edge. With an aside, desktop
                    goes two-column: text left, visual right. */}
                <div
                  className={`w-full pb-32 pl-14 pr-6 sm:pl-16 sm:pr-8 md:pb-36 md:pl-32 md:pr-16 ${
                    runhead ? "pt-6" : "pt-20 md:pt-24"
                  } ${
                    sheet.aside
                      ? "max-w-6xl md:grid md:grid-cols-[1fr_minmax(0,44%)] md:items-center md:gap-12"
                      : "max-w-3xl"
                  }`}
                >
                  <div>
                    {!runhead && sheet.kicker && (
                      <p
                        className={`sheet-reveal d1 text-xs font-semibold uppercase tracking-[0.22em] ${
                          sheet.accent ?? "text-neutral-400 dark:text-neutral-500"
                        }`}
                      >
                        {sheet.kicker}
                      </p>
                    )}
                    <h2
                      className={`sheet-reveal d2 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-6xl ${
                        runhead ? "" : "mt-5"
                      }`}
                    >
                      {sheet.title}
                    </h2>
                    {sheet.body && (
                      <p className="sheet-reveal d3 mt-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg md:text-xl">
                        {sheet.body}
                      </p>
                    )}
                    {/* mobile: visual sits between body and footer */}
                    {sheet.aside && (
                      <div className="sheet-reveal d4 mt-8 md:hidden">
                        {sheet.aside}
                      </div>
                    )}
                    {sheet.footer && (
                      <div className="sheet-reveal d5 mt-8">{sheet.footer}</div>
                    )}
                  </div>
                  {/* desktop: visual as the right column */}
                  {sheet.aside && (
                    <div className="sheet-reveal d4 hidden md:block">
                      {sheet.aside}
                    </div>
                  )}
                </div>
                </div>

                {/* NO folio / bottom chrome — the paper's bottom edge stays
                    clean and cropped so the stack reads as one continuous
                    page (Jared 2026-07-09; folio removed after launch).
                    Numbering lives in the runhead at the top. */}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
