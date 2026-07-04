"use client";

import Image from "next/image";
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

// [src, wrapper position/size, img rotation + reveal motion, parallax x/y]
// All six stickers on every screen. Rest state may overlap the folder —
// on open the FOLDER SINKS and the stickers lift up + radiate outward
// (each away from its corner/edge), so the reveal itself clears the card.
const stickers = [
  ["/stickers/taxi.svg", "w-24 -top-16 -left-1 sm:w-36 sm:-top-20 sm:-left-24", "-rotate-12 open:delay-[0ms] open:-translate-x-3 open:-translate-y-4", 26, 20],
  ["/stickers/rain.svg", "w-20 -top-14 -right-1 sm:w-28 sm:-top-16 sm:-right-20", "rotate-12 open:delay-[50ms] open:translate-x-3 open:-translate-y-4", 22, 18],
  ["/stickers/pagoda.svg", "w-16 top-20 -right-2 sm:w-24 sm:top-24 sm:-right-28", "rotate-6 open:delay-[100ms] open:translate-x-4 open:-translate-y-2", 30, 22],
  ["/stickers/scripts.svg", "w-24 top-32 -left-3 sm:w-40 sm:-left-32", "-rotate-6 open:delay-[150ms] open:-translate-x-4 open:-translate-y-2", 24, 16],
  ["/stickers/bicycle.svg", "w-24 -bottom-12 -left-1 sm:w-36 sm:-bottom-16 sm:-left-20", "rotate-3 open:delay-[200ms] open:-translate-x-3 open:-translate-y-2", 28, 20],
  ["/stickers/kbz.svg", "w-20 -bottom-10 -right-1 sm:w-28 sm:-bottom-12 sm:-right-16", "-rotate-6 open:delay-[250ms] open:translate-x-3 open:-translate-y-2", 20, 16],
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
          className="folder-card group relative block aspect-[4/3] w-full max-w-[440px] will-change-transform motion-reduce:transform-none"
          style={{
            transform:
              "rotateX(calc(var(--my, 0) * -4deg)) rotateY(calc(var(--mx, 0) * 6deg))",
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* ── Soft blurred cloud (ref: Droppable) — sits ON TOP of the
                 folder (z-[15] > body z-10) but BEHIND the popouts (phones
                 z-20, post-it z-20, stickers z-30), so the folder recedes
                 into the glow and the stickers pop off it.
                 Light mode: CaCa-green tint (white-on-white was invisible);
                 dark mode: white glow. ── */}
          {/* glow is top-weighted: strong where the phones/stickers bloom,
              fading to nothing at the bottom so the folder stays readable */}
          {/* dark mode: green LIGHT, not white haze — reads as the folder
              glowing on the dark desk */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-56 -inset-y-36 z-[15] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(217,245,227,0.75),rgba(217,245,227,0)_68%)] opacity-0 blur-3xl transition-opacity duration-500 ease-out open:opacity-100 motion-reduce:transition-none dark:bg-[radial-gradient(ellipse_at_top,rgba(31,157,77,0.35),rgba(31,157,77,0)_68%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-28 -inset-y-16 z-[15] rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5),rgba(255,255,255,0)_60%)] opacity-0 blur-2xl scale-90 transition-all duration-500 ease-out open:opacity-100 open:scale-100 motion-reduce:transition-none dark:bg-[linear-gradient(to_bottom,rgba(120,220,160,0.22),rgba(120,220,160,0)_60%)]"
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
          {/* phones sized to the smaller folder and lifted high enough that
              they float ABOVE it when open — grazing the top edge, never
              covering the title */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 z-20 h-36 w-20 sm:h-48 sm:w-24"
            style={depth(14, 10)}
          >
            <div className="phone-rise-a h-full w-full -translate-x-[85%] rounded-2xl border-4 border-white bg-gradient-to-b from-caca-green to-caca-deep opacity-0 shadow-xl transition-all duration-300 ease-out -rotate-6 open:-translate-y-32 open:opacity-100 open:-rotate-10 sm:open:-translate-y-44 motion-reduce:transition-none">
              <p className="mt-12 text-center font-hand text-base text-white/90 sm:mt-16 sm:text-lg">
                Passenger
              </p>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 z-20 h-36 w-20 sm:h-48 sm:w-24"
            style={depth(11, 8)}
          >
            <div className="phone-rise-b h-full w-full -translate-x-[15%] rounded-2xl border-4 border-white bg-gradient-to-b from-neutral-800 to-neutral-950 opacity-0 shadow-xl transition-all duration-300 delay-[75ms] ease-out rotate-6 open:-translate-y-28 open:opacity-100 open:rotate-10 sm:open:-translate-y-40 motion-reduce:transition-none">
              <p className="mt-12 text-center font-hand text-base text-white/90 sm:mt-16 sm:text-lg">
                Driver
              </p>
            </div>
          </div>

          {/* ── Papers peeking from the folder top — three distinct sheets.
                 On open they SLIDE OUT like v1's FolderCard: up + sideways
                 fan with per-sheet rotation and staggered delays ── */}
          {[
            "-top-5 left-6 w-[58%] -rotate-1 open:-translate-y-6 open:translate-x-2 open:-rotate-2 open:delay-[0ms]",
            "-top-8 left-[22%] w-[62%] rotate-[0.75deg] open:-translate-y-10 open:translate-x-4 open:rotate-2 open:delay-[40ms]",
            "-top-6 right-4 w-[48%] -rotate-[0.5deg] open:-translate-y-7 open:translate-x-6 open:-rotate-1 open:delay-[80ms]",
          ].map((cls) => (
            <div
              key={cls}
              aria-hidden
              className={`absolute z-0 h-24 rounded-t-md bg-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none dark:bg-neutral-200 ${cls}`}
            />
          ))}

          {/* ── Folder tab — v1 pale-green card treatment ── */}
          <div
            aria-hidden
            className="absolute -top-7 left-3 z-10 h-10 w-44 rounded-t-2xl bg-gradient-to-r from-[#a8dc9a] to-[#8bc97e]"
            style={{
              clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* ── Folder body — v1's pastel green + dark text (ref screenshot,
                 2026-07-04); stays light in dark mode like the mini folders:
                 a physical object on the desk ── */}
          {/* folder SINKS on open (counterpoint to the stickers lifting) */}
          <div className="relative z-10 flex h-full flex-col justify-between rounded-2xl border border-black/5 bg-gradient-to-br from-[#cfe6c5] to-[#b7d9ab] p-6 shadow-xl transition-transform duration-300 ease-out open:translate-y-2 motion-reduce:transition-none sm:p-8">
            <div>
              <Image
                src="/caca-logo.png"
                alt="CaCa"
                width={400}
                height={120}
                className="h-7 w-auto"
              />
              <h2 className="mt-4 max-w-sm text-2xl font-bold leading-tight text-neutral-800">
                {t("home.cs.title")}
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                {t("home.cs.dates")}
              </p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-y-3">
              <div className="flex flex-wrap gap-2">
                {["home.pill.surfaces", "home.pill.scripts", "home.pill.live"].map(
                  (pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-black/15 px-3 py-1 text-xs text-neutral-700"
                    >
                      {t(pill)}
                    </span>
                  ),
                )}
              </div>
              <span className="text-xs text-neutral-500">
                {t("home.cs.read")}
              </span>
            </div>
          </div>

          {/* ── Post-it (shallowest parallax — closest to the folder) ── */}
          <div
            aria-hidden
            className="absolute -right-2 -top-8 z-20 h-20 w-20 sm:-right-5 sm:h-24 sm:w-24"
            style={depth(7, 5)}
          >
            {/* v1 post-it: 45° #FFC655→#FEE992 gradient + folded corner
                (main face notched bottom-right; darker flap fills the notch) */}
            <div className="relative h-full w-full rotate-6 drop-shadow-md transition-transform duration-300 ease-out open:rotate-9 motion-reduce:transition-none">
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  // softened from v1's #FFC655 — less orange, more yellow
                  background:
                    "linear-gradient(45deg, #FBD878 0%, #FEEC9E 100%)",
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
                }}
              >
                <p className="rotate-3 text-center font-hand text-lg font-semibold leading-tight text-amber-800">
                  {t("home.cs.postit1")}
                  <br />
                  {t("home.cs.postit2")}
                </p>
              </div>
              {/* the curled-back flap */}
              <div
                className="absolute bottom-0 right-0 h-[18px] w-[18px]"
                style={{
                  background:
                    "linear-gradient(315deg, #d9bb56 0%, #f3e08c 100%)",
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
