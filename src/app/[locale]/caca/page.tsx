"use client";

/**
 * /caca — the CaCa case study as the paper-coming-in stack.
 * 16 sheets = 15 chapters of real copy (Jared's draft, tightened
 * 2026-07-04 — see i18n) + a contents sheet after the lede.
 * Structure: lede → contents → why → role → challenge → ecosystem →
 * five surfaces → design system → unhappy paths → local context →
 * outcome → reflection. Five chapter groups drive the TOC rows.
 *
 * One sheet = one viewport (no internal scroll — that constraint is what
 * keeps the native-scroll stack honest). Artifact visuals (ecosystem
 * diagram, tri-script specimen, app screens) get footer slots later.
 */

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import PaperSheets, {
  jumpToSheet,
  type SheetData,
} from "@/components/PaperSheets";
import ProofBadge from "@/components/ProofBadge";

// chapter ids + key prefixes; accent marks the brand-moment sheets
const chapters: { id: string; key: string; accent?: boolean }[] = [
  { id: "lede", key: "cs.lede", accent: true },
  { id: "contents", key: "cs.toc" },
  { id: "why", key: "cs.why" },
  { id: "role", key: "cs.role" },
  { id: "challenge", key: "cs.challenge" },
  { id: "ecosystem", key: "cs.eco" },
  { id: "passenger", key: "cs.passenger" },
  { id: "driver", key: "cs.driver" },
  { id: "delivery", key: "cs.delivery" },
  { id: "backend", key: "cs.backend" },
  { id: "website", key: "cs.website" },
  { id: "design-system", key: "cs.system" },
  { id: "qa-flow", key: "cs.qa" },
  { id: "local-context", key: "cs.local", accent: true },
  { id: "outcome", key: "cs.outcome" },
  { id: "closing", key: "cs.closing" },
];

/* Aside artifact — same visual grammar as the Wheelcake shots (SidePapers).
   `diagram: true` = transparent PNG figures that print DIRECTLY on the paper
   (no white plate, no border — Jared 2026-07-09); photos stay bordered
   shots. */
function Artifact({
  src,
  width,
  height,
  alt,
  diagram = false,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  diagram?: boolean;
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={`max-h-[30vh] w-auto md:max-h-[52vh] ${
        diagram
          ? "object-contain"
          : "rounded-lg border border-black/10 object-cover shadow-md"
      }`}
    />
  );
}

export default function CacaCaseStudy() {
  const { t, localeHref } = useI18n();

  const sheets: SheetData[] = chapters.map(({ id, key, accent }) => ({
    id,
    kicker: t(`${key}.kicker`),
    title: t(`${key}.title`),
    body: t(`${key}.body`),
    accent: accent ? "text-caca-green" : undefined,
  }));

  // proof badges — "live in stores" is a claim; these are the receipts,
  // styled as store badges (dark pill, icon left, two-line label)
  const badges = [
    {
      href: "https://apps.apple.com/app/caca-taxi/id6466410175",
      top: "View on the",
      bottom: "App Store",
      icon: (
        <svg viewBox="0 0 384 512" fill="currentColor" className="size-6" aria-hidden>
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.9-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
      ),
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.myan.caca",
      top: "View on",
      bottom: "Google Play",
      icon: (
        <svg viewBox="0 0 512 512" fill="currentColor" className="size-6" aria-hidden>
          <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
        </svg>
      ),
    },
    {
      href: "https://www.cacataxi.com",
      top: "Visit",
      bottom: "cacataxi.com",
      icon: undefined, // ProofBadge's globe default
    },
  ];
  const proofRow = (
    <div className="flex flex-wrap gap-3">
      {badges.map((b) => (
        <ProofBadge
          key={b.href}
          href={b.href}
          top={b.top}
          bottom={b.bottom}
          icon={b.icon}
          // CaCa's badges follow the brand: deep green
          className="border-white/20 bg-[#17402a] hover:bg-[#1a4a30]"
        />
      ))}
    </div>
  );

  // lede: stat pills + receipts
  sheets[0].footer = (
    <div className="space-y-5">
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
      {proofRow}
    </div>
  );

  // aside artifacts — real CaCa material from Jared's archive (2026-07-09).
  // Transparent diagrams print directly on the paper; photos are bordered
  // shots. Indices follow the chapters array above.
  sheets[5].aside = (
    <Artifact
      src="/caca/ecosystem-map.png"
      width={815}
      height={670}
      alt="CaCa ecosystem map — passenger app, driver app, backend interface and delivery system around one platform"
      diagram
    />
  );
  sheets[6].aside = (
    <Artifact
      src="/caca/passenger-screens.jpg"
      width={800}
      height={436}
      alt="CaCa passenger app — home screen and a booking with route, car types and fares"
    />
  );
  sheets[7].aside = (
    <Artifact
      src="/caca/driver-online.png"
      width={644}
      height={222}
      alt="Driver app — the go-online control over the live map"
      diagram
    />
  );
  sheets[13].aside = (
    <Artifact
      src="/caca/yangon-downtown.jpg"
      width={1200}
      height={675}
      alt="Downtown Yangon — the traffic CaCa was designed for"
    />
  );
  sheets[14].aside = (
    <Artifact
      src="/caca/roadmap-phases.png"
      width={976}
      height={691}
      alt="Phased roadmap — MVP launch growing through four feature phases without pausing"
      diagram
    />
  );

  // chapter groups — the TOC rows. start = first sheet index of the group
  // (the TOC sheet itself is index 1). No chips (they were the dropped edge
  // tabs' colors), no page numbers (folio removed — bottom chrome is out):
  // just numeral + title, dashed row separators.
  const groups = [
    { desc: t("cs.toc.brief"), start: 0 },
    { desc: t("cs.toc.surfaces"), start: 5 },
    { desc: t("cs.toc.system"), start: 11 },
    { desc: t("cs.toc.context"), start: 13 },
    { desc: t("cs.toc.outcome"), start: 14 },
  ];

  // contents sheet — clickable rows that ride the fast jump
  sheets[1].footer = (
    <div className="w-full max-w-2xl">
      {groups.map((g, gi) => (
        <button
          key={g.desc}
          type="button"
          onClick={() => jumpToSheet(g.start)}
          className="group/toc flex w-full cursor-pointer items-baseline gap-3 border-b border-dashed border-[var(--paper-edge)] py-3.5 text-left last:border-b-0 sm:gap-4"
        >
          <span className="w-7 flex-none text-sm italic text-neutral-400 dark:text-neutral-500">
            {["i.", "ii.", "iii.", "iv.", "v."][gi]}
          </span>
          <span className="text-lg font-medium text-foreground underline-offset-4 group-hover/toc:underline md:text-2xl">
            {g.desc}
          </span>
        </button>
      ))}
    </div>
  );

  // outcome: receipts again, where the claim is made
  sheets[14].footer = proofRow;

  // closing: CTA
  sheets[sheets.length - 1].footer = (
    <div className="flex flex-wrap items-center gap-5">
      <Link
        href={localeHref("/#connect")}
        className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {t("cs.closing.cta")}
      </Link>
      <Link
        href={localeHref("/")}
        className="text-sm font-medium text-neutral-500 hover:text-foreground"
      >
        {t("cs.back")}
      </Link>
    </div>
  );

  // ✕ close — v1 story-view pattern, on each paper's top-right corner
  const closeButton = (
    <Link
      href={localeHref("/")}
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

  return (
    <PaperSheets
      sheets={sheets}
      corner={closeButton}
      runhead={t("cs.runhead")}
    />
  );
}
