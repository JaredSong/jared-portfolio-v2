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
      "CaCa means 'taxi' in the local dialect. The project started as MyanGO — renamed after the name clashed with an already-registered company — and set out to build something the city didn't have: a complete ride-hailing ecosystem. The catch — global patterns don't survive here. Payments run cash-first, networks drop, phones are low-end Android, and the interface has to hold three writing systems that share nothing.",
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
      "The driver app runs dark, and every screen answers one question: what happens next? Job offer → accept → pickup → trip → payment. Each state had to survive sunlight, motion, and a three-second decision window.",
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
      "The public face: service, trust, and identity, responsive across devices. I designed and developed it myself, end to end.",
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
      "Cash-first flows, with cashless built on a KBZPay partnership — CaCa was the first ride-hailing platform in Myanmar to integrate the wallet people actually use, rather than card rails. Tri-script interfaces over English-only. States that assume the network will drop. None of these were compromises — they were the brief. The global playbook was the thing to resist.",
    "cs.outcome.kicker": "09 · Outcome",
    "cs.outcome.title": "Shipped, and still running",
    "cs.outcome.body":
      "A four-month MVP grew into a full platform: passenger and driver apps live in stores, delivery flows, an 18-module backend, a first-in-market KBZPay partnership, and a public site — a product foundation that still serves Yangon today.",
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
      "I'm a UI/UX designer who turns complex operations, documents, and multilingual interfaces into usable web and mobile products.",
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
    "home.sides.wheelcake.sub": "a wheel-cake brand I founded & ran",
    "home.sides.earlier": "Earlier work",
    "home.sides.earlier.sub": "WordPress · social · advertising · 2018–2023",

    "home.about.hello": "Hello.",
    "home.about.location": "Currently · Taiwan",
    "home.about.p1":
      "I'm Jared Song, a Malaysian UI/UX designer based in Taiwan. For most of the last decade I've worked on products where the hard part wasn't making screens look good — it was making complicated workflows usable for real people.",
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
    "home.cap.i6.t": "Implementation-aware design",
    "home.cap.i6.d": "HTML/CSS · CMS · front-end handoff · lightweight prototypes",

    "home.connect.title": "Let's Connect",
    "home.link.email": "Email",
    "home.link.linkedin": "LinkedIn",
    "home.link.resume": "Resume",
    "home.link.archive": "Archive",

    // ── /also side folders (papers inside each mini folder) ──
    // Payment-review case: NO employer name anywhere in public copy, and no
    // work detail until explicitly cleared — workflow-name + status only.
    "also.eagle.kicker": "Concise case · P /",
    "also.eagle.title": "Construction payment review workflow",
    "also.eagle.body":
      "A concise case on document intake, evidence collection, review states, correction requests, and approval flows — details in conversation.",
    // Wheelcake: real brand Jared FOUNDED AND OPERATED in Kaohsiung; the
    // business closed — stated honestly, framed as the hands-on product
    // lesson it was. Never call it "live".
    "also.wheelcake.kicker": "Personal case · W /",
    "also.wheelcake.title": "What's Wheelcake 微吃車輪餅",
    "also.wheelcake.body":
      "A wheel-cake brand I founded and operated in Kaohsiung — name, identity, menu, pricing, packaging, and the daily workflow behind the counter. The brand eventually closed; the lessons didn't.",
    "also.wheelcake.visit": "whatswheelcake.com ↗",
    "wc.why.kicker": "01 · Why",
    "wc.why.title": "I wanted to make something you could hold",
    "wc.why.body":
      "After years of digital design, I wanted to build something physical — something people could taste and react to immediately. The wheel cake was the right format: familiar, affordable, emotionally warm. The interesting problem was making a simple traditional snack feel fresh and worth remembering.",
    "wc.challenge.kicker": "02 · The challenge",
    "wc.challenge.title": "A brand around a product that exists everywhere",
    "wc.challenge.body":
      "Everyone already knows what a wheel cake is. The brand needed a reason to stand out without losing the comfort of the original. How should it feel? How many flavors can one person actually operate? How do customers decide fast? Every question was brand and operations at once.",
    "wc.brand.kicker": "03 · Brand",
    "wc.brand.title": "Curious, conversational, easy to remember",
    "wc.brand.body":
      "'What's Wheelcake' is a question on purpose — casual, slightly playful, not too traditional, not too premium. The brand had to make people comfortable asking, trying flavors, and remembering it through one simple phrase.",
    "wc.menu.kicker": "04 · Menu as product",
    "wc.menu.title": "A menu is a feature set",
    "wc.menu.body":
      "Every flavor was evaluated like a feature: taste, prep time, ingredient cost, storage, cooking consistency, customer interest. Some ideas were attractive but impractical; some easy but forgettable. The final menu balanced creativity against what one pair of hands could deliver consistently on a busy day.",
    "wc.ops.kicker": "05 · Operations as design",
    "wc.ops.title": "The workflow behind the counter is the design",
    "wc.ops.body":
      "A beautiful brand fails if the workflow can't support real demand. Prep time, storage, cooking flow, cleaning, inventory, cost control, physical space — running the stand daily taught me that a good idea needs a system behind it, or it doesn't survive contact with a queue.",
    "wc.close.kicker": "06 · Reflection",
    "wc.close.title": "Experience attracts; the system decides if it lasts",
    "wc.close.body":
      "The brand eventually closed — and it was still one of the most hands-on product lessons I've had: real customers, real time pressure, real cost, immediate reactions. Digital design has users, flows, and edge cases; a food stand has all three, in person, at the 6pm rush. Every product needs both a good experience and a workable system.",
    "also.earlier.kicker": "Archive · E /",
    "also.earlier.title": "Earlier work",
    "also.earlier.body":
      "WordPress, social, advertising, freelance — 2018–2023.",
    "also.wip.kicker": "Status",
    "also.wip.title": "Summary here, details in conversation",
    "also.wip.body":
      "This is the deliberate short version. The full case is in progress — happy to walk through the rest in person.",
    "also.back": "← Back home",
  },
  zh: {
    "nav.work": "作品",
    "nav.about": "關於",
    "nav.contact": "聯絡",
    "nav.menu": "開啟選單",
    "nav.close": "關閉選單",
    "nav.theme": "切換深色模式",
    "s0.kicker": "Jared Song · 產品設計師",
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
      "CaCa 在當地方言裡就是「計程車」。專案原名 MyanGO，因為與已註冊的公司撞名而改名——目標是做出這座城市還沒有的東西：完整的叫車生態系。難就難在——全球的套路在這裡行不通。付款以現金為主、網路會斷、手機多是低階 Android，介面還得同時容納三種毫無共通點的文字系統。",
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
      "司機端預設深色，每個畫面只回答一個問題：接下來呢？接單通知 → 接受 → 接客 → 行程 → 收款。每個狀態都得撐過烈日、顛簸，和三秒鐘的決策窗口。",
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
      "對外的門面：服務、信任與識別，跨裝置響應式。從設計到開發上線，都由我親手完成。",
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
      "現金優先，而無現金支付則建立在 KBZPay 合作上——CaCa 是緬甸第一個整合這款國民錢包的叫車平台，而非走信用卡路線。三文字介面，而非只有英文。預設網路會斷的狀態設計。這些都不是妥協——而是題目本身。真正要抵抗的，是那本全球通用的教科書。",
    "cs.outcome.kicker": "09 · 成果",
    "cs.outcome.title": "上線了，而且還在跑",
    "cs.outcome.body":
      "四個月的 MVP 長成完整平台：乘客與司機 App 上架、外送流程、18 模組後台、市場首例的 KBZPay 合作、對外網站——一個至今仍在服務仰光的產品基礎。",
    "cs.closing.kicker": "10 · 反思",
    "cs.closing.title": "從工作流程開始，而不是畫面",
    "cs.closing.body":
      "CaCa 教會我設計生態系，而不是畫面：先理解使用者、營運、商業目標與技術限制如何相連，再把這份複雜變成人真的能用的流程。先看真實的工作流程，再認角色，再畫系統地圖——介面，是最後才來的東西。",
    "cs.closing.cta": "與我聯繫",
    "cs.back": "← 回首頁",

    // ── Homepage ──
    "home.hero.title": "混亂的工作流程 → 清晰的產品體驗。",
    "home.hero.sub":
      "我是一名 UI/UX 設計師，把複雜的營運、文件與多語介面，變成好用的網頁與行動產品。",
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
    "home.sides.wheelcake.sub": "我創立並經營的車輪餅品牌",
    "home.sides.earlier": "早期作品",
    "home.sides.earlier.sub": "WordPress · 社群 · 廣告 · 2018–2023",

    "home.about.hello": "你好。",
    "home.about.location": "現居 · 台灣",
    "home.about.p1":
      "我是 Jared Song，來自馬來西亞、現居台灣的 UI/UX 設計師。過去近十年，我做的產品裡，最難的從來不是把畫面做漂亮，而是讓複雜的工作流程，對真實的人變得好用。",
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
    "home.cap.i6.t": "實作意識的設計",
    "home.cap.i6.d": "HTML/CSS · CMS · 前端交接 · 輕量原型",

    "home.connect.title": "聯繫方式",
    "home.link.email": "電子郵件",
    "home.link.linkedin": "LinkedIn",
    "home.link.resume": "履歷",
    "home.link.archive": "作品庫",

    // ── /also side folders ──
    "also.eagle.kicker": "精簡案例 · P /",
    "also.eagle.title": "工程請款審核流程",
    "also.eagle.body":
      "聚焦文件收件、證據蒐集、審核狀態、補件要求與簽核流程的精簡案例——細節留在面談。",
    "also.wheelcake.kicker": "個人案例 · W /",
    "also.wheelcake.title": "What's Wheelcake 微吃車輪餅",
    "also.wheelcake.body":
      "我在高雄創立並親手經營的車輪餅品牌——命名、識別、菜單、定價、包裝，以及櫃檯後的每日工作流程。品牌最終收了，學到的東西沒有。",
    "also.wheelcake.visit": "whatswheelcake.com ↗",
    "wc.why.kicker": "01 · 起點",
    "wc.why.title": "我想做一個拿得起來的東西",
    "wc.why.body":
      "做了多年數位設計之後，我想做點實體的——人們可以馬上品嚐、馬上有反應的東西。車輪餅是對的載體：熟悉、平價、帶著溫度。有趣的問題在於：怎麼讓一個簡單的傳統小吃，變得新鮮、值得被記住？",
    "wc.challenge.kicker": "02 · 挑戰",
    "wc.challenge.title": "在到處都有的產品上，蓋一個品牌",
    "wc.challenge.body":
      "每個人都知道車輪餅是什麼。品牌需要一個突出的理由，又不能失去原本的親切感。它該是什麼感覺？一個人實際上撐得起幾種口味？顧客怎麼快速決定？每個問題都同時是品牌題，也是營運題。",
    "wc.brand.kicker": "03 · 品牌",
    "wc.brand.title": "好奇、口語、好記",
    "wc.brand.body":
      "「What's Wheelcake／微吃車輪餅」刻意是個問句——輕鬆、帶點玩心，不太傳統、不太高級。品牌要讓人自在地開口問、願意換口味嘗試，然後用一句話記住它。",
    "wc.menu.kicker": "04 · 菜單即產品",
    "wc.menu.title": "菜單就是功能清單",
    "wc.menu.body":
      "每個口味都像評估一個功能：味道、備料時間、成本、保存、出品穩定度、顧客興趣。有些點子吸引人但不實際；有些容易做卻不難忘。最終的菜單，是創意和一雙手在忙碌時段能穩定交付之間的平衡。",
    "wc.ops.kicker": "05 · 營運即設計",
    "wc.ops.title": "櫃檯後的流程，就是設計本身",
    "wc.ops.body":
      "品牌再漂亮，工作流程撐不起真實需求就是失敗。備料、保存、烹製動線、清潔、庫存、成本、空間——每天顧攤教會我：好點子背後需要一套系統，否則撐不過一條排隊人龍。",
    "wc.close.kicker": "06 · 反思",
    "wc.close.title": "體驗吸引人；系統決定走多遠",
    "wc.close.body":
      "品牌最終收了——但它仍是我做過最貼身的產品課：真實的顧客、真實的時間壓力、真實的成本、立即的反應。數位設計有使用者、流程與邊緣案例；一個小吃攤三者都有，而且是面對面、在傍晚六點的尖峰。每個產品都需要好的體驗，加上一套行得通的系統。",
    "also.earlier.kicker": "作品庫 · E /",
    "also.earlier.title": "早期作品",
    "also.earlier.body": "WordPress、社群、廣告、接案——2018 至 2023。",
    "also.wip.kicker": "狀態",
    "also.wip.title": "摘要在這裡，細節在面談",
    "also.wip.body":
      "這是刻意保留的精簡版。完整案例整理中——其餘的部分，很樂意當面走一遍。",
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
