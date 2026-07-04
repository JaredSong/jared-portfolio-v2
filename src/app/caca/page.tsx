"use client";

/**
 * /caca — the CaCa case study, now the paper-coming-in stack.
 * Each chapter is a sheet that slides up over the last (see PaperSheets).
 * Content is placeholder copy resolved through the i18n layer (EN/中); the
 * local-context sheet carries Burmese inline as the tri-script proof.
 *
 * Chapters are one-viewport sheets by design — long ones split later rather
 * than scroll internally.
 */

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import PaperSheets, { type SheetData } from "@/components/PaperSheets";

export default function CacaCaseStudy() {
  const { t } = useI18n();

  const sheets: SheetData[] = [
    {
      id: "lede",
      kicker: t("cs.hero.kicker"),
      title: t("cs.hero.title"),
      body: t("cs.hero.body"),
      accent: "text-caca-green",
      footer: (
        <div className="flex flex-wrap gap-2">
          {["5 surfaces", "3 scripts", "19 months", "Live in stores"].map(
            (pill) => (
              <span
                key={pill}
                className="rounded-full border border-[var(--paper-edge)] px-3 py-1 text-xs text-neutral-500 dark:text-neutral-400"
              >
                {pill}
              </span>
            ),
          )}
        </div>
      ),
    },
    {
      id: "why",
      kicker: t("cs.why.kicker"),
      title: t("cs.why.title"),
      body: t("cs.why.body"),
    },
    {
      id: "ecosystem",
      kicker: t("cs.eco.kicker"),
      title: t("cs.eco.title"),
      body: t("cs.eco.body"),
    },
    {
      id: "surfaces",
      kicker: t("cs.surfaces.kicker"),
      title: t("cs.surfaces.title"),
      body: t("cs.surfaces.body"),
    },
    {
      id: "design-system",
      kicker: t("cs.system.kicker"),
      title: t("cs.system.title"),
      body: t("cs.system.body"),
    },
    {
      id: "qa-flow",
      kicker: t("cs.qa.kicker"),
      title: t("cs.qa.title"),
      body: t("cs.qa.body"),
    },
    {
      id: "local-context",
      kicker: t("cs.local.kicker"),
      title: t("cs.local.title"),
      body: t("cs.local.body"),
      accent: "text-caca-green",
    },
    {
      id: "closing",
      kicker: t("cs.closing.kicker"),
      title: t("cs.closing.title"),
      body: t("cs.closing.body"),
      footer: (
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/#connect"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            {t("cs.closing.cta")}
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 hover:text-foreground"
          >
            {t("cs.back")}
          </Link>
        </div>
      ),
    },
  ];

  // ✕ close — v1 story-view pattern, now living ON each paper's top-right
  // corner (passed through PaperSheets' `corner` slot).
  const closeButton = (
    <Link
      href="/"
      aria-label={t("cs.back")}
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
