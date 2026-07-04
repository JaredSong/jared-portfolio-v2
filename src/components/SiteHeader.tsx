"use client";

/**
 * Global site header — carried over from v1: floating translucent pills over a
 * textured background (not a solid bar). Persistent across every page.
 *   left  : avatar + name + verified badge · LinkedIn · Archive
 *   right : Work / About / Contact · divider · dark toggle · EN/中
 *
 * Adapted to v2: internal links are locale-prefixed (/en/..., /zh/...) and
 * the EN/中 switch NAVIGATES to the same path in the other locale tree —
 * the URL is the language source of truth. Language scope is EN/中 by
 * decision — Burmese lives inside case-study content, not the chrome.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n, LANG_LABELS, type Lang } from "@/lib/i18n";

const UI_LANGS: Lang[] = ["en", "zh"];

const navItems = [
  { key: "nav.work", href: "/#case-study" },
  { key: "nav.about", href: "/#about" },
  { key: "nav.contact", href: "/#connect" },
];

const pill =
  "flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.66)] dark:bg-[rgba(255,255,255,0.14)] text-[#494949] dark:text-white backdrop-blur-[87px] shadow-[0_0_0_1px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-200";

function VerifiedMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="me-1 size-5 text-[#1D9BF0]"
    >
      <path
        fillRule="evenodd"
        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm-3 12h6m-6 3h3.75"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const { lang, setLang, t, localeHref } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Switch language = go to the same page in the other locale tree.
  const switchTo = (l: Lang) => {
    if (l === lang) return;
    setLang(l); // persists the choice (feeds the / redirect stub)
    const rest = pathname.replace(/^\/(en|zh)(?=\/|$)/, "");
    router.push(`/${l}${rest}`);
  };

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 md:pt-6 print:hidden">
      <div className="mx-auto flex w-full max-w-[60.75rem] items-center justify-between">
        <div className="flex shrink-0 items-center gap-3">
          <Link href={localeHref("/")} className={`${pill} p-1`}>
            <span className="relative h-8 w-8">
              <Image
                src="/jaredsong-pixel.png"
                alt="Jared Song"
                fill
                sizes="32px"
                className="rounded-full object-cover"
                priority
              />
            </span>
            <span className="ms-3 me-1 text-sm font-medium text-[#262626] dark:text-white">
              Jared Song
            </span>
            <VerifiedMark />
          </Link>

          <Link
            href="https://www.linkedin.com/in/jared-song-a6371295/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${pill} hidden size-10 hover:bg-[#0B66C2] hover:text-white sm:flex`}
          >
            <LinkedInIcon />
          </Link>

          <Link
            href={localeHref("/resume")}
            aria-label="Resume"
            className={`${pill} hidden size-10 hover:bg-caca-green hover:text-white sm:flex`}
          >
            <ResumeIcon />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <nav className="hidden items-center md:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={localeHref(item.href)}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-[#262626] duration-100 hover:bg-white/[0.66] hover:backdrop-blur-[87px] dark:text-white dark:hover:bg-neutral-900/[0.66]"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden h-6 w-px bg-[#8c8c8c]/60 md:block" />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("nav.menu")}
            aria-expanded={menuOpen}
            className={`${pill} size-10 md:hidden`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("nav.theme")}
            className={`${pill} size-10`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
              className="size-5 dark:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0Z"
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
              className="hidden size-5 dark:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>

          <div className="flex h-10 items-center rounded-full bg-[rgba(255,255,255,0.66)] p-1 backdrop-blur-[87px] dark:bg-[rgba(255,255,255,0.14)]">
            {UI_LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchTo(l)}
                aria-pressed={lang === l}
                className={`flex h-8 items-center rounded-full px-3 text-sm font-medium transition-colors ${
                  lang === l
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-[#494949] hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[rgba(250,250,248,0.94)] px-4 py-5 backdrop-blur-xl dark:bg-[rgba(12,13,15,0.94)] md:hidden">
          <div className="mx-auto flex max-w-[60.75rem] justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="https://www.linkedin.com/in/jared-song-a6371295/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${pill} size-10 hover:bg-[#0B66C2] hover:text-white`}
              >
                <LinkedInIcon />
              </Link>
              <Link
                href={localeHref("/resume")}
                aria-label="Resume"
                className={`${pill} size-10 hover:bg-caca-green hover:text-white`}
              >
                <ResumeIcon />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={t("nav.close")}
              className={`${pill} size-10`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="mx-auto mt-24 flex max-w-[60.75rem] flex-col divide-y divide-neutral-300/70 border-y border-neutral-300/70 dark:divide-white/10 dark:border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={localeHref(item.href)}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-6 text-2xl font-semibold tracking-tight text-[#262626] dark:text-white"
              >
                {t(item.key)}
                <span
                  aria-hidden
                  className="text-base text-neutral-500 dark:text-neutral-400"
                >
                  ↗
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
