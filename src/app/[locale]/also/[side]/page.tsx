import { notFound } from "next/navigation";
import SidePapers from "./SidePapers";

// Server wrapper: static params + 404 guard. The papers themselves are a
// client component (SidePapers) so copy resolves through the i18n layer.

const sides = ["payment-review", "wheelcake", "earlier-work"];

export function generateStaticParams() {
  return sides.map((side) => ({ side }));
}

export default async function SidePage({
  params,
}: {
  params: Promise<{ side: string }>;
}) {
  const { side } = await params;
  if (!sides.includes(side)) notFound();

  return <SidePapers side={side} />;
}
