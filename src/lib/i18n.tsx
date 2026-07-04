"use client";

/**
 * Lightweight i18n for the v2 prototype.
 *
 * Deliberately NOT next-intl / locale-routed yet — this is a placeholder
 * layer that proves the tri-script requirement (EN · 中 · မြန်) works end to
 * end (switching, fallback, font rendering) without committing the whole app
 * to a routing framework. When v2 hardens, this same dictionary shape can be
 * lifted into next-intl message catalogs with almost no copy changes.
 *
 * Missing keys fall back to English, so a half-translated locale still renders.
 */

import { createContext, useContext, useState, type ReactNode } from "react";

export const LANGS = ["en", "zh", "my"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  zh: "中",
  my: "မြန်",
};

type Dict = Record<string, string>;

// PLACEHOLDER copy — real case-study strings drop in later.
// zh is complete; my (Burmese) covers kickers/titles and falls back to EN for
// body copy until a native speaker verifies the longer strings.
const dictionaries: Record<Lang, Dict> = {
  en: {
    "nav.work": "Work",
    "nav.about": "About",
    "nav.contact": "Contact",
    "s0.kicker": "Jared Song · Product Designer",
    "s0.title":
      "19 months as the sole designer of a Yangon ride-hailing platform.",
    "s0.body":
      "Five surfaces. Three scripts. Scroll to page through it — each section is a sheet that rises over the last.",
    "s0.scroll": "scroll",
    "s1.kicker": "01 · Why CaCa",
    "s1.title": "Designing for a hard market",
    "s1.body":
      "Low-end Android, unstable networks, cash-first users. Those constraints shaped every screen — not as excuses, as the brief.",
    "s2.kicker": "02 · Ecosystem",
    "s2.title": "Five surfaces, one platform",
    "s2.body":
      "Passenger, driver, delivery, operator backend, marketing site — one system holding all of them together.",
    "s3.kicker": "03 · Tri-script",
    "s3.title": "EN · 中文 · မြန်မာ",
    "s3.body":
      "Type that had to hold up across three writing systems — none of them sharing a rhythm, a baseline, or a line height.",
    "s4.kicker": "04 · Now",
    "s4.title": "Open to what's next",
    "s4.body":
      "Based in Taiwan, looking for product roles where design owns the surface end-to-end.",
    "s4.cta": "Get in touch",

    // ── Case study chapters (placeholder copy) ──
    "cs.hero.kicker": "Case study · ~12 min",
    "cs.hero.title": "CaCa — a ride-hailing platform in Yangon",
    "cs.hero.body":
      "Sole designer, July 2023 → February 2025. Five surfaces, three scripts, live in stores. Scroll to page through it.",
    "cs.why.kicker": "01 · Why CaCa exists",
    "cs.why.title": "Designing for a hard market",
    "cs.why.body":
      "Low-end Android, unstable networks, cash-first users. The constraints weren't excuses — they were the brief.",
    "cs.eco.kicker": "02 · Ecosystem",
    "cs.eco.title": "Five surfaces, one platform",
    "cs.eco.body":
      "Passenger, driver, delivery, operator backend, and marketing site — one system holding all of them together.",
    "cs.surfaces.kicker": "03 · The surfaces",
    "cs.surfaces.title": "Two apps, a fleet, a backend, a site",
    "cs.surfaces.body":
      "Each surface had its own users, constraints, and states — but shared one design language.",
    "cs.system.kicker": "04 · Design system",
    "cs.system.title": "A system that held under pressure",
    "cs.system.body":
      "Tokens, a shadow ladder, and components built to survive three scripts and a shifting roadmap.",
    "cs.qa.kicker": "05 · QA flow",
    "cs.qa.title": "Designing the unhappy paths",
    "cs.qa.body":
      "Network-unstable, no-drivers, payment-failed — the states that decide whether people trust the app.",
    "cs.local.kicker": "06 · Local context",
    "cs.local.title": "EN · 中文 · မြန်မာ",
    "cs.local.body":
      "Type and layout that had to hold up across three writing systems that share no rhythm, baseline, or line height.",
    "cs.closing.kicker": "07 / 08 · Closing",
    "cs.closing.title": "What 19 months as sole designer taught me",
    "cs.closing.body":
      "Owning the surface end-to-end, in a hard market, with a small team — this is the work I want more of.",
    "cs.closing.cta": "Get in touch",
    "cs.back": "← Back home",

    // ── Homepage ──
    "home.hero.title": "One designer, five surfaces, three scripts.",
    "home.hero.sub":
      "19 months as the sole designer at a Yangon ride-hailing startup — I also code, motion, and occasionally WordPress.",
    "home.hero.cta": "Get in Touch",
    "home.hero.status": "Open to opportunities",

    "home.cs.kicker": "Case study",
    "home.cs.note":
      "Heads up — this one's lengthy. ~12 min read. Sole designer, five surfaces, three scripts, Yangon.",
    "home.cs.title": "A ride-hailing platform in Yangon",
    "home.cs.dates": "Sole designer · July 2023 → February 2025",
    "home.cs.read": "12 min read",
    "home.cs.aria": "CaCa case study, 12 minute read",
    "home.cs.postit1": "19 months",
    "home.cs.postit2": "sole designer",
    "home.pill.surfaces": "5 surfaces",
    "home.pill.scripts": "3 scripts",
    "home.pill.live": "Live in stores",

    "home.sides.kicker": "Other sides",
    "home.sides.note": "Smaller in scope, larger in number.",
    "home.sides.coding": "Coding side",
    "home.sides.coding.sub": "cacataxi.com · this portfolio · Flutter",
    "home.sides.motion": "Motion side",
    "home.sides.motion.sub": "reels & experiments",
    "home.sides.motion.note": "coming soon",
    "home.sides.earlier": "Earlier work",
    "home.sides.earlier.sub": "WordPress · social · advertising · 2018–2023",

    "home.about.hello": "Hello.",
    "home.about.location": "Currently · Taiwan",
    "home.about.p1":
      "I'm Jared, a Malaysian designer based in Taiwan. I spent the last 19 months as the sole designer at CaCa, a ride-hailing startup serving Yangon — the case study above is the long version of what that meant. Before CaCa: a mix of mobile design, WordPress, motion, and social work, mostly freelance. I'm currently looking for what's next.",
    "home.about.how": "How I can help",
    "home.about.p2":
      "I work best in product roles where design owns the surface end-to-end — flows, system, copy, and (sometimes) the build. I'm strongest when there's a real constraint to design against: a hard market, a small team, a non-obvious user, a script that doesn't have ready-made type.",
    "home.about.worked": "Worked with",
    "home.about.tbd": "earlier clients TBD",

    "home.connect.title": "Let's Connect",
    "home.link.email": "Email",
    "home.link.linkedin": "LinkedIn",
    "home.link.resume": "Resume",
    "home.link.archive": "Archive",

    // ── /also side folders (papers inside each mini folder) ──
    "also.coding.kicker": "Other sides · C /",
    "also.coding.title": "Coding side",
    "also.coding.body":
      "cacataxi.com (Laravel + Livewire, shipped in one AI-assisted session), this portfolio, and Flutter experiments.",
    "also.motion.kicker": "Other sides · M /",
    "also.motion.title": "Motion side",
    "also.motion.body": "Reels and experiments — the reel is being assembled.",
    "also.earlier.kicker": "Other sides · E /",
    "also.earlier.title": "Earlier work",
    "also.earlier.body":
      "WordPress, social, advertising, freelance — 2018–2023.",
    "also.wip.kicker": "Status",
    "also.wip.title": "Being assembled",
    "also.wip.body":
      "Content lands on these papers as the build progresses. The folder's real — the pages are still being written.",
    "also.back": "← Back home",
  },
  zh: {
    "nav.work": "作品",
    "nav.about": "關於",
    "nav.contact": "聯絡",
    "s0.kicker": "宋家駿 · 產品設計師",
    "s0.title": "在仰光叫車平台擔任唯一設計師的 19 個月。",
    "s0.body":
      "五個介面，三種文字。向下滾動翻閱——每一段都是一張疊上前一張的紙。",
    "s0.scroll": "向下滾動",
    "s1.kicker": "01 · 為何是 CaCa",
    "s1.title": "為艱難的市場而設計",
    "s1.body":
      "低階 Android、不穩定的網路、以現金為主的使用者。這些限制塑造了每一個畫面——不是藉口，而是題目本身。",
    "s2.kicker": "02 · 生態系",
    "s2.title": "五個介面，一個平台",
    "s2.body":
      "乘客、司機、外送、後台、行銷網站——由同一套系統將它們串在一起。",
    "s3.kicker": "03 · 三種文字",
    "s3.title": "英文 · 中文 · မြန်မာ",
    "s3.body":
      "字體必須在三種書寫系統間都站得住腳——它們的節奏、基線、行高都各不相同。",
    "s4.kicker": "04 · 現在",
    "s4.title": "尋找下一段旅程",
    "s4.body": "現居台灣，尋找能讓設計端到端主導介面的產品職位。",
    "s4.cta": "與我聯繫",

    // ── Case study chapters ──
    "cs.hero.kicker": "案例研究 · 約 12 分鐘",
    "cs.hero.title": "CaCa — 仰光的叫車平台",
    "cs.hero.body":
      "唯一設計師，2023 年 7 月至 2025 年 2 月。五個介面、三種文字、已上架。向下滾動翻閱。",
    "cs.why.kicker": "01 · 為何是 CaCa",
    "cs.why.title": "為艱難的市場而設計",
    "cs.why.body":
      "低階 Android、不穩定的網路、以現金為主的使用者。這些限制不是藉口，而是題目本身。",
    "cs.eco.kicker": "02 · 生態系",
    "cs.eco.title": "五個介面，一個平台",
    "cs.eco.body": "乘客、司機、外送、後台、行銷網站——由同一套系統串在一起。",
    "cs.surfaces.kicker": "03 · 各個介面",
    "cs.surfaces.title": "兩個 App、一支車隊、一個後台、一個網站",
    "cs.surfaces.body":
      "每個介面都有各自的使用者、限制與狀態——卻共用同一套設計語言。",
    "cs.system.kicker": "04 · 設計系統",
    "cs.system.title": "能承受壓力的系統",
    "cs.system.body": "Token、陰影階層，以及能撐過三種文字與變動路線圖的元件。",
    "cs.qa.kicker": "05 · QA 流程",
    "cs.qa.title": "為不順利的路徑而設計",
    "cs.qa.body":
      "網路不穩、沒有司機、付款失敗——這些狀態決定了人們是否信任這個 App。",
    "cs.local.kicker": "06 · 在地脈絡",
    "cs.local.title": "英文 · 中文 · မြန်မာ",
    "cs.local.body":
      "字體與版面必須在三種節奏、基線、行高都不同的書寫系統間站得住腳。",
    "cs.closing.kicker": "07 / 08 · 結語",
    "cs.closing.title": "擔任 19 個月唯一設計師教會我的事",
    "cs.closing.body":
      "在艱難市場、小團隊中，端到端主導介面——這就是我想要做更多的工作。",
    "cs.closing.cta": "與我聯繫",
    "cs.back": "← 回首頁",

    // ── Homepage ──
    "home.hero.title": "一位設計師，五個介面，三種文字。",
    "home.hero.sub":
      "在仰光叫車新創擔任唯一設計師的 19 個月——我也寫程式、做動態，偶爾用 WordPress。",
    "home.hero.cta": "與我聯繫",
    "home.hero.status": "開放工作機會",

    "home.cs.kicker": "案例研究",
    "home.cs.note":
      "先說一聲——這篇很長，約 12 分鐘。唯一設計師、五個介面、三種文字、仰光。",
    "home.cs.title": "仰光的叫車平台",
    "home.cs.dates": "唯一設計師 · 2023 年 7 月 → 2025 年 2 月",
    "home.cs.read": "12 分鐘",
    "home.cs.aria": "CaCa 案例研究，約 12 分鐘",
    "home.cs.postit1": "19 個月",
    "home.cs.postit2": "唯一設計師",
    "home.pill.surfaces": "5 個介面",
    "home.pill.scripts": "3 種文字",
    "home.pill.live": "已上架",

    "home.sides.kicker": "其他面向",
    "home.sides.note": "規模較小，數量更多。",
    "home.sides.coding": "程式面",
    "home.sides.coding.sub": "cacataxi.com · 這個作品集 · Flutter",
    "home.sides.motion": "動態面",
    "home.sides.motion.sub": "Reel 與實驗",
    "home.sides.motion.note": "即將推出",
    "home.sides.earlier": "早期作品",
    "home.sides.earlier.sub": "WordPress · 社群 · 廣告 · 2018–2023",

    "home.about.hello": "你好。",
    "home.about.location": "現居 · 台灣",
    "home.about.p1":
      "我是 Jared，來自馬來西亞、現居台灣的設計師。過去 19 個月，我在服務仰光的叫車新創 CaCa 擔任唯一設計師——上面的案例研究就是這段經歷的完整版。在 CaCa 之前：行動設計、WordPress、動態與社群的混合經歷，多為接案。目前正在尋找下一段旅程。",
    "home.about.how": "我能幫上什麼",
    "home.about.p2":
      "我最適合讓設計端到端主導介面的產品職位——流程、系統、文案，有時連開發也一起。當有真實的限制可以對抗時，我發揮得最好：艱難的市場、小團隊、非典型的使用者、沒有現成字型的文字系統。",
    "home.about.worked": "合作過",
    "home.about.tbd": "更早的客戶待補",

    "home.connect.title": "聯繫方式",
    "home.link.email": "電子郵件",
    "home.link.linkedin": "LinkedIn",
    "home.link.resume": "履歷",
    "home.link.archive": "作品庫",

    // ── /also side folders ──
    "also.coding.kicker": "其他面向 · C /",
    "also.coding.title": "程式面",
    "also.coding.body":
      "cacataxi.com（Laravel + Livewire，一次 AI 協作完成上線）、這個作品集，以及 Flutter 實驗。",
    "also.motion.kicker": "其他面向 · M /",
    "also.motion.title": "動態面",
    "also.motion.body": "Reel 與實驗——展示影片正在整理中。",
    "also.earlier.kicker": "其他面向 · E /",
    "also.earlier.title": "早期作品",
    "also.earlier.body": "WordPress、社群、廣告、接案——2018 至 2023。",
    "also.wip.kicker": "狀態",
    "also.wip.title": "整理中",
    "also.wip.body":
      "內容會隨著開發進度陸續放上這些紙張。資料夾是真的——頁面還在書寫中。",
    "also.back": "← 回首頁",
  },
  my: {
    "s0.kicker": "Jared Song · ဒီဇိုင်နာ",
    "s0.title":
      "ရန်ကုန်အငှားကားပလက်ဖောင်း၏ တစ်ဦးတည်းသော ဒီဇိုင်နာအဖြစ် ၁၉ လ။",
    "s0.body": "မျက်နှာပြင် ၅ ခု၊ စာ ၃ မျိုး။",
    "s0.scroll": "ဆွဲချပါ",
    "s1.kicker": "၀၁ · CaCa",
    "s1.title": "ခက်ခဲသောဈေးကွက်အတွက် ဒီဇိုင်း",
    "s2.kicker": "၀၂ · ဂေဟစနစ်",
    "s2.title": "မျက်နှာပြင် ၅ ခု၊ ပလက်ဖောင်း တစ်ခု",
    "s3.kicker": "၀၃ · စာသုံးမျိုး",
    "s3.title": "English · 中文 · မြန်မာ",
    "s4.kicker": "၀၄ · ယခု",
    "s4.title": "နောက်တစ်ဆင့်အတွက် အသင့်",
    "s4.cta": "ဆက်သွယ်ရန်",
  },
};

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) =>
    dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
