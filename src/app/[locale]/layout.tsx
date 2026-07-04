import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";

/**
 * Locale segment — /en/... and /zh/... are real static routes (v1-style),
 * so both languages are crawlable and deep-linkable. The URL is the source
 * of truth for the language; the header switcher navigates between the two
 * trees. UI locales are EN/中 only (decision 2026-07-04) — Burmese is
 * case-study *content*, not chrome, so it gets no route tree.
 */

const LOCALES = ["en", "zh"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: "/en/",
        "zh-Hant": "/zh/",
        "x-default": "/en/",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const lang = locale as Lang;

  return (
    // <html lang> is set client-side by the provider; this wrapper carries
    // the locale in the static HTML for crawlers (v1 did the same).
    <div lang={lang === "zh" ? "zh-Hant" : "en"}>
      <LanguageProvider initial={lang}>
        <SiteHeader />
        {children}
        <BackToTop />
        <CookieConsent />
      </LanguageProvider>
    </div>
  );
}
