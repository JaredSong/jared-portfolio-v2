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
    // Deliberately minimal until Jared clears more with his employer:
    // workflow name + status only, no work detail, no employer name.
    sheets = [heroFor("also.eagle"), wipSheet];
  } else if (side === "wheelcake") {
    // full concise case: founded → why → challenge → brand → menu → ops →
    // reflection. Honest about the closure — that's the point of the case.
    const visitLink = (
      <a
        href="https://whatswheelcake.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
      >
        {t("also.wheelcake.visit")}
      </a>
    );
    const hero = heroFor("also.wheelcake");
    hero.footer = visitLink;
    const chapters = ["wc.why", "wc.challenge", "wc.brand", "wc.menu", "wc.ops", "wc.close"].map(
      (key): SheetData => ({
        id: key.replace("wc.", ""),
        kicker: t(`${key}.kicker`),
        title: t(`${key}.title`),
        body: t(`${key}.body`),
        accent: key === "wc.close" ? accent : undefined,
      }),
    );
    chapters[chapters.length - 1].footer = (
      <div className="flex flex-wrap items-center gap-5">
        {visitLink}
        <Link
          href="/"
          className="text-sm font-medium text-neutral-500 hover:text-foreground"
        >
          {t("also.back")}
        </Link>
      </div>
    );
    sheets = [hero, ...chapters];
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
