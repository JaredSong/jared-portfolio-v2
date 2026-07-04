"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useI18n } from "@/lib/i18n";

/**
 * Featured case study folder.
 * Hover = the sticker-tableau moment (spec: homepage.md §3), with the
 * Droppable-style treatment (ref, 2026-07-04): contents rise out of the
 * folder and the whole tableau tilts toward + follows the cursor, with each
 * layer translating at a different depth (stickers > phones > post-it).
 *
 * REVEAL STATES — the `open:` variant (globals.css) fires on any of:
 *   1. hover            — desktop
 *   2. :focus-visible   — keyboard users
 *   3. data-open="true" — touch devices, set here via IntersectionObserver
 *                         when >55% of the folder is on screen (hover doesn't
 *                         exist on touch; without this the tableau — the
 *                         homepage centerpiece — would simply never appear)
 *
 * Mouse-follow: mousemove writes --mx/--my (-1..1) as CSS vars on the card;
 * transforms read them via calc(). No animation lib, no wheel/scroll hooks.
 * Touch never sets the vars, so the tilt simply rests at neutral there.
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
  ["/stickers/taxi.svg", "w-36 -top-20 -left-24", "-rotate-12 open:delay-[0ms]", 26, 20],
  ["/stickers/rain.svg", "w-28 -top-16 -right-20", "rotate-12 open:delay-[50ms]", 22, 18],
  ["/stickers/pagoda.svg", "w-24 top-24 -right-28", "rotate-6 open:delay-[100ms]", 30, 22],
  ["/stickers/scripts.svg", "w-40 top-32 -left-32", "-rotate-6 open:delay-[150ms]", 24, 16],
  ["/stickers/bicycle.svg", "w-36 -bottom-16 -left-20", "rotate-3 open:delay-[200ms]", 28, 20],
  ["/stickers/kbz.svg", "w-28 -bottom-12 -right-16", "-rotate-6 open:delay-[250ms]", 20, 16],
] as const;

export default function CacaFolder() {
  const { t } = useI18n();
  const cardRef = useRef<HTMLAnchorElement>(null);
  // touch-device reveal (hover-capable devices rely on :hover instead)
  const [inViewOpen, setInViewOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInViewOpen(entry.intersectionRatio >= 0.55),
      { threshold: [0, 0.55, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        {t("home.cs.kicker")}
      </p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
        {t("home.cs.note")}
      </p>

      {/* headroom above the folder: the phones rise into it when the tableau
          opens — sized so they graze the intro text, not bury it */}
      <div className="mt-28 flex justify-center md:mt-24" style={{ perspective: "1100px" }}>
        <Link
          ref={cardRef}
          href="/caca"
          aria-label={t("home.cs.aria")}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          data-open={inViewOpen ? "true" : undefined}
          className="group relative block h-[320px] w-full max-w-[520px] will-change-transform motion-reduce:transform-none sm:h-[380px]"
          style={{
            transform:
              "rotateX(calc(var(--my, 0) * -4deg)) rotateY(calc(var(--mx, 0) * 6deg))",
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* ── Soft blurred cloud behind the tableau (ref: Droppable) — the
                 whole scene floats on it, lifting stickers off the desk.
                 Two layers: a wide faint wash + a tighter brighter core.
                 -z-10 stays inside the Link's own stacking context (it has
                 a transform). ── */}
          {/* light mode: white-on-white is invisible — tint the wide layer
              with CaCa green so the cloud reads on the pale desk; dark mode
              keeps the white glow */}
          <div
            aria-hidden
            className="absolute -inset-x-56 -inset-y-36 -z-10 rounded-full bg-caca-light/80 opacity-0 blur-3xl transition-opacity duration-500 ease-out open:opacity-100 motion-reduce:transition-none dark:bg-white/10"
          />
          <div
            aria-hidden
            className="absolute -inset-x-28 -inset-y-16 -z-10 rounded-full bg-white/90 opacity-0 blur-2xl scale-90 transition-all duration-500 ease-out open:opacity-100 open:scale-100 motion-reduce:transition-none dark:bg-white/[0.14]"
          />

          {/* ── Stickers (hidden at rest, bloom when open, deepest parallax) ── */}
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
                className={`w-full opacity-0 scale-75 transition-all duration-300 ease-out open:opacity-100 open:scale-100 motion-reduce:transition-none ${imgCls}`}
              />
            </div>
          ))}

          {/* ── Centerpiece phone mockups (placeholder for real screens).
                 Rise less on mobile so they stay inside the headroom. ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 z-20 h-64 w-32"
            style={depth(14, 10)}
          >
            <div className="h-full w-full -translate-x-[85%] rounded-2xl border-4 border-white bg-gradient-to-b from-caca-green to-caca-deep opacity-0 shadow-xl transition-all duration-300 ease-out -rotate-6 open:-translate-y-24 open:opacity-100 open:-rotate-10 md:open:-translate-y-36 motion-reduce:transition-none">
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
            <div className="h-full w-full -translate-x-[15%] rounded-2xl border-4 border-white bg-gradient-to-b from-neutral-800 to-neutral-950 opacity-0 shadow-xl transition-all duration-300 delay-[75ms] ease-out rotate-6 open:-translate-y-20 open:opacity-100 open:rotate-10 md:open:-translate-y-32 motion-reduce:transition-none">
              <p className="mt-24 text-center font-hand text-xl text-white/90">
                Driver
              </p>
            </div>
          </div>

          {/* ── Papers peeking from the folder top — sized like real sheets,
                 nearly folder-width, overlapping ── */}
          {[
            "-top-5 left-6 w-[58%] -rotate-1 open:-translate-y-3",
            "-top-8 left-[22%] w-[62%] rotate-[0.75deg] open:-translate-y-5",
            "-top-6 right-4 w-[48%] -rotate-[0.5deg] open:-translate-y-4",
          ].map((cls) => (
            <div
              key={cls}
              aria-hidden
              className={`absolute z-0 h-24 rounded-t-md bg-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none dark:bg-neutral-200 ${cls}`}
            />
          ))}

          {/* ── Folder tab — muted same-hue greens, no bright pop ── */}
          <div
            aria-hidden
            className="absolute -top-7 left-3 z-10 h-10 w-44 rounded-t-2xl bg-gradient-to-r from-[#245c3c] to-[#17402a]"
            style={{
              clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* ── Folder body — subtle narrow-range green (was deep→bright) ── */}
          <div className="relative z-10 flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-[#17402a] to-[#1e4f33] p-6 shadow-xl transition-transform duration-300 ease-out open:-translate-y-2 motion-reduce:transition-none sm:p-8">
            <div>
              <p className="font-hand text-2xl text-caca-light">CaCa</p>
              <h2 className="mt-4 max-w-sm text-2xl font-bold leading-tight text-white sm:mt-6 sm:text-3xl">
                {t("home.cs.title")}
              </h2>
              <p className="mt-3 text-sm text-caca-light/90">
                {t("home.cs.dates")}
              </p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-y-3">
              <div className="flex flex-wrap gap-2">
                {["home.pill.surfaces", "home.pill.scripts", "home.pill.live"].map(
                  (pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/90"
                    >
                      {t(pill)}
                    </span>
                  ),
                )}
              </div>
              <span className="text-xs text-white/60">{t("home.cs.read")}</span>
            </div>
          </div>

          {/* ── Post-it (shallowest parallax — closest to the folder) ── */}
          <div
            aria-hidden
            className="absolute -right-2 -top-8 z-20 h-20 w-20 sm:-right-5 sm:h-24 sm:w-24"
            style={depth(7, 5)}
          >
            <div className="flex h-full w-full rotate-6 items-center justify-center bg-gradient-to-br from-[#fff7ac] to-[#fde791] shadow-md transition-transform duration-300 ease-out open:rotate-9 motion-reduce:transition-none">
              <p className="rotate-3 text-center font-hand text-lg font-semibold leading-tight text-amber-800">
                {t("home.cs.postit1")}
                <br />
                {t("home.cs.postit2")}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
