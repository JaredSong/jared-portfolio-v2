import Link from "next/link";

/**
 * "Inside the case study →" teaser strip (spec: homepage.md §4).
 * Placeholder build: colored cards with labels stand in for real artifact
 * crops (flow board, tri-script specimen, QA callout, etc).
 */

const items = [
  { label: "Delivery flow board", anchor: "delivery", tone: "bg-amber-100 text-amber-900" },
  { label: "Tri-script type EN·中·မြန်", anchor: "design-system", tone: "bg-emerald-100 text-emerald-900" },
  { label: "Sticker sheet", anchor: "local-context", tone: "bg-lime-100 text-lime-900" },
  { label: "QA board callout", anchor: "qa-flow", tone: "bg-sky-100 text-sky-900" },
  { label: "Shadow ladder", anchor: "design-system", tone: "bg-neutral-200 text-neutral-800" },
  { label: "God's Eye View", anchor: "backend", tone: "bg-indigo-100 text-indigo-900" },
  { label: "Network Unstable state", anchor: "passenger", tone: "bg-rose-100 text-rose-900" },
] as const;

export default function ProcessStrip() {
  return (
    <section className="w-full pb-40">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/caca"
          className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        >
          Inside the case study →
        </Link>
      </div>
      <div className="no-scrollbar mt-8 flex gap-5 overflow-x-auto px-[max(1.5rem,calc((100vw-56rem)/2))] pb-4">
        {items.map((item, i) => (
          <Link
            key={item.label}
            href={`/caca#${item.anchor}`}
            className={`flex h-36 w-52 shrink-0 items-end rounded-lg border border-white p-4 shadow-md transition-transform duration-200 hover:-translate-y-1.5 motion-reduce:transition-none ${item.tone} ${
              i % 2 ? "rotate-1" : "-rotate-1"
            }`}
          >
            <span className="text-sm font-semibold leading-snug">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
