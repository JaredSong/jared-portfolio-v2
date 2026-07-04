"use client";

import Link from "next/link";

/**
 * Small folder for the "Other sides" shelf — same desk grammar as the CaCa
 * folder (folder → opens to papers) but deliberately quieter: papers peek
 * and lift on hover/focus, no sticker tableau, no tilt. The featured-folder
 * treatment stays exclusive to CaCa.
 */

export type MiniFolderData = {
  id: string;
  href: string;
  label: string;
  sub: string;
  mark: string; // corner mark, e.g. "C /"
  note?: string; // e.g. "coming soon"
  gradient: string; // folder body gradient classes
  tab: string; // folder tab gradient classes
};

export default function MiniFolder({ folder }: { folder: MiniFolderData }) {
  return (
    <Link
      href={folder.href}
      // single-column: match the CaCa folder's 440px cap (a full-width mini
      // reads BIGGER than the featured folder); grid columns take over at sm+
      className="group relative mx-auto block w-full max-w-[440px] sm:max-w-none"
      aria-label={folder.label}
    >
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
