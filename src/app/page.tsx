"use client";

import Image from "next/image";
import CacaFolder from "@/components/home/CacaFolder";
import OtherSides from "@/components/home/OtherSides";
import { useI18n } from "@/lib/i18n";

const connectLinks = [
  { key: "home.link.email", href: "mailto:jared.sjj@gmail.com" },
  { key: "home.link.linkedin", href: "https://www.linkedin.com/in/jared-song-a6371295/" },
  { key: "home.link.resume", href: "/Jared Song - Resume.pdf" },
  { key: "home.link.archive", href: "https://archive.jaredsong.com/" },
];

function StatusPill() {
  const { t } = useI18n();
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
      </span>
      {t("home.hero.status")}
    </span>
  );
}

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen overflow-x-clip">
      <main>
        {/* ── Hero ── */}
        <section className="mx-auto max-w-4xl px-6 pb-32 pt-44 md:pt-56">
          {/* title + sub — h1 + <p>, not h1 + h2 (a subtitle isn't a section) */}
          {/* v1 hero-title scale: text-3xl md:text-5xl */}
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 md:text-xl">
            {t("home.hero.sub")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            {/* dark mode = v1's pill: dark surface, subtle border, white text */}
            <a
              href="#connect"
              className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all hover:shadow-md dark:border-white/20 dark:bg-neutral-900/70 dark:text-white dark:hover:bg-neutral-800"
            >
              {t("home.hero.cta")}
            </a>
            <StatusPill />
          </div>
        </section>

        <CacaFolder />
        <OtherSides />

        {/* ── Hello ── */}
        <section id="about" className="scroll-mt-28 mx-auto max-w-4xl px-6 pb-40">
          <div className="grid gap-10 md:grid-cols-[200px_1fr_200px]">
            <div>
              <Image
                src="/jaredsong-pixel.png"
                alt="Jared Song"
                width={160}
                height={160}
                className="rounded-2xl object-cover"
              />
              <p className="mt-4 font-medium">Jared Song</p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {t("home.about.location")}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{t("home.about.hello")}</h2>
              <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
                {t("home.about.p1")}
              </p>
              <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
                {t("home.about.how")}
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
                {t("home.about.p2")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
                {t("home.about.worked")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>Eagle AI · Taiwan</li>
                <li>CaCa Taxi · Yangon</li>
                <li>MyanLife · integration</li>
                <li className="text-neutral-400 dark:text-neutral-500">
                  {t("home.about.tbd")}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section id="capabilities" className="mx-auto max-w-4xl px-6 pb-40">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {t("home.cap.kicker")}
          </h3>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
            {(["i1", "i2", "i3", "i4", "i5", "i6"] as const).map((k) => (
              <div key={k} className="border-t border-neutral-200 pt-3 dark:border-white/10">
                <p className="font-medium">{t(`home.cap.${k}.t`)}</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {t(`home.cap.${k}.d`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Connect ── */}
        <section id="connect" className="mx-auto max-w-4xl px-6 pb-32">
          <div className="grid gap-8 md:grid-cols-[200px_1fr]">
            <h2 className="text-2xl font-semibold">{t("home.connect.title")}</h2>
            <div>
              {connectLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center justify-between border-b border-neutral-200 py-4 transition-colors hover:border-[#0B66C2]/40 dark:border-white/10 dark:hover:border-[#1D9BF0]/40"
                >
                  {/* hover: word grows from the left + takes the header's
                      blue (badge/LinkedIn palette); arrow flies up-right —
                      no background fill */}
                  <span className="inline-block origin-left font-medium transition-all duration-200 ease-out group-hover:scale-[1.06] group-hover:text-[#0B66C2] dark:group-hover:text-[#1D9BF0]">
                    {t(link.key)}
                  </span>
                  <span
                    aria-hidden
                    className="inline-block text-neutral-400 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0B66C2] dark:text-neutral-500 dark:group-hover:text-[#1D9BF0]"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
        © 2026 Jared Song
      </footer>
    </div>
  );
}
