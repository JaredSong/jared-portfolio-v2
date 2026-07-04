"use client";

import MiniFolder, { type MiniFolderData } from "@/components/home/MiniFolder";
import { useI18n } from "@/lib/i18n";

/**
 * "Other sides" — a shelf of three smaller folders, same desk grammar as the
 * featured CaCa folder: every folder opens to papers (/also/[side] renders
 * a PaperSheets stack). Quieter hover than CaCa by design.
 */

export default function OtherSides() {
  const { t } = useI18n();

  const folders: MiniFolderData[] = [
    // v1-style pastels: pale same-hue washes + dark text. Hierarchy is
    // deliberate (see memory: v2-positioning): Eagle = second professional
    // proof (concise, employer-safe), Wheelcake = craft/personality proof,
    // Earlier = range proof.
    {
      id: "eagle",
      href: "/also/payment-review",
      label: t("home.sides.eagle"),
      sub: t("home.sides.eagle.sub"),
      mark: "P /",
      note: t("home.sides.eagle.note"),
      gradient: "bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe]",
      tab: "bg-gradient-to-r from-[#bfdbfe] to-[#a5cdf7]",
    },
    {
      id: "wheelcake",
      href: "/also/wheelcake",
      label: t("home.sides.wheelcake"),
      sub: t("home.sides.wheelcake.sub"),
      mark: "W /",
      gradient: "bg-gradient-to-br from-[#ffedd5] to-[#fed7aa]",
      tab: "bg-gradient-to-r from-[#fed7aa] to-[#fdc98c]",
    },
    {
      id: "earlier",
      href: "/also/earlier-work",
      label: t("home.sides.earlier"),
      sub: t("home.sides.earlier.sub"),
      mark: "E /",
      gradient: "bg-gradient-to-br from-[#f5f5f4] to-[#e7e5e4]",
      tab: "bg-gradient-to-r from-[#e7e5e4] to-[#d9d6d4]",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-40">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        {t("home.sides.kicker")}
      </p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
        {t("home.sides.note")}
      </p>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {folders.map((folder) => (
          <MiniFolder key={folder.id} folder={folder} />
        ))}
      </div>
    </section>
  );
}
