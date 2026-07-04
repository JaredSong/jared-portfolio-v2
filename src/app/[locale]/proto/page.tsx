"use client";

/**
 * /proto — original sandbox for the "paper coming in" motion. Now that the
 * effect graduated into the real case study (/caca) and the global header
 * carries the controls, this is just a minimal bare-paper reference.
 */

import { useI18n } from "@/lib/i18n";
import PaperSheets, { type SheetData } from "@/components/PaperSheets";

export default function ProtoPage() {
  const { t } = useI18n();
  const sheets: SheetData[] = [
    { id: "s0", title: t("s0.title") },
    { id: "s1", title: t("s1.title") },
    { id: "s2", title: t("s2.title") },
    { id: "s3", title: t("s3.title") },
    { id: "s4", title: t("s4.title") },
  ];
  return <PaperSheets sheets={sheets} />;
}
