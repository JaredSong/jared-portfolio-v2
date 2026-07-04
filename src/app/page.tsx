import Image from "next/image";
import CacaFolder from "@/components/home/CacaFolder";
import ProcessStrip from "@/components/home/ProcessStrip";
import OtherSides from "@/components/home/OtherSides";

const connectLinks = [
  { label: "Email", href: "mailto:jared.sjj@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jared-song-a6371295/" },
  { label: "Resume", href: "/Jared Song - Resume.pdf" },
  { label: "Archive", href: "https://archive.jaredsong.com/" },
];

function StatusPill() {
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
      </span>
      Open to opportunities
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <main>
        {/* ── Hero ── */}
        <section className="mx-auto max-w-4xl px-6 pb-32 pt-44 md:pt-56">
          <h1 className="max-w-2xl text-3xl font-semibold leading-snug tracking-tight md:text-4xl">
            Product designer, 19 months at a Yangon ride-hailing startup. Sole
            designer across five surfaces in three scripts.{" "}
            <span className="text-neutral-500 dark:text-neutral-400">
              I also code, motion, and occasionally WordPress.
            </span>
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#connect"
              className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all hover:shadow-md dark:border-transparent"
            >
              Get in Touch
            </a>
            <StatusPill />
          </div>
        </section>

        <CacaFolder />
        <ProcessStrip />
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
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Currently · Taiwan</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Hello.</h2>
              <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
                I&apos;m Jared, a Malaysian designer based in Taiwan. I spent
                the last 19 months as the sole designer at CaCa, a ride-hailing
                startup serving Yangon — the case study above is the long
                version of what that meant. Before CaCa: a mix of mobile
                design, WordPress, motion, and social work, mostly freelance.
                I&apos;m currently looking for what&apos;s next.
              </p>
              <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
                How I can help
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
                I work best in product roles where design owns the surface
                end-to-end — flows, system, copy, and (sometimes) the build.
                I&apos;m strongest when there&apos;s a real constraint to
                design against: a hard market, a small team, a non-obvious
                user, a script that doesn&apos;t have ready-made type.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
                Worked with
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>CaCa Taxi · Yangon</li>
                <li>MyanLife · integration</li>
                <li className="text-neutral-400 dark:text-neutral-500">
                  {/* PLACEHOLDER — earlier freelance clients */}
                  earlier clients TBD
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Connect ── */}
        <section id="connect" className="mx-auto max-w-4xl px-6 pb-32">
          <div className="grid gap-8 md:grid-cols-[200px_1fr]">
            <h2 className="text-2xl font-semibold">Let&apos;s Connect</h2>
            <div>
              {connectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center justify-between border-b border-neutral-200 py-4 transition-colors hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <span className="font-medium">{link.label}</span>
                  <span aria-hidden className="text-neutral-400 dark:text-neutral-500">
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
