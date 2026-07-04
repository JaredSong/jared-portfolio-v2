"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Root redirect stub (v1 pattern): / forwards to the visitor's locale tree.
 * Saved explicit choice (localStorage "lang", written by the switcher) wins;
 * otherwise browser language decides zh vs en. Nothing is written here —
 * only a real click on the switcher persists a preference.
 */
export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    let locale = "en";
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "zh") {
        locale = saved;
      } else if (navigator.language?.toLowerCase().startsWith("zh")) {
        locale = "zh";
      }
    } catch {
      /* storage unavailable — default en */
    }
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        aria-label="Loading"
        className="size-6 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent dark:border-neutral-100 dark:border-t-transparent"
      />
    </div>
  );
}
