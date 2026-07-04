"use client";

import { useRouter } from "next/navigation";
import PaperStack, { type Paper } from "@/components/PaperStack";

/**
 * "Other sides" — Tumulte-style sliding paper stack (spec: homepage.md §5).
 * Placeholder build: papers are CSS gradients; final version gets
 * grain-textured gradient art.
 */

const papers: (Paper & { href: string })[] = [
  {
    id: "coding",
    label: "Coding side",
    href: "/also/coding",
    sub: "cacataxi.com · this portfolio · Flutter",
    gradient: "bg-gradient-to-br from-sky-950 via-teal-800 to-cyan-500",
    mark: "C /",
  },
  {
    id: "motion",
    label: "Motion side",
    href: "/also/motion",
    sub: "reels & experiments",
    gradient: "bg-gradient-to-br from-rose-900 via-orange-600 to-amber-400",
    mark: "M /",
    note: "coming soon",
  },
  {
    id: "earlier",
    label: "Earlier work",
    href: "/also/earlier-work",
    sub: "WordPress · social · advertising · 2018–2023",
    gradient: "bg-gradient-to-br from-stone-500 via-stone-400 to-amber-200",
    mark: "E /",
  },
];

export default function OtherSides() {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-40">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        Other sides
      </p>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Smaller in scope, larger in number.
      </p>

      <PaperStack
        className="mt-12"
        papers={papers}
        onOpen={(p) => router.push((p as Paper & { href: string }).href)}
        hint="click the front paper to open"
      />
    </section>
  );
}
