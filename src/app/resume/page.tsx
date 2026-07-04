"use client";

/**
 * /resume — field-report-style CV. A white document sheet on the desk
 * (always light — it's a printed artifact, even in dark mode), exportable
 * to PDF via window.print() (@page rules in globals.css).
 *
 * Content curated from Jared's LinkedIn profile (Profile.pdf, 2026-07)
 * + the site's positioning. English-only by design — it's the document
 * he sends to international recruiters. Employer names are fine here
 * (they're on his public LinkedIn); the P&C bullets stay generic per the
 * employer-safe rule.
 */

const CONTACT = [
  { label: "Email", value: "jared.sjj@gmail.com", href: "mailto:jared.sjj@gmail.com" },
  { label: "Portfolio", value: "jaredsong.com", href: "https://jaredsong.com" },
  { label: "LinkedIn", value: "linkedin.com/in/jared-song-a6371295", href: "https://www.linkedin.com/in/jared-song-a6371295/" },
  { label: "Location", value: "Kaohsiung, Taiwan" },
];

const EXPERIENCE = [
  {
    company: "Eagle AI",
    role: "Product Designer",
    dates: "Feb 2026 — present",
    place: "Taiwan · US-facing B2B",
    bullets: [
      "Designed web and mobile experiences for an AI-assisted B2B workflow platform in construction payment review.",
      "Turned complex payment and evidence processes into role-based flows, screens, and clear review states.",
      "Collaborated with product, engineering, and stakeholders to shape practical MVP features.",
      "Explored AI-assisted patterns for document review, matching, verification, approvals, and exception handling.",
    ],
  },
  {
    company: "What's Wheelcake 微吃車輪餅",
    role: "Founder / Creative Director — independent side venture",
    dates: "Feb 2025 — Jun 2026",
    place: "Kaohsiung, Taiwan",
    bullets: [
      "Built and operated a small food brand outside full-time product work — naming, identity, menu design, pricing, packaging, and the counter workflow.",
      "Applied product thinking to physical retail: treated the menu as a feature set and daily operations as a system.",
      "Established stable operations, then wound down deliberately to focus on full-time product design.",
    ],
  },
  {
    company: "CaCa Taxi Myanmar",
    role: "Senior UI/UX Designer → Lead Designer",
    dates: "Jul 2023 — Feb 2025",
    place: "Remote · Yangon market",
    bullets: [
      "Only designer across a five-surface ride-hailing ecosystem: passenger app, driver app, delivery flows, an 18-module operator backend, and the marketing site.",
      "Designed tri-script interfaces (EN · 中文 · မြန်မာ) and the design system that kept all surfaces consistent.",
      "Shipped a four-month MVP; both apps live in stores; designed flows for the first KBZPay wallet integration by a ride-hailing platform in Myanmar.",
      "Designed and developed cacataxi.com; provided design direction across app, web, branding, and marketing.",
    ],
  },
  {
    company: "炫網興業有限公司",
    role: "UI/UX Designer",
    dates: "Mar 2023 — Jul 2023",
    place: "Taichung, Taiwan",
    bullets: [
      "Designed CMS templates and admin panel interfaces for web and mobile; responsive WordPress sites and e-commerce visuals for business clients.",
    ],
  },
  {
    company: "OPPO",
    role: "Graphic & Motion Designer",
    dates: "Mar 2022 — Dec 2022",
    place: "Malaysia",
    bullets: [
      "Created motion graphics and illustration for marketing, advertising, and social; produced visuals with HR and e-commerce teams for training and sales.",
    ],
  },
  {
    company: "Vita Me Sdn Bhd",
    role: "Creative Designer → Lead Designer",
    dates: "Oct 2020 — Nov 2021",
    place: "Kuala Lumpur, Malaysia",
    bullets: [
      "Promoted to Lead Designer within months; led branding, design timelines, UI/UX prototypes, and website features with marketing and development teams.",
    ],
  },
  {
    company: "JaredDesigns · IE Asia",
    role: "Freelance / Contract Designer",
    dates: "2012 — present",
    place: "Malaysia",
    bullets: [
      "Custom branding, websites, and social design across industries as a long-term creative partner; earlier in-house roles at Elite Expo (EDM/landing pages, HTML/CSS), IACT CREACTIVE agency, and TrustedCompany.",
    ],
  },
];

const SKILLS = [
  {
    group: "Product & UX",
    items: "User flows · wireframes · prototyping · role-based UX · design systems · localization (EN/中/မြန်)",
  },
  {
    group: "Visual & Motion",
    items: "Brand identity · campaign assets · motion graphics · illustration · social content",
  },
  {
    group: "Web & Build",
    items: "HTML/CSS · Tailwind · WordPress · developer handoff · lightweight prototypes",
  },
  {
    group: "Tools",
    items: "Figma · Photoshop · Illustrator · After Effects · Google Analytics",
  },
];

const EDUCATION = [
  { school: "University of Central Lancashire", detail: "MBA — Master of Business Administration", dates: "2022 — 2023" },
  { school: "New Era University College", detail: "OTHM Level 7 Diploma, Strategic Management & Leadership", dates: "2022 — 2023" },
  { school: "IACT College", detail: "Diploma, Creative Multimedia", dates: "2012 — 2014" },
];

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-4 mt-10 flex items-baseline gap-3 border-b border-neutral-900 pb-2 break-after-avoid">
      <span className="font-mono text-[11px] text-neutral-400">{n}</span>
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em]">
        {title}
      </h2>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen px-4 pb-24 pt-24 md:pt-28 print:p-0">
      {/* toolbar — screen only */}
      <div className="mx-auto mb-6 flex max-w-[52rem] items-center justify-between print:hidden">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Prints to A4 · exports clean
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Download PDF
        </button>
      </div>

      {/* the document — always light, like a printed sheet on the desk */}
      <article className="resume-sheet mx-auto max-w-[52rem] bg-white px-7 py-10 text-neutral-900 shadow-[0_24px_60px_-18px_rgba(20,20,18,0.28)] sm:px-12 sm:py-14 print:max-w-none print:p-0 print:shadow-none">
        {/* ── document header ── */}
        <header className="border-b-2 border-neutral-900 pb-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Jared Song
            </h1>
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
              Curriculum Vitae · 2026
            </span>
          </div>
          <p className="mt-2 text-base font-medium sm:text-lg">
            Product-minded UI/UX Designer — messy workflows → clear product
            experiences.
          </p>
          <div className="mt-5 grid gap-x-8 gap-y-1.5 font-mono text-[12px] sm:grid-cols-2">
            {CONTACT.map((c) => (
              <div key={c.label} className="flex gap-3">
                <span className="w-16 shrink-0 uppercase tracking-wider text-neutral-400">
                  {c.label}
                </span>
                {c.href ? (
                  <a href={c.href} className="underline-offset-2 hover:underline">
                    {c.value}
                  </a>
                ) : (
                  <span>{c.value}</span>
                )}
              </div>
            ))}
          </div>
        </header>

        {/* ── summary ── */}
        <SectionLabel n="01" title="Profile" />
        <p className="text-[13.5px] leading-relaxed text-neutral-700">
          Product &amp; creative designer with 8+ years across UI/UX, digital
          products, branding, and multimedia. I work best where ideas are
          still messy — organizing unclear requirements into flows, screens,
          and systems people can actually use. Experience spans agencies,
          startups, corporate teams, and my own small business. Malaysian,
          based in Kaohsiung, Taiwan; open to product roles across markets.
        </p>

        {/* ── experience ── */}
        <SectionLabel n="02" title="Experience" />
        <div className="space-y-7">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company + job.dates}
              className="grid gap-1 sm:grid-cols-[10.5rem_1fr] sm:gap-6 break-inside-avoid"
            >
              <div className="font-mono text-[11.5px] leading-5 text-neutral-400">
                <p>{job.dates}</p>
                <p>{job.place}</p>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold">
                  {job.role}{" "}
                  <span className="font-normal text-neutral-500">
                    · {job.company}
                  </span>
                </h3>
                <ul className="mt-1.5 space-y-1 text-[13px] leading-relaxed text-neutral-700">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden className="text-neutral-300">
                        —
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── skills ── */}
        <SectionLabel n="03" title="Capabilities" />
        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <div key={s.group} className="break-inside-avoid">
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                {s.group}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-neutral-700">
                {s.items}
              </p>
            </div>
          ))}
        </div>

        {/* ── education ── */}
        <SectionLabel n="04" title="Education" />
        <div className="space-y-3">
          {EDUCATION.map((e) => (
            <div
              key={e.school}
              className="grid gap-1 sm:grid-cols-[10.5rem_1fr] sm:gap-6 break-inside-avoid"
            >
              <p className="font-mono text-[11.5px] text-neutral-400">
                {e.dates}
              </p>
              <p className="text-[13px] text-neutral-700">
                <span className="font-semibold text-neutral-900">
                  {e.school}
                </span>{" "}
                — {e.detail}
              </p>
            </div>
          ))}
        </div>

        {/* ── notes ── */}
        <SectionLabel n="05" title="Additional" />
        <ul className="space-y-1 text-[13px] leading-relaxed text-neutral-700">
          <li className="flex gap-2">
            <span aria-hidden className="text-neutral-300">—</span>
            <span>
              <strong className="font-semibold text-neutral-900">
                Taiwan Employment Gold Card
              </strong>{" "}
              holder — open work authorization in Taiwan.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-neutral-300">—</span>
            <span>Languages: English, Mandarin Chinese, Malay.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-neutral-300">—</span>
            <span>
              Certifications: Google Analytics IQ · Google UX Design
              (Foundations; UX Process) · Fundamentals of Digital Marketing.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-neutral-300">—</span>
            <span>
              KFC &quot;Better Together&quot; Campaign — Merit Award.
            </span>
          </li>
        </ul>

        {/* ── document footer ── */}
        <footer className="mt-12 flex items-baseline justify-between border-t border-neutral-200 pt-4 font-mono text-[10.5px] uppercase tracking-widest text-neutral-400">
          <span>jaredsong.com/resume</span>
          <span>Full case studies at jaredsong.com</span>
        </footer>
      </article>
    </div>
  );
}
