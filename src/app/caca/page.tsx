"use client";

/**
 * /caca — the CaCa case study as the paper-coming-in stack.
 * 15 chapters, real copy (Jared's draft, tightened 2026-07-04 — see i18n).
 * Structure: lede → why → role → challenge → ecosystem → five surfaces →
 * design system → unhappy paths → local context → outcome → reflection.
 *
 * One sheet = one viewport (no internal scroll — that constraint is what
 * keeps the native-scroll stack honest). Artifact visuals (ecosystem
 * diagram, tri-script specimen, app screens) get footer slots later.
 */

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import PaperSheets, { type SheetData } from "@/components/PaperSheets";
import ProofBadge from "@/components/ProofBadge";

// chapter ids + key prefixes; accent marks the brand-moment sheets
const chapters: { id: string; key: string; accent?: boolean }[] = [
  { id: "lede", key: "cs.lede", accent: true },
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

export default function CacaCaseStudy() {
  const { t } = useI18n();

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

  // outcome: receipts again, where the claim is made
  sheets[13].footer = proofRow;

  // closing: CTA
  sheets[sheets.length - 1].footer = (
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
  );

  // ✕ close — v1 story-view pattern, on each paper's top-right corner
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
