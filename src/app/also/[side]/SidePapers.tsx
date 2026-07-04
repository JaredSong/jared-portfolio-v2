"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import PaperSheets, { type SheetData } from "@/components/PaperSheets";

/**
 * The papers inside an "other work" mini folder — same PaperSheets mechanic
 * as /caca, so every folder on the site opens the same way.
 *
 * Eagle (payment-review) is a CONCISE, EMPLOYER-SAFE case by design:
 * generic naming, role-based flow descriptions only, no proprietary visuals,
 * client names, or numbers. Copy ceiling = the approved safe copy. Wheelcake
 * and Earlier are hero + status stubs until their content lands.
 */

const accents: Record<string, string> = {
  "payment-review": "text-blue-600 dark:text-blue-400",
  wheelcake: "text-orange-600 dark:text-orange-400",
  "earlier-work": "text-stone-500 dark:text-stone-400",
};

export default function SidePapers({ side }: { side: string }) {
  const { t } = useI18n();
  const accent = accents[side];

  const heroFor = (prefix: string): SheetData => ({
    id: "hero",
    kicker: t(`${prefix}.kicker`),
    title: t(`${prefix}.title`),
    body: t(`${prefix}.body`),
    accent,
  });

  const wipSheet: SheetData = {
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
  };

  let sheets: SheetData[];
  if (side === "payment-review") {
    sheets = [
      heroFor("also.eagle"),
      {
        id: "roles",
        kicker: t("also.eagle.s2.kicker"),
        title: t("also.eagle.s2.title"),
        body: t("also.eagle.s2.body"),
        accent,
      },
      {
        id: "ai-reader",
        kicker: t("also.eagle.s3.kicker"),
        title: t("also.eagle.s3.title"),
        body: t("also.eagle.s3.body"),
        accent,
      },
      wipSheet,
    ];
  } else if (side === "wheelcake") {
    sheets = [heroFor("also.wheelcake"), wipSheet];
  } else {
    sheets = [heroFor("also.earlier"), wipSheet];
  }

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
