"use client";

import { useId } from "react";
import { useI18n } from "@/lib/i18n";

/**
 * Generic flow diagram for /also/payment-review — printed on the hero sheet's
 * aside slot like a hand-drawn process sketch on the paper.
 *
 * PRIVACY CEILING (hard rule, 2026-07-04): this draws ONLY the five generic
 * workflow stages already approved in the public body copy — intake →
 * evidence → review → approval, with correction requests looping back.
 * No employer name, no product UI, no module names, no numbers. Do not add
 * detail here without Jared explicitly clearing it.
 */

const NODE_STROKE = "stroke-neutral-400 dark:stroke-neutral-500";
const NODE_TEXT = "fill-neutral-700 dark:fill-neutral-200";
const LINE = "stroke-neutral-400 dark:stroke-neutral-500";

function Node({
  x,
  y,
  w,
  label,
  strokeClass = NODE_STROKE,
  textClass = NODE_TEXT,
  dashed = false,
  fontSize = 13,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  strokeClass?: string;
  textClass?: string;
  dashed?: boolean;
  fontSize?: number;
}) {
  const h = 50;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={`fill-transparent ${strokeClass}`}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight={500}
        className={textClass}
      >
        {label}
      </text>
    </g>
  );
}

export default function PaymentFlowDiagram() {
  const { t } = useI18n();
  // PaperSheets mounts the aside twice (mobile + desktop slots) — the marker
  // id must be unique per mount or the url(#) ref can resolve into the
  // display:none copy and the arrowheads vanish.
  const arrowId = useId();

  // mobile max-h mirrors SheetPhoto's cap — keeps the sheet inside one
  // viewport on short phones (the case-study content rule)
  return (
    <svg
      viewBox="0 0 360 340"
      role="img"
      aria-label={t("also.eagle.flow.aria")}
      className="mx-auto w-full max-w-[300px] max-h-[30vh] md:max-h-none md:max-w-[340px]"
    >
      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M0 0L8 4L0 8z"
            className="fill-neutral-400 dark:fill-neutral-500"
          />
        </marker>
      </defs>

      {/* main spine: intake → evidence → review → approval */}
      <Node x={20} y={12} w={170} label={t("also.eagle.flow.intake")} />
      <line
        x1={105}
        y1={62}
        x2={105}
        y2={92}
        strokeWidth={1.5}
        markerEnd={`url(#${arrowId})`}
        className={LINE}
      />
      <Node x={20} y={98} w={170} label={t("also.eagle.flow.evidence")} />
      <line
        x1={105}
        y1={148}
        x2={105}
        y2={178}
        strokeWidth={1.5}
        markerEnd={`url(#${arrowId})`}
        className={LINE}
      />
      <Node x={20} y={184} w={170} label={t("also.eagle.flow.review")} />
      <line
        x1={105}
        y1={234}
        x2={105}
        y2={264}
        strokeWidth={1.5}
        markerEnd={`url(#${arrowId})`}
        className={LINE}
      />
      <Node
        x={20}
        y={270}
        w={170}
        label={t("also.eagle.flow.approve")}
        strokeClass="stroke-blue-600 dark:stroke-blue-400"
        textClass="fill-blue-700 dark:fill-blue-300"
      />

      {/* correction loop: review → correction request → back into the flow
          before review (resubmitted evidence re-enters there) */}
      <Node
        x={215}
        y={130}
        w={130}
        label={t("also.eagle.flow.fix")}
        dashed
        fontSize={12}
        textClass="fill-neutral-500 dark:fill-neutral-400"
      />
      <polyline
        points="190,209 280,209 280,184"
        fill="none"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        markerEnd={`url(#${arrowId})`}
        className={LINE}
      />
      <line
        x1={215}
        y1={155}
        x2={116}
        y2={155}
        strokeWidth={1.5}
        strokeDasharray="5 4"
        markerEnd={`url(#${arrowId})`}
        className={LINE}
      />
      <text
        x={165}
        y={172}
        textAnchor="middle"
        fontSize={10}
        letterSpacing="0.08em"
        className="fill-neutral-400 uppercase dark:fill-neutral-500"
      >
        {t("also.eagle.flow.resubmit")}
      </text>
    </svg>
  );
}
