"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";

/**
 * Featured case study folder.
 * Hover = the sticker-tableau moment (spec: homepage.md §3), now with the
 * Droppable-style treatment (ref, 2026-07-04): contents rise out of the
 * folder and the whole tableau tilts toward + follows the cursor, with each
 * layer translating at a different depth (stickers > phones > post-it) so
 * the scene reads as physically layered.
 *
 * Implementation: mousemove writes --mx/--my (-1..1) as CSS vars on the card;
 * transforms read them via calc(). No animation lib, no wheel/scroll hooks.
 * Touch devices simply never set the vars (rest state), and reveal
 * transitions honor reduced-motion.
 *
 * Placeholder build: real app-screen cutouts will replace the two phone
 * mockups; sticker art is v1-draft SVG, swap freely.
 */

// parallax depth per layer: translate3d driven by --mx/--my
const depth = (x: number, y: number) => ({
  transform: `translate3d(calc(var(--mx, 0) * ${x}px), calc(var(--my, 0) * ${y}px), 0)`,
  transition: "transform 0.25s ease-out",
});

// [src, wrapper position/size, img rotation + reveal delay, parallax x/y]
const stickers = [
  ["/stickers/taxi.svg", "w-36 -top-20 -left-24", "-rotate-12 group-hover:delay-[0ms]", 26, 20],
  ["/stickers/rain.svg", "w-28 -top-16 -right-20", "rotate-12 group-hover:delay-[50ms]", 22, 18],
  ["/stickers/pagoda.svg", "w-24 top-24 -right-28", "rotate-6 group-hover:delay-[100ms]", 30, 22],
  ["/stickers/scripts.svg", "w-40 top-32 -left-32", "-rotate-6 group-hover:delay-[150ms]", 24, 16],
  ["/stickers/bicycle.svg", "w-36 -bottom-16 -left-20", "rotate-3 group-hover:delay-[200ms]", 28, 20],
  ["/stickers/kbz.svg", "w-28 -bottom-12 -right-16", "-rotate-6 group-hover:delay-[250ms]", 20, 16],
] as const;

export default function CacaFolder() {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width) * 2 - 1));
    el.style.setProperty("--my", String(((e.clientY - r.top) / r.height) * 2 - 1));
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  return (
    <section id="case-study" className="mx-auto w-full max-w-4xl px-6 pb-40 pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        Case study
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Heads up — this one&apos;s lengthy. ~12 min read. Sole designer, five
        surfaces, three scripts, Yangon.
      </p>

      <div className="mt-16 flex justify-center" style={{ perspective: "1100px" }}>
        <Link
          ref={cardRef}
          href="/caca"
          aria-label="CaCa case study, 12 minute read"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="group relative block h-[380px] w-[520px] max-w-full will-change-transform motion-reduce:transform-none"
          style={{
            transform:
              "rotateX(calc(var(--my, 0) * -4deg)) rotateY(calc(var(--mx, 0) * 6deg))",
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* ── Stickers (hidden at rest, bloom on hover, deepest parallax) ── */}
          {stickers.map(([src, pos, imgCls, px, py]) => (
            <div
              key={src}
              aria-hidden
              className={`pointer-events-none absolute z-30 ${pos}`}
              style={depth(px, py)}
            >
              <img
                src={src}
                alt=""
                className={`w-full opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 motion-reduce:transition-none ${imgCls}`}
              />
            </div>
          ))}

          {/* ── Centerpiece phone mockups (placeholder for real screens) ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 z-20 h-64 w-32"
            style={depth(14, 10)}
          >
            <div className="h-full w-full -translate-x-[85%] rounded-2xl border-4 border-white bg-gradient-to-b from-caca-green to-caca-deep opacity-0 shadow-xl transition-all duration-300 ease-out -rotate-6 group-hover:-translate-y-44 group-hover:opacity-100 group-hover:-rotate-10 motion-reduce:transition-none">
              <p className="mt-24 text-center font-hand text-xl text-white/90">
                Passenger
              </p>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 z-20 h-64 w-32"
            style={depth(11, 8)}
          >
            <div className="h-full w-full -translate-x-[15%] rounded-2xl border-4 border-white bg-gradient-to-b from-neutral-800 to-neutral-950 opacity-0 shadow-xl transition-all duration-300 delay-[75ms] ease-out rotate-6 group-hover:-translate-y-40 group-hover:opacity-100 group-hover:rotate-10 motion-reduce:transition-none">
              <p className="mt-24 text-center font-hand text-xl text-white/90">
                Driver
              </p>
            </div>
          </div>

          {/* ── Papers peeking from the folder top ── */}
          {[
            "-top-4 left-10 -rotate-2 group-hover:-translate-y-3",
            "-top-6 left-24 rotate-1 group-hover:-translate-y-4",
            "-top-5 right-16 -rotate-1 group-hover:-translate-y-3",
          ].map((cls) => (
            <div
              key={cls}
              aria-hidden
              className={`absolute z-0 h-16 w-40 rounded-sm bg-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none dark:bg-neutral-200 ${cls}`}
            />
          ))}

          {/* ── Folder tab ── */}
          <div
            aria-hidden
            className="absolute -top-7 left-3 z-10 h-10 w-44 rounded-t-2xl bg-gradient-to-r from-caca-green to-caca-deep"
            style={{
              clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* ── Folder body ── */}
          <div className="relative z-10 flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-caca-deep to-[#1c6b38] p-8 shadow-xl transition-transform duration-300 ease-out group-hover:-translate-y-2 motion-reduce:transition-none">
            <div>
              <p className="font-hand text-2xl text-caca-light">CaCa</p>
              <h2 className="mt-6 max-w-sm text-3xl font-bold leading-tight text-white">
                A ride-hailing platform in Yangon
              </h2>
              <p className="mt-3 text-sm text-caca-light/90">
                Sole designer · July 2023 → February 2025
              </p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-y-3">
              <div className="flex flex-wrap gap-2">
                {["5 surfaces", "3 scripts", "Live in stores"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/90"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <span className="text-xs text-white/60">12 min read</span>
            </div>
          </div>

          {/* ── Post-it (shallowest parallax — closest to the folder) ── */}
          <div
            aria-hidden
            className="absolute -right-5 -top-8 z-20 h-24 w-24"
            style={depth(7, 5)}
          >
            <div className="flex h-full w-full rotate-6 items-center justify-center bg-gradient-to-br from-[#fff7ac] to-[#fde791] shadow-md transition-transform duration-300 ease-out group-hover:rotate-9 motion-reduce:transition-none">
              <p className="rotate-3 text-center font-hand text-lg font-semibold leading-tight text-amber-800">
                19 months
                <br />
                sole designer
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
