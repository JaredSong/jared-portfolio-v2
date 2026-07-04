"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import PaperSheets, { type SheetData } from "@/components/PaperSheets";

/**
 * The papers inside an "other side" mini folder — same PaperSheets mechanic
 * as /caca, so every folder on the site opens the same way. Placeholder
 * content: a hero sheet + a "being assembled" sheet per side.
 */

const accents: Record<string, string> = {
  coding: "text-teal-600 dark:text-teal-400",
  motion: "text-orange-600 dark:text-orange-400",
  "earlier-work": "text-stone-500 dark:text-stone-400",
};

// i18n key prefix per route slug
const prefixes: Record<string, string> = {
  coding: "also.coding",
  motion: "also.motion",
  "earlier-work": "also.earlier",
};

export default function SidePapers({ side }: { side: string }) {
  const { t } = useI18n();
  const prefix = prefixes[side];

  const sheets: SheetData[] = [
    {
      id: "hero",
      kicker: t(`${prefix}.kicker`),
      title: t(`${prefix}.title`),
      body: t(`${prefix}.body`),
      accent: accents[side],
    },
    {
      id: "wip",
      kicker: t("also.wip.kicker"),
      title: t("also.wip.title"),
      body: t("also.wip.body"),
      footer: (
        <Link
          href="/"
          className="text-sm font-medium text-neutral-500 hover:text-foreground"
        >
          {t("also.back")}
        </Link>
      ),
    },
  ];

  const closeButton = (
    <Link
      href="/"
      aria-label={t("also.back")}
      className="flex size-10 items-center justify-center rounded-full bg-black/[0.04] text-[#494949] transition-all duration-200 hover:bg-black/[0.08] dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </Link>
  );

  return <PaperSheets sheets={sheets} corner={closeButton} />;
}
