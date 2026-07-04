import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Set the dark class before first paint so there's no light→dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

// GA4 — same property as v1. The measurement ID is public by nature (it
// ships in the HTML), so it's inlined rather than env-injected: a fresh
// clone must not silently lose analytics on a static export. Production
// only, so dev sessions don't pollute the data (v1 gated the same way).
// SPA route changes are covered by GA4's enhanced measurement (history
// events) — no per-route gtag calls needed.
const GA_ID = "G-3DJZTFVNJV";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaredsong.com"),
  title: {
    default: "Jared Song — Product / UIUX Designer",
    template: "%s — Jared Song",
  },
  description:
    "Product-minded UI/UX designer creating clear web and mobile experiences for complex workflows, cross-cultural products, and practical shipped interfaces.",
  alternates: {
    canonical: "/en/",
  },
  authors: [{ name: "Jared Song" }],
  keywords: [
    "Product Design",
    "UI/UX Design",
    "Web Design",
    "Mobile App Design",
    "Design Systems",
    "Frontend Design",
    "Taiwan",
    "Malaysia",
  ],
  openGraph: {
    title: "Jared Song — Product / UIUX Designer",
    description:
      "Product-minded UI/UX designer creating clear web and mobile experiences for complex workflows, cross-cultural products, and practical shipped interfaces.",
    url: "https://jaredsong.com/en/",
    siteName: "Jared Song Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/jaredsong.jpg",
        width: 1200,
        height: 630,
        alt: "Jared Song",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jared Song — Product / UIUX Designer",
    description:
      "Product-minded UI/UX designer creating clear web and mobile experiences for complex workflows, cross-cultural products, and practical shipped interfaces.",
    images: ["/jaredsong.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* overflow-x-clip: the decorative wash below is 120–150rem wide; clip
          (not hidden — that would break position:sticky) stops it stretching
          the document sideways */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} overflow-x-clip antialiased`}
      >
        {/* Decorative wiggling gradient wash at the top of every page —
            carried over from v1 (MainPage.tsx). Sits behind all content
            (-z-10), under the film-grain pseudos (-z-[1]). */}
        <div
          aria-hidden
          className="pointer-events-none absolute start-1/2 top-0 -z-10 aspect-[2/1] w-[100vw] origin-bottom -translate-x-1/2 overflow-hidden sm:w-[120rem] md:top-[-9%] md:-translate-x-1/3 lg:w-[150rem] lg:-translate-x-2/3 print:hidden"
        >
          <div className="grain-texture animate-moving-wiggle h-1/2 w-full origin-top blur-[30px] will-change-transform md:blur-[50px] dark:blur-[40px] dark:md:blur-[60px]" />
        </div>
        {children}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            {/* Consent Mode, v1-parity: everything denied by default; a
                previously accepted visitor is re-granted before config so
                the very first pageview is already consented. The banner
                (CookieConsent) grants on click. */}
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
try {
  if (localStorage.getItem('cookie-consent') === 'accepted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
