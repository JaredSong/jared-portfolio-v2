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
    // v1-style pastels (portfolioStructure.ts gradientFrom/To): pale same-hue
    // washes + dark text, not saturated gradients
    {
      id: "coding",
      href: "/also/coding",
      label: t("home.sides.coding"),
      sub: t("home.sides.coding.sub"),
      mark: "C /",
      gradient: "bg-gradient-to-br from-[#e5f9f8] to-[#ccf2f0]",
      tab: "bg-gradient-to-r from-[#ccf2f0] to-[#a9e6e2]",
    },
    {
      id: "motion",
      href: "/also/motion",
      label: t("home.sides.motion"),
      sub: t("home.sides.motion.sub"),
      mark: "M /",
      note: t("home.sides.motion.note"),
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
