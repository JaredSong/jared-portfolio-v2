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

  // proof links — "live in stores" is a claim; these are the receipts
  const proofLinks = [
    { label: "App Store ↗", href: "https://apps.apple.com/app/caca-taxi/id6466410175" },
    { label: "Google Play ↗", href: "https://play.google.com/store/apps/details?id=com.myan.caca" },
    { label: "cacataxi.com ↗", href: "https://www.cacataxi.com" },
  ];
  const proofRow = (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {proofLinks.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-caca-green underline-offset-4 hover:underline"
        >
          {l.label}
        </a>
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
