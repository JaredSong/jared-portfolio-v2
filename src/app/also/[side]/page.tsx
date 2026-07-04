import Link from "next/link";
import { notFound } from "next/navigation";

const sides: Record<string, { title: string; blurb: string }> = {
  coding: {
    title: "Coding side",
    blurb:
      "cacataxi.com (Laravel + Livewire, shipped in one AI-assisted session), this portfolio, and Flutter experiments. Content coming as the build progresses.",
  },
  motion: {
    title: "Motion side",
    blurb: "In the works — reel being assembled.",
  },
  "earlier-work": {
    title: "Earlier work",
    blurb:
      "WordPress, social, advertising, freelance — 2018–2023. Grid view coming.",
  },
};

export function generateStaticParams() {
  return Object.keys(sides).map((side) => ({ side }));
}

export default async function SidePage({
  params,
}: {
  params: Promise<{ side: string }>;
}) {
  const { side } = await params;
  const entry = sides[side];
  if (!entry) notFound();

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-24">
      <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">
        ← Back home
      </Link>
      <h1 className="mt-10 text-3xl font-semibold">{entry.title}</h1>
      <p className="mt-4 leading-relaxed text-neutral-600">{entry.blurb}</p>
    </div>
  );
}
