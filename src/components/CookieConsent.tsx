"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

/**
 * Cookie consent — v1 parity: one line + Accept, shown ~2s after first
 * visit until accepted. Accepting grants ONLY analytics_storage via Google
 * Consent Mode (ads stay denied — see the GA snippet in the root layout);
 * before that, GA runs cookieless pings. Styled as a small paper slip to
 * match the desk, not a full-width legal bar.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("cookie-consent")) return;
    } catch {
      return; // no storage → consent can't persist; don't nag every load
    }
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
    } catch {
      /* non-fatal */
    }
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center print:hidden">
      <div className="paper-grain relative flex max-w-xl flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-[var(--paper-edge)] bg-[var(--paper)] px-5 py-4 shadow-[var(--paper-shadow)]">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {t("cookie.message")}
        </p>
        <button
          type="button"
          onClick={accept}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
}
