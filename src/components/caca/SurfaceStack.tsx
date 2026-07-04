"use client";

import PaperStack, { type Paper } from "@/components/PaperStack";

/**
 * The folder's inner pages: five surfaces as a Tumulte stack.
 * Completes the homepage metaphor — folder opens, these are the papers
 * inside. Clicking the front paper scrolls to that surface's chapter.
 */

const surfaces: (Paper & { anchor: string })[] = [
  {
    id: "passenger",
    label: "Passenger",
    anchor: "passenger",
    sub: "iOS + Android · 14 feature areas · live in stores",
    gradient: "bg-gradient-to-br from-caca-deep via-[#1c6b38] to-caca-green",
    mark: "03a /",
  },
  {
    id: "driver",
    label: "Driver",
    anchor: "driver",
    sub: "dark-mode app · state-driven UI · live in stores",
    gradient: "bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-600",
    mark: "03b /",
  },
  {
    id: "delivery",
    label: "Delivery",
    anchor: "delivery",
    sub: "bicycle fleet · flow-diagrams-first refactor",
    gradient: "bg-gradient-to-br from-amber-800 via-amber-600 to-yellow-400",
    mark: "03c /",
  },
  {
    id: "backend",
    label: "Backend",
    anchor: "backend",
    sub: "18 operator modules · EN + 中",
    gradient: "bg-gradient-to-br from-slate-800 via-slate-600 to-slate-400",
    mark: "03d /",
  },
  {
    id: "marketing",
    label: "Marketing",
    anchor: "marketing",
    sub: "cacataxi.com · one AI-assisted session",
    gradient: "bg-gradient-to-br from-stone-600 via-stone-500 to-stone-300",
    mark: "03e /",
  },
];

export default function SurfaceStack() {
  return (
    <PaperStack
      className="mt-16"
      papers={surfaces}
      onOpen={(p) =>
        document
          .getElementById((p as Paper & { anchor: string }).anchor)
          ?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      hint="click the front paper to jump to that chapter"
    />
  );
}
