"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import PaperSheets, { type SheetData } from "@/components/PaperSheets";
import ProofBadge from "@/components/ProofBadge";

/* photo printed on the paper — height-capped so the sheet still fits one
   viewport (the case-study content rule) */
function SheetPhoto({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className="max-h-[30vh] w-auto rounded-lg border border-black/10 object-cover shadow-md md:max-h-[52vh]"
    />
  );
}

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
    // badge follows the case's brand color (Wheelcake = warm orange)
    const visitLink = (
      <ProofBadge
        href="https://whatswheelcake.com/"
        top="Visit"
        bottom="whatswheelcake.com"
        className="border-orange-400/40 bg-orange-700 hover:bg-orange-600"
      />
    );
    const hero = heroFor("also.wheelcake");
    hero.aside = (
      <SheetPhoto
        src="/wheelcake/stand.webp"
        width={900}
        height={506}
        alt="The What's Wheelcake stand with customers, Kaohsiung"
      />
    );
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
    // real photos on the papers: brand → booth signage, menu → product,
    // ops → the griddle mid-service (right column on desktop)
    chapters[2].aside = (
      <SheetPhoto
        src="/wheelcake/booth.webp"
        width={900}
        height={506}
        alt="Booth front with hand-written flavor plaques"
      />
    );
    chapters[3].aside = (
      <SheetPhoto
        src="/wheelcake/product.webp"
        width={550}
        height={440}
        alt="Branded wheel cake with chocolate filling, plated"
      />
    );
    chapters[4].aside = (
      <SheetPhoto
        src="/wheelcake/griddle.webp"
        width={900}
        height={1599}
        alt="The wheel-cake griddle mid-service"
      />
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
