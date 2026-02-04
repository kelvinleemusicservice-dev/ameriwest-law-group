// ===== Utilities =====
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function smoothAnchorLinks() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // close mobile nav after click
      const mobileNav = $("#mobileNav");
      if (mobileNav?.classList.contains("open")) mobileNav.classList.remove("open");
    });
  });
}

function setYear() {
  $("#year").textContent = new Date().getFullYear();
}

// ===== Mobile menu =====
function initMobileMenu() {
  const hamburger = $("#hamburger");
  const mobileNav = $("#mobileNav");
  hamburger?.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    mobileNav.setAttribute("aria-hidden", mobileNav.classList.contains("open") ? "false" : "true");
  });
}

// ===== Form demo submit (copy to clipboard) =====
async function handleFormSubmit(form, okEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    const text =
`[Ameriwest Lead]
Name: ${payload.name || ""}
Phone/WA: ${payload.phone || ""}
Debt: ${payload.debt || ""}
Language: ${payload.lang || ""}
Note: ${payload.note || ""}`.trim();

    try {
      await navigator.clipboard.writeText(text);
      okEl.hidden = false;
      okEl.textContent = "✅ 已複製內容到剪貼簿（示範）。你可把此表單改接收件服務。";
    } catch (err) {
      okEl.hidden = false;
      okEl.textContent = "✅ 已提交（示範）。未能自動複製剪貼簿，請手動複製。";
      // fallback: show alert with text
      alert(text);
    }

    form.reset();
  });
}

// ===== i18n (ZH/EN toggle) =====
const I18N = {
  zh: {
    "nav.services": "服務",
    "nav.cases": "案例",
    "nav.advantages": "優勢",
    "nav.process": "流程",
    "nav.faq": "FAQ",
    "nav.consult": "免費初談",

    "hero.badge": "加州律師團隊｜全美服務｜三語支援",
    "hero.title": "用合法、透明、有效的方式\n協助你走出債務壓力，重建生活",
    "hero.lead": "美西律師事務所（Ameriwest Law Group）專注債務協商（Debt Relief / Legal Debt Negotiation），亦提供消費者保護、信用調整、移民及民事相關法律服務。",
    "hero.ctaPrimary": "立即免費初談",
    "hero.ctaSecondary": "查看成功案例",
    "hero.stat1": "持牌律師平均執業經驗",
    "hero.stat2": "多數個案減免幅度起",
    "hero.stat3": "三語服務｜溝通無障礙",
    "hero.micro": "※ 本頁資訊僅供一般性說明，不構成法律意見；結果依個案而異。",

    "card.title": "快速評估：你適合債務協商嗎？",
    "card.subtitle": "留下基本資訊，我們會安排律師或團隊回覆（無壓力、透明）。",

    "form.name": "姓名",
    "form.phone": "電話 / WhatsApp",
    "form.debt": "大約債務金額（可選）",
    "form.lang": "偏好語言",
    "form.note": "簡述情況（可選）",
    "form.submit": "提交（示範）",
    "form.hint": "目前此表單為示範：預設會把資料複製到剪貼簿，你可改成 Formspree / Google Form 收件。",

    "services.title": "核心服務",
    "services.subtitle": "專為全美客戶提供債務協商與多元法律服務，由持牌律師主導談判與文件處理。",
    "services.s1.title": "債務協商（Debt Relief）",
    "services.s1.li1": "信用卡債務",
    "services.s1.li2": "個人貸款（Personal Loan）",
    "services.s1.li3": "第三方催收帳款",
    "services.s1.li4": "醫療欠款（Medical Bills）",
    "services.s1.li5": "高利息分期貸款",
    "services.s1.li6": "律師函與前法院程序",
    "services.s2.title": "消費者保護",
    "services.s2.desc": "以合法、透明方式維護消費者權益，協助降低催收壓力、改善談判條件，並控管法律風險。",
    "services.chip1": "法律溝通",
    "services.chip2": "風險控管",
    "services.chip3": "文件留存",
    "services.s3.title": "信用調整／移民／民事",
    "services.s3.desc": "依個案需求提供信用與法律策略建議，並處理移民及民事相關法律服務（以實際可承辦範圍為準）。",
    "services.s3.note": "如需更精準服務清單，可在初談時說明你的情況，我們會指派合適的律師或團隊成員。",

    "cases.title": "去識別化成功案例",
    "cases.subtitle": "以下為匿名化統計示例，結果依個案條件而異；不保證每位客戶達到相同結果。",
    "cases.a": "信用卡債務",
    "cases.b": "個人貸款＋分期",
    "cases.c": "催收債務",
    "cases.d": "醫療欠款",
    "cases.calloutTitle": "多數客戶可達成 75% 起的大幅債務減免",
    "cases.calloutDesc": "律師在協商策略、債務分析、法律溝通與風險控管方面具備高度專業能力。",
    "cases.calloutCta": "我也想評估",

    "adv.title": "事務所優勢",
    "adv.subtitle": "合法合規、流程標準化、中文溝通、透明收費，適合華人客群。",
    "adv.f1.title": "持牌律師主導｜合法合規",
    "adv.f1.desc": "溝通、談判、文件準備由律師或律所團隊處理，降低風險、流程更穩健。",
    "adv.f2.title": "成功率高｜減免幅度大",
    "adv.f2.desc": "大量案例顯示減免比例多以 75% 起作為典型範圍（依個案而異）。",
    "adv.f3.title": "三語服務｜理解華人痛點",
    "adv.f3.desc": "普通話／廣東話／英語，專門處理新移民、留學生、華人家庭常見信用與貸務問題。",
    "adv.f4.title": "流程透明｜不強迫消費",
    "adv.f4.desc": "個案檔案管理、進度追蹤、文件留存、清晰費用架構，避免隱藏費用。",
    "adv.f5.title": "內容穩健｜推廣友好",
    "adv.f5.desc": "正規法律服務，內容可控；適合在華人社群做教育式推廣與轉化。",
    "adv.f6.title": "律所介入後，客戶通常能",
    "adv.f6.li1": "降低催收壓力、減少騷擾",
    "adv.f6.li2": "獲得更合理的協商條件",
    "adv.f6.li3": "建立可負擔的還款與和解方案",
    "adv.f6.li4": "以更安全合法方式走出困境",

    "process.title": "標準化服務流程",
    "process.subtitle": "讓客戶知道「下一步是什麼」，減少焦慮，提升信任。",
    "process.s1.title": "免費初談與債務盤點",
    "process.s1.desc": "了解債務類型、金額、催收狀況與目標，建立個案檔案。",
    "process.s2.title": "策略建議與風險評估",
    "process.s2.desc": "由律師／團隊提出可行方案、節點與注意事項，明確告知費用與流程。",
    "process.s3.title": "律師主導協商與文件處理",
    "process.s3.desc": "對債權方進行法律溝通與協商，並保留所有重要文件與紀錄。",
    "process.s4.title": "達成和解／付款安排與追蹤",
    "process.s4.desc": "在客戶可負擔前提下建立和解方案，持續追蹤進度與必要文件。",

    "faq.title": "常見問題",
    "faq.subtitle": "這些回答是一般性資訊，個案仍以律師評估為準。",
    "faq.q1": "債務協商一定能減免到 75% 以上嗎？",
    "faq.a1": "不一定。減免幅度會依債務類型、債權方、欠款時間、資產/收入狀況、是否進入法律程序等而異。網站示例為匿名化案例，僅供參考。",
    "faq.q2": "如果已經被催收或收到律師函，還能處理嗎？",
    "faq.a2": "多數情況可以評估。越早介入越有利於策略與風險控管；若已接近訴訟或處於前法院程序，律師協助更重要。",
    "faq.q3": "你們提供哪些語言服務？",
    "faq.a3": "普通話／廣東話／英語。溝通無障礙，亦更能理解華人客戶在美國常見的信用與貸務壓力。",
    "faq.q4": "收費是否透明？會不會強迫購買方案？",
    "faq.a4": "我們強調透明與標準化流程：清楚告知費用架構、提供個案管理與進度追蹤，不以高壓銷售方式推方案。",

    "contact.title": "聯絡我們",
    "contact.subtitle": "把你的情況講清楚，我們會用最安全、合法的方式提供下一步建議。",
    "contact.quick": "快速聯絡",
    "contact.phone": "電話",
    "contact.email": "電郵",
    "contact.hours": "營業時間",
    "contact.hoursVal": "Mon–Fri 9:00–18:00（可預約）",
    "contact.backTop": "回到頂部",
    "contact.copy": "複製聯絡資訊",
    "contact.formTitle": "或填表（示範）",
    "contact.formNote": "你可以把此表單改接 Formspree / Google Form / CRM。現在會在提交後顯示與複製內容。",

    "disc.title": "免責聲明",
    "disc.body": "本網站資訊僅供一般性說明，並不構成法律意見或律師—當事人關係。任何結果依個案事實與法律程序而異；過往成果不保證未來結果。請在諮詢後由律師提供具體建議。",

    "footer.note": "California Based · Serving Clients Nationwide",
    "float.cta": "免費初談"
  },

  en: {
    "nav.services": "Services",
    "nav.cases": "Results",
    "nav.advantages": "Why Us",
    "nav.process": "Process",
    "nav.faq": "FAQ",
    "nav.consult": "Free Consult",

    "hero.badge": "California-Based · Nationwide Service · Trilingual Support",
    "hero.title": "Legal, transparent, effective.\nGet relief from debt pressure and rebuild your life.",
    "hero.lead": "Ameriwest Law Group focuses on legal debt negotiation (Debt Relief) and also provides consumer protection, credit-related support, immigration, and civil matters (subject to case fit).",
    "hero.ctaPrimary": "Get a Free Consult",
    "hero.ctaSecondary": "View Case Examples",
    "hero.stat1": "Avg. years of licensed experience",
    "hero.stat2": "Typical reduction starting range",
    "hero.stat3": "Mandarin / Cantonese / English",
    "hero.micro": "*This page is general information, not legal advice. Results vary by case.",

    "card.title": "Quick check: Are you a fit for debt negotiation?",
    "card.subtitle": "Leave basic info and we’ll schedule a callback. No pressure, transparent process.",

    "form.name": "Name",
    "form.phone": "Phone / WhatsApp",
    "form.debt": "Estimated debt (optional)",
    "form.lang": "Preferred language",
    "form.note": "Brief situation (optional)",
    "form.submit": "Submit (Demo)",
    "form.hint": "Demo mode: it copies your submission to clipboard. You can connect Formspree / Google Form to receive leads.",

    "services.title": "Core Services",
    "services.subtitle": "Nationwide support with attorney-led negotiation and documentation.",
    "services.s1.title": "Debt Relief (Legal Negotiation)",
    "services.s1.li1": "Credit card debt",
    "services.s1.li2": "Personal loans",
    "services.s1.li3": "Third-party collections",
    "services.s1.li4": "Medical bills",
    "services.s1.li5": "High-interest installment loans",
    "services.s1.li6": "Attorney letters / pre-litigation",
    "services.s2.title": "Consumer Protection",
    "services.s2.desc": "Lawful, transparent communication that reduces pressure, improves negotiation terms, and manages risk.",
    "services.chip1": "Legal comms",
    "services.chip2": "Risk control",
    "services.chip3": "Documentation",
    "services.s3.title": "Credit / Immigration / Civil",
    "services.s3.desc": "Case-by-case guidance and representation within our service scope.",
    "services.s3.note": "Share your details during consult and we’ll assign the right team member.",

    "cases.title": "De-identified Case Examples",
    "cases.subtitle": "Illustrative examples only. Outcomes vary and are not guaranteed.",
    "cases.a": "Credit card debt",
    "cases.b": "Personal loan + installment",
    "cases.c": "Collections",
    "cases.d": "Medical bills",
    "cases.calloutTitle": "Many clients see significant reductions starting around 75%+",
    "cases.calloutDesc": "Strong capability in strategy, analysis, negotiation communication, and risk management.",
    "cases.calloutCta": "Check my options",

    "adv.title": "Why Ameriwest",
    "adv.subtitle": "Attorney-led, trilingual, standardized workflow, transparent pricing.",
    "adv.f1.title": "Attorney-led · Compliant",
    "adv.f1.desc": "Negotiation and documentation handled by licensed attorneys or firm team for stability and reduced risk.",
    "adv.f2.title": "High success · Strong reductions",
    "adv.f2.desc": "Many matters fall into a typical reduction starting range (varies by case).",
    "adv.f3.title": "Trilingual · Understands the community",
    "adv.f3.desc": "Mandarin/Cantonese/English—built for common challenges faced by Chinese-speaking clients in the U.S.",
    "adv.f4.title": "Transparent process · No pressure",
    "adv.f4.desc": "Case management, progress tracking, documentation retention, and clear fee structure.",
    "adv.f5.title": "Safe messaging for education marketing",
    "adv.f5.desc": "A regulated legal service with controllable content—good for community education and conversion.",
    "adv.f6.title": "After the firm steps in, clients often:",
    "adv.f6.li1": "Feel less collection pressure",
    "adv.f6.li2": "Get more reasonable negotiation terms",
    "adv.f6.li3": "Build an affordable settlement plan",
    "adv.f6.li4": "Move forward in a safer, legal way",

    "process.title": "Standard Workflow",
    "process.subtitle": "Clear next steps to reduce anxiety and build trust.",
    "process.s1.title": "Free consult & debt inventory",
    "process.s1.desc": "Understand debt types, amounts, collection status, and goals.",
    "process.s2.title": "Strategy & risk assessment",
    "process.s2.desc": "We outline feasible options, milestones, and pricing transparently.",
    "process.s3.title": "Attorney-led negotiation & paperwork",
    "process.s3.desc": "Legal communication with creditors and complete documentation retention.",
    "process.s4.title": "Settlement plan & follow-up",
    "process.s4.desc": "Create a feasible payment plan and track progress / documents.",

    "faq.title": "FAQ",
    "faq.subtitle": "General information only. Consult an attorney for specifics.",
    "faq.q1": "Is 75%+ reduction guaranteed?",
    "faq.a1": "No. It depends on debt type, creditor, timeline, income/assets, and legal posture. Examples are illustrative only.",
    "faq.q2": "Can you help if I’m already being contacted or got an attorney letter?",
    "faq.a2": "Often yes. Earlier involvement usually helps; pre-litigation/litigation posture can make attorney support more important.",
    "faq.q3": "What languages do you support?",
    "faq.a3": "Mandarin, Cantonese, and English.",
    "faq.q4": "Is pricing transparent? Any high-pressure sales?",
    "faq.a4": "We emphasize a standardized, transparent process with clear fee structure—no high-pressure selling.",

    "contact.title": "Contact",
    "contact.subtitle": "Tell us your situation—we’ll suggest the safest legal next step.",
    "contact.quick": "Quick Contact",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.hours": "Hours",
    "contact.hoursVal": "Mon–Fri 9:00–18:00 (By appointment)",
    "contact.backTop": "Back to top",
    "contact.copy": "Copy contact info",
    "contact.formTitle": "Or submit a form (Demo)",
    "contact.formNote": "Connect Formspree / Google Form / CRM later. Demo shows and copies your input.",

    "disc.title": "Disclaimer",
    "disc.body": "This site provides general information only and does not create an attorney-client relationship or constitute legal advice. Outcomes vary by case; past results do not guarantee future outcomes.",

    "footer.note": "California Based · Serving Clients Nationwide",
    "float.cta": "Free Consult"
  }
};

function applyI18n(lang) {
  const dict = I18N[lang] || I18N.zh;
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = dict[key];
    if (!val) return;
    // allow \n for line breaks
    el.innerHTML = String(val).replace(/\n/g, "<br/>");
  });
  // button labels
  $("#langLabel").textContent = lang === "en" ? "EN" : "中文";
  $("#langLabelMobile").textContent = lang === "en" ? "EN" : "中文";
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
  localStorage.setItem("aw_lang", lang);
}

function initLangToggle() {
  const saved = localStorage.getItem("aw_lang") || "zh";
  applyI18n(saved);

  const toggle = () => {
    const current = localStorage.getItem("aw_lang") || "zh";
    const next = current === "zh" ? "en" : "zh";
    applyI18n(next);
  };

  $("#langToggle")?.addEventListener("click", toggle);
  $("#langToggleMobile")?.addEventListener("click", toggle);
}

// ===== Contact helpers =====
function initCopyContact() {
  const btn = $("#copyContact");
  btn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const text = `Ameriwest Law Group 美西律師事務所
Email: info@ameriwestlaw.com
Phone: +1 (XXX) XXX-XXXX
Website: (your domain)
Services: Debt Relief / Consumer Protection / Credit / Immigration / Civil`;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "✅ 已複製";
      setTimeout(() => btn.textContent = (localStorage.getItem("aw_lang")==="en" ? "Copy contact info" : "複製聯絡資訊"), 1200);
    } catch {
      alert(text);
    }
  });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  smoothAnchorLinks();
  setYear();
  initMobileMenu();
  initLangToggle();
  initCopyContact();

  const form1 = $("#leadForm");
  const ok1 = $("#formOk");
  const form2 = $("#leadForm2");
  const ok2 = $("#formOk2");
  if (form1 && ok1) handleFormSubmit(form1, ok1);
  if (form2 && ok2) handleFormSubmit(form2, ok2);

  // WhatsApp link placeholder
  const wa = $("#waLink");
  if (wa) {
    wa.setAttribute("href", "#");
    wa.addEventListener("click", (e) => {
      e.preventDefault();
      alert("把這裡換成你的 WhatsApp click-to-chat 連結即可。");
    });
  }
});
