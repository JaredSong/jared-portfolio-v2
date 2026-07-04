"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

/**
 * Back-to-top — appears after ~one viewport of scrolling, header-pill
 * styling, bottom-right. Hidden in print.
 */
export default function BackToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("nav.top")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full bg-[rgba(255,255,255,0.66)] text-[#494949] shadow-[0_0_0_1px_rgba(0,0,0,0.05)] backdrop-blur-[87px] transition-all duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] motion-reduce:transition-none dark:bg-[rgba(255,255,255,0.14)] dark:text-white print:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
        className="size-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75 12 8.25l7.5 7.5" />
      </svg>
    </button>
  );
}
