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
    "nav.menu": "Open menu",
    "nav.close": "Close menu",
    "nav.theme": "Toggle dark mode",
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

    // ── Case study chapters (real copy, from Jared's draft 2026-07-04) ──
    // Facts confirmed: only designer on the team; 4-month MVP → expansion;
    // apps still live (framed positively, no digs); MyanGO nameable;
    // bicycle-fleet delivery refactor real. No invented metrics.
    "cs.lede.kicker": "Case study · ~12 min",
    "cs.lede.title": "CaCa — a ride-hailing platform in Yangon",
    "cs.lede.body":
      "19 months as the only designer on the team. Five surfaces, three scripts, a four-month MVP — live in stores. This is the long version.",
    "cs.why.kicker": "01 · Why CaCa exists",
    "cs.why.title": "You can't copy Uber in Yangon",
    "cs.why.body":
      "CaCa means 'taxi' in the local dialect. It grew out of an earlier concept called MyanGO into an attempt at something the city didn't have: a complete ride-hailing ecosystem. The catch — global patterns don't survive here. Payments are cash, networks drop, phones are low-end Android, and the interface has to hold three writing systems that share nothing.",
    "cs.role.kicker": "02 · My role",
    "cs.role.title": "The only designer on the team",
    "cs.role.body":
      "Every screen across five surfaces went through me — product design, UX structure, UI, branding support, and the website. Engineers built, operations ran the fleet; I owned how all of it looked, flowed, and explained itself. The job wasn't drawing screens. It was turning business needs into flows people could actually follow.",
    "cs.challenge.kicker": "03 · The challenge",
    "cs.challenge.title": "Not one app — one operating system",
    "cs.challenge.body":
      "A passenger booking a ride, a driver accepting a job, an operator untangling a dispute — different users, different interfaces, one connected system. Three problems shaped everything: making fragmented needs feel like one product, designing for real conditions instead of ideal flows, and moving at MVP speed without wrecking the structure the future needed.",
    "cs.eco.kicker": "04 · Ecosystem map",
    "cs.eco.title": "One loop connects everything",
    "cs.eco.body":
      "Passenger request → driver acceptance → trip tracking → payment → backend management. I mapped the platform as a single loop before designing any screen — it showed where each role enters the system, and where information has to cross between apps and internal tools.",
    "cs.passenger.kicker": "05a · Passenger app",
    "cs.passenger.title": "Booking that explains itself",
    "cs.passenger.body":
      "Registration, booking, location selection, tracking, payment, trip status — the flows every ride app has, rebuilt for users who may be on their first smartphone and a bad connection. Every booking state is visible and named, so the app never leaves you guessing whether a car is actually coming.",
    "cs.driver.kicker": "05b · Driver app",
    "cs.driver.title": "Drivers don't browse — they react",
    "cs.driver.body":
      "The driver app runs dark, and every screen answers one question: what happens next? Job offer → accept → pickup → trip → cash. Each state had to survive sunlight, motion, and a three-second decision window.",
    "cs.delivery.kicker": "05c · Delivery",
    "cs.delivery.title": "Same loop, different cargo",
    "cs.delivery.body":
      "When the platform expanded into delivery — including a bicycle fleet — I refactored flows on flow diagrams before touching screens. Where the ride logic held, we reused it; where a parcel isn't a passenger (handoffs, recipients, proof), the flow forked. Diagram-first kept the refactor honest.",
    "cs.backend.kicker": "05d · Operator backend",
    "cs.backend.title": "The 18-module control room",
    "cs.backend.body":
      "Orders, users, settings, monitoring, and the rest of platform operations — 18 admin modules, bilingual EN + 中, designed so the ops team could run the fleet without manual coordination for every exception.",
    "cs.website.kicker": "05e · Marketing site",
    "cs.website.title": "cacataxi.com — designed and built",
    "cs.website.body":
      "The public face: service, trust, and identity, responsive across devices. I designed it and shipped the build myself — the current version came together in a single AI-assisted session on Laravel + Livewire.",
    "cs.system.kicker": "06 · Design system",
    "cs.system.title": "One language across five surfaces",
    "cs.system.body":
      "Tokens, components, a shadow ladder, and type that holds EN · 中文 · မြန်မာ on the same screen — three scripts with no shared rhythm, baseline, or line height. The system is what let one designer keep five surfaces consistent while the roadmap kept moving.",
    "cs.qa.kicker": "07 · The unhappy paths",
    "cs.qa.title": "Designing for when it goes wrong",
    "cs.qa.body":
      "Network unstable, no drivers nearby, payment failed, GPS drifting — in Yangon these aren't edge cases, they're Tuesday. Every critical flow got explicit failure states, because the moment something breaks is the moment an app earns or loses trust.",
    "cs.local.kicker": "08 · Local context",
    "cs.local.title": "Designed for Yangon, not for app stores",
    "cs.local.body":
      "Cash-first flows over card-first assumptions. Tri-script interfaces over English-only. States that assume the network will drop. None of these were compromises — they were the brief. The global playbook was the thing to resist.",
    "cs.outcome.kicker": "09 · Outcome",
    "cs.outcome.title": "Shipped, and still running",
    "cs.outcome.body":
      "A four-month MVP grew into a full platform: passenger and driver apps live in stores, delivery flows, an 18-module backend, and a public site — a product foundation that still serves Yangon today.",
    "cs.closing.kicker": "10 · Reflection",
    "cs.closing.title": "Start with the workflow, not the screen",
    "cs.closing.body":
      "CaCa taught me to design ecosystems, not screens: understand how users, operations, business goals, and technical constraints connect — then turn that complexity into a flow people can actually use. Real workflow first, roles second, system map third. The interface is what comes after.",
    "cs.closing.cta": "Get in touch",
    "cs.back": "← Back home",

    // ── Homepage ──
    // Positioning (2026-07-04): pattern, not project — voice line as H1,
    // recruiter-legible job title in the sub.
    "home.hero.title": "Messy workflows → clear product experiences.",
    "home.hero.sub":
      "I'm Jared Song, a product-minded UI/UX designer turning complex operations, documents, and multilingual interfaces into usable web and mobile products.",
    "home.hero.cta": "Get in Touch",
    "home.hero.status": "Open to opportunities",

    "home.cs.kicker": "Selected work",
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

    // Hierarchy (deliberate): Eagle = second professional proof (concise,
    // employer-safe), Wheelcake = personality/craft proof, Earlier = range.
    "home.sides.kicker": "More work",
    "home.sides.note":
      "Same pattern, different angles — B2B workflow, brand craft, and the years before.",
    "home.sides.eagle": "Construction Payment Review",
    "home.sides.eagle.sub": "role-based review · evidence · approvals",
    "home.sides.eagle.note": "concise case",
    "home.sides.wheelcake": "Wheelcake",
    "home.sides.wheelcake.sub": "a personal food-brand concept",
    "home.sides.earlier": "Earlier work",
    "home.sides.earlier.sub": "WordPress · social · advertising · 2018–2023",

    "home.about.hello": "Hello.",
    "home.about.location": "Currently · Taiwan",
    "home.about.p1":
      "I'm Jared Song, a product-minded UI/UX designer from Malaysia, based in Taiwan — 8+ years across digital products, websites, CMS, e-commerce, motion, and multimedia design. The flagship case above is the long version of the most recent chapter.",
    "home.about.how": "How I work",
    "home.about.p2":
      "I'm strongest when a product has messy constraints: multiple user roles, unclear operations, localization, handoff complexity, or workflows that need to become easier for real people to use.",
    "home.about.worked": "Worked with",
    "home.about.tbd": "WordPress · social · advertising · 2018–2023",

    // ── Capabilities ──
    "home.cap.kicker": "Capabilities",
    "home.cap.i1.t": "Product & UX flows",
    "home.cap.i1.d": "multi-role, operational, end-to-end",
    "home.cap.i2.t": "Design systems",
    "home.cap.i2.d": "tokens, components, tri-script type",
    "home.cap.i3.t": "Localization",
    "home.cap.i3.d": "EN · 中文 · မြန်မာ",
    "home.cap.i4.t": "Motion & multimedia",
    "home.cap.i4.d": "reels, brand, advertising",
    "home.cap.i5.t": "Web & CMS",
    "home.cap.i5.d": "WordPress, e-commerce",
    "home.cap.i6.t": "Code",
    "home.cap.i6.d": "Next.js · Flutter · Laravel, AI-assisted",

    "home.connect.title": "Let's Connect",
    "home.link.email": "Email",
    "home.link.linkedin": "LinkedIn",
    "home.link.resume": "Resume",
    "home.link.archive": "Archive",

    // ── /also side folders (papers inside each mini folder) ──
    // Eagle case is EMPLOYER-SAFE by design: generic naming, role-based flow
    // descriptions only, no proprietary visuals or numbers.
    "also.eagle.kicker": "Concise case · P /",
    "also.eagle.title": "Construction payment review workflow",
    "also.eagle.body":
      "Eagle AI is a construction payment and evidence review workflow designed to help teams move from document intake to owner approval with clearer review states.",
    "also.eagle.s2.kicker": "Roles & flows",
    "also.eagle.s2.title": "Five roles, one review path",
    "also.eagle.s2.body":
      "I worked on web and mobile product flows for role-based users including subcontractors, project managers, inspectors, owners, and admins. The design focused on document intake, line-item review, evidence collection, certification decisions, correction requests, owner approval packages, and audit trail visibility.",
    "also.eagle.s3.kicker": "The design challenge",
    "also.eagle.s3.title": "AI is the reader, not the source",
    "also.eagle.s3.body":
      "A key design challenge was separating what the system could read or suggest from what humans still needed to verify. The workflow was structured around practical AI assistance: reading documents, matching line items, flagging exceptions, and helping reviewers focus on unresolved decisions.",
    "also.wheelcake.kicker": "Personal case · W /",
    "also.wheelcake.title": "Wheelcake",
    "also.wheelcake.body":
      "A personal food-brand concept exploring identity, storytelling, and customer-facing digital touchpoints.",
    "also.earlier.kicker": "Archive · E /",
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
    "nav.menu": "開啟選單",
    "nav.close": "關閉選單",
    "nav.theme": "切換深色模式",
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
    "cs.lede.kicker": "案例研究 · 約 12 分鐘",
    "cs.lede.title": "CaCa — 仰光的叫車平台",
    "cs.lede.body":
      "擔任團隊中唯一設計師的 19 個月。五個介面、三種文字、四個月上線的 MVP——已上架。這是完整版的故事。",
    "cs.why.kicker": "01 · 為何是 CaCa",
    "cs.why.title": "在仰光，你抄不了 Uber",
    "cs.why.body":
      "CaCa 在當地方言裡就是「計程車」。它從早期概念 MyanGO 演變而來，要做出這座城市還沒有的東西：完整的叫車生態系。難就難在——全球的套路在這裡行不通。付款靠現金、網路會斷、手機多是低階 Android，介面還得同時容納三種毫無共通點的文字系統。",
    "cs.role.kicker": "02 · 我的角色",
    "cs.role.title": "團隊裡唯一的設計師",
    "cs.role.body":
      "五個介面上的每一個畫面都經過我的手——產品設計、UX 架構、UI、品牌支援、網站。工程師負責開發、營運團隊管車隊；而整個系統怎麼呈現、怎麼流動、怎麼把自己講清楚，由我負責。這份工作不是畫畫面，而是把商業需求變成人真的能照著走的流程。",
    "cs.challenge.kicker": "03 · 挑戰",
    "cs.challenge.title": "不是一個 App，而是一套作業系統",
    "cs.challenge.body":
      "乘客訂車、司機接單、營運處理爭議——不同的使用者、不同的介面、同一套系統。三個問題貫穿一切：讓分散的需求像同一個產品、為真實環境而非理想流程設計、在 MVP 的速度下不毀掉未來需要的結構。",
    "cs.eco.kicker": "04 · 生態系地圖",
    "cs.eco.title": "一條迴圈串起所有東西",
    "cs.eco.body":
      "乘客叫車 → 司機接單 → 行程追蹤 → 付款 → 後台管理。在畫任何畫面之前，我先把平台畫成一條迴圈——它標出每個角色從哪裡進入系統，資訊又要在哪裡跨越 App 與內部工具。",
    "cs.passenger.kicker": "05a · 乘客端",
    "cs.passenger.title": "會自己說明的訂車流程",
    "cs.passenger.body":
      "註冊、訂車、選點、追蹤、付款、行程狀態——每個叫車 App 都有的流程，為可能拿著人生第一支智慧型手機、訊號又不穩的使用者重新打造。每個訂車狀態都看得見、有名字，App 永遠不會讓你猜車到底來不來。",
    "cs.driver.kicker": "05b · 司機端",
    "cs.driver.title": "司機不瀏覽——他們只反應",
    "cs.driver.body":
      "司機端預設深色，每個畫面只回答一個問題：接下來呢？接單通知 → 接受 → 接客 → 行程 → 收現金。每個狀態都得撐過烈日、顛簸，和三秒鐘的決策窗口。",
    "cs.delivery.kicker": "05c · 外送",
    "cs.delivery.title": "同一條迴圈，不同的貨",
    "cs.delivery.body":
      "當平台擴張到外送——包括一支腳踏車隊——我先在流程圖上重構，才動畫面。載客邏輯撐得住的地方就重用；包裹不是乘客的地方（交接、收件人、憑證），流程就分岔。圖先行，讓重構誠實。",
    "cs.backend.kicker": "05d · 營運後台",
    "cs.backend.title": "18 個模組的控制室",
    "cs.backend.body":
      "訂單、使用者、設定、監控，以及平台營運的其餘一切——18 個管理模組、中英雙語，讓營運團隊不必為每個例外人工協調，就能管好整個車隊。",
    "cs.website.kicker": "05e · 行銷網站",
    "cs.website.title": "cacataxi.com——從設計到上線",
    "cs.website.body":
      "對外的門面：服務、信任與識別，跨裝置響應式。我自己設計、自己把它做出來——現行版本在一次 AI 協作中以 Laravel + Livewire 完成。",
    "cs.system.kicker": "06 · 設計系統",
    "cs.system.title": "五個介面，一套語言",
    "cs.system.body":
      "Token、元件、陰影階層，以及能讓英文 · 中文 · မြန်မာ 同屏共存的字型系統——三種文字沒有共同的節奏、基線或行高。正是這套系統，讓一位設計師能在路線圖不斷變動時，維持五個介面的一致。",
    "cs.qa.kicker": "07 · 不順利的路徑",
    "cs.qa.title": "為出錯的時刻而設計",
    "cs.qa.body":
      "網路不穩、附近沒車、付款失敗、GPS 漂移——在仰光，這些不是邊緣案例，是日常。每條關鍵流程都有明確的失敗狀態，因為出錯的瞬間，正是 App 贏得或失去信任的瞬間。",
    "cs.local.kicker": "08 · 在地脈絡",
    "cs.local.title": "為仰光設計，不是為應用商店",
    "cs.local.body":
      "現金優先，而非預設綁卡。三文字介面，而非只有英文。預設網路會斷的狀態設計。這些都不是妥協——而是題目本身。真正要抵抗的，是那本全球通用的教科書。",
    "cs.outcome.kicker": "09 · 成果",
    "cs.outcome.title": "上線了，而且還在跑",
    "cs.outcome.body":
      "四個月的 MVP 長成完整平台：乘客與司機 App 上架、外送流程、18 模組後台、對外網站——一個至今仍在服務仰光的產品基礎。",
    "cs.closing.kicker": "10 · 反思",
    "cs.closing.title": "從工作流程開始，而不是畫面",
    "cs.closing.body":
      "CaCa 教會我設計生態系，而不是畫面：先理解使用者、營運、商業目標與技術限制如何相連，再把這份複雜變成人真的能用的流程。先看真實的工作流程，再認角色，再畫系統地圖——介面，是最後才來的東西。",
    "cs.closing.cta": "與我聯繫",
    "cs.back": "← 回首頁",

    // ── Homepage ──
    "home.hero.title": "混亂的工作流程 → 清晰的產品體驗。",
    "home.hero.sub":
      "我是宋家駿 Jared Song，以產品思維出發的 UI/UX 設計師，把複雜的營運、文件與多語介面，變成好用的網頁與行動產品。",
    "home.hero.cta": "與我聯繫",
    "home.hero.status": "開放工作機會",

    "home.cs.kicker": "精選作品",
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

    "home.sides.kicker": "更多作品",
    "home.sides.note":
      "同一套模式，不同的角度——B2B 工作流程、品牌手感、以及更早的那些年。",
    "home.sides.eagle": "工程請款審核",
    "home.sides.eagle.sub": "角色化審核 · 證據 · 簽核",
    "home.sides.eagle.note": "精簡案例",
    "home.sides.wheelcake": "Wheelcake",
    "home.sides.wheelcake.sub": "個人食物品牌概念",
    "home.sides.earlier": "早期作品",
    "home.sides.earlier.sub": "WordPress · 社群 · 廣告 · 2018–2023",

    "home.about.hello": "你好。",
    "home.about.location": "現居 · 台灣",
    "home.about.p1":
      "我是宋家駿 Jared Song，來自馬來西亞、現居台灣的產品思維 UI/UX 設計師——累積 8 年以上的數位產品、網站、CMS、電商、動態與多媒體設計經驗。上面的旗艦案例，是最近這段經歷的完整版。",
    "home.about.how": "我怎麼工作",
    "home.about.p2":
      "當產品充滿混亂的限制時，我發揮得最好：多重使用者角色、未定型的營運、在地化、交接的複雜度，或是需要讓真實的人更容易使用的工作流程。",
    "home.about.worked": "合作過",
    "home.about.tbd": "WordPress · 社群 · 廣告 · 2018–2023",

    // ── Capabilities ──
    "home.cap.kicker": "能力",
    "home.cap.i1.t": "產品與 UX 流程",
    "home.cap.i1.d": "多角色、營運型、端到端",
    "home.cap.i2.t": "設計系統",
    "home.cap.i2.d": "Token、元件、三文字字型",
    "home.cap.i3.t": "在地化",
    "home.cap.i3.d": "英文 · 中文 · မြန်မာ",
    "home.cap.i4.t": "動態與多媒體",
    "home.cap.i4.d": "Reel、品牌、廣告",
    "home.cap.i5.t": "網站與 CMS",
    "home.cap.i5.d": "WordPress、電商",
    "home.cap.i6.t": "程式",
    "home.cap.i6.d": "Next.js · Flutter · Laravel，AI 協作",

    "home.connect.title": "聯繫方式",
    "home.link.email": "電子郵件",
    "home.link.linkedin": "LinkedIn",
    "home.link.resume": "履歷",
    "home.link.archive": "作品庫",

    // ── /also side folders ──
    "also.eagle.kicker": "精簡案例 · P /",
    "also.eagle.title": "工程請款審核流程",
    "also.eagle.body":
      "Eagle AI 是一套工程請款與證據審核工作流程，協助團隊從文件收件走到業主簽核，讓審核狀態更清晰。",
    "also.eagle.s2.kicker": "角色與流程",
    "also.eagle.s2.title": "五種角色，一條審核路徑",
    "also.eagle.s2.body":
      "我負責網頁與行動端的角色化產品流程——涵蓋分包商、專案經理、稽查員、業主與管理員。設計聚焦於文件收件、逐項審核、證據蒐集、核付決策、補件要求、業主簽核包與稽核軌跡的可見性。",
    "also.eagle.s3.kicker": "設計挑戰",
    "also.eagle.s3.title": "AI 是讀者，不是資料來源",
    "also.eagle.s3.body":
      "關鍵的設計挑戰，是把系統能讀取或建議的，與人仍需查核的部分區分開來。工作流程圍繞務實的 AI 協助建構：讀取文件、比對項目、標記例外，讓審核者專注在尚未解決的決策上。",
    "also.wheelcake.kicker": "個人案例 · W /",
    "also.wheelcake.title": "Wheelcake",
    "also.wheelcake.body":
      "探索識別、敘事與顧客端數位接觸點的個人食物品牌概念。",
    "also.earlier.kicker": "作品庫 · E /",
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
