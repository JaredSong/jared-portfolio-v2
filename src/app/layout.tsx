import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";

// Set the dark class before first paint so there's no light→dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

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
        <LanguageProvider>
          <SiteHeader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
