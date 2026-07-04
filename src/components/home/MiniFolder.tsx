"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Small folder for the "More work" shelf — same desk grammar as the CaCa
 * folder (folder → opens to papers), quieter by design: fewer, smaller
 * stickers and a single-color glow, so the featured folder stays senior.
 *
 * Reveal states mirror CacaFolder: hover / keyboard focus (`open:` variant)
 * + IntersectionObserver for touch devices (no hover there).
 * Each folder glows in ITS OWN color (`glow` = rgba string).
 */

export type MiniSticker = {
  src: string;
  /* wrapper position/size + rotation + open: motion */
  cls: string;
  delay: string;
};

export type MiniFolderData = {
  id: string;
  href: string;
  label: string;
  sub: string;
  mark: string; // corner mark, e.g. "P /"
  note?: string; // e.g. "concise case"
  gradient: string; // folder body gradient classes
  tab: string; // folder tab gradient classes
  glow: string; // rgba color — hover glow in the folder's own color
  stickers?: MiniSticker[];
};

export default function MiniFolder({ folder }: { folder: MiniFolderData }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inViewOpen, setInViewOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInViewOpen(entry.intersectionRatio >= 0.6),
      { threshold: [0, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={folder.href}
      data-open={inViewOpen ? "true" : undefined}
      // isolate: keeps the -z-10 glow inside this card's stacking context
      className="group relative mx-auto block w-full max-w-[440px] isolate sm:max-w-none"
      aria-label={folder.label}
    >
      {/* glow in the folder's own color — same in light and dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-500 ease-out open:opacity-100 motion-reduce:transition-none"
        style={{
          background: `radial-gradient(ellipse at center, ${folder.glow}, transparent 72%)`,
        }}
      />

      {/* stickers — bloom on open, like the CaCa folder but smaller;
          positions deliberately scattered, not four-corners. */}
      {folder.stickers?.map((s) => (
        <div
          key={s.src}
          aria-hidden
          className={`pointer-events-none absolute z-30 ${s.cls}`}
        >
          <Image
            src={s.src}
            alt=""
            width={200}
            height={200}
            className={`w-full opacity-0 scale-75 drop-shadow-md transition-all duration-300 ease-out open:opacity-100 open:scale-100 motion-reduce:transition-none ${s.delay}`}
          />
        </div>
      ))}

      {/* papers peeking from the top — %-width overlapping sheets (same
          treatment as the CaCa folder), lift on hover/focus */}
      {[
        "-top-3 left-4 w-[42%] -rotate-1 open:-translate-y-2",
        "-top-5 left-[30%] w-[48%] rotate-[0.75deg] open:-translate-y-3",
        "-top-4 right-3 w-[36%] -rotate-[0.5deg] open:-translate-y-2",
      ].map((cls) => (
        <div
          key={cls}
          aria-hidden
          className={`absolute z-0 h-12 rounded-t-md bg-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none dark:bg-neutral-200 ${cls}`}
        />
      ))}

      {/* folder tab */}
      <div
        aria-hidden
        className={`absolute -top-4 left-2 z-10 h-6 w-24 rounded-t-xl ${folder.tab}`}
        style={{ clipPath: "polygon(0 0, 80% 0, 100% 100%, 0 100%)" }}
      />

      {/* folder body — pale pastel + dark text (v1 FolderCard treatment);
          stays light in dark mode, like the white papers: a physical object.
          No grain overlay — folder surfaces stay clean. */}
      <div
        className={`relative z-10 flex aspect-[8/5] flex-col justify-between overflow-hidden rounded-xl border border-black/5 p-5 shadow-lg transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl motion-reduce:transition-none sm:aspect-auto sm:h-44 ${folder.gradient}`}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-sm text-neutral-500">
            {folder.mark}
          </span>
          {folder.note && (
            <span className="rounded-full border border-black/15 px-2 py-0.5 text-[10px] lowercase text-neutral-500">
              {folder.note}
            </span>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-neutral-800">
            {folder.label}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600">
            {folder.sub}
          </p>
        </div>
      </div>
    </Link>
  );
}
