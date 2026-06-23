"use client";

import { useState, useEffect, useCallback } from "react";
import * as I from "@/components/icons";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";

const PHONE_DISPLAY = "050-36-36-365";
const PHONE_TEL = "0503636365";

const NAV = [
  { id: "goupil-g4", label: "Goupil G4" },
  { id: "greenman-uf2", label: "GREENMAN" },
  { id: "polaris-ranger", label: "Polaris" },
  { id: "lead-form", label: "צור קשר" },
];

/* ----------------------------- shared UI ----------------------------- */

function FeatureGrid({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ Icon, text }, i) => (
        <Reveal as="li" key={i} delay={(i % 3) + 1} className="group feature-card">
          <span
            className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-soft"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #0a1020))",
            }}
          >
            <Icon className="h-6 w-6" />
          </span>
          <span className="pt-1 text-[15px] font-bold leading-snug text-ink">{text}</span>
        </Reveal>
      ))}
    </ul>
  );
}

function ImageFrame({ src, alt, className = "", priority = false }) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-slate-100 shadow-card ring-1 ring-black/5 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="relative h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling.style.display = "flex";
        }}
      />
      <div className="absolute inset-0 hidden flex-col items-center justify-center gap-2 p-6 text-center">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
          style={{ background: "var(--accent)" }}
        >
          <I.Box className="h-6 w-6" />
        </span>
        <span className="text-sm font-bold text-slate-500">{alt}</span>
        <span className="rounded-md bg-white px-2 py-0.5 text-[11px] text-slate-400" dir="ltr">
          {src.split("/").pop()}
        </span>
      </div>
    </figure>
  );
}

// Per-logo render geometry. Box = visible mark footprint (clips transparent
// padding via overflow-hidden); img height is scaled so the visible mark stays
// the same size across assets with different canvases/padding (no size jump).
// "normal" = for light backgrounds, "white" = for dark backgrounds.
const LOGOS = {
  GOUPIL: {
    normal: { src: "/logos/goupil.png", box: "w-[80px] sm:w-[94px]", img: "h-6 sm:h-7" },
    white: { src: "/logos/goupil-white.png", box: "w-[83px] sm:w-[95px]", img: "h-[29px] sm:h-[33px]" },
  },
  GREENMAN: {
    normal: { src: "/logos/GREENMAN%20LOGO.png", box: "w-[152px] sm:w-[178px]", img: "h-[163px] sm:h-[190px]" },
    white: { src: "/logos/GREENMAN%20LOGO.png", box: "w-[152px] sm:w-[178px]", img: "h-[163px] sm:h-[190px]" },
  },
  POLARIS: {
    normal: { src: "/logos/polaris.png", box: "w-[101px] sm:w-[118px]", img: "h-6 sm:h-7" },
    white: { src: "/logos/polaris-white.png", box: "w-[101px] sm:w-[118px]", img: "h-[36px] sm:h-[42px]" },
  },
};

function BrandLogo({ name, light = false }) {
  const cfg = LOGOS[name][light ? "white" : "normal"];
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center justify-center overflow-hidden sm:h-7 ${cfg.box}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cfg.src}
        alt={name}
        className={`${cfg.img} w-auto max-w-none shrink-0`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling.style.display = "inline";
        }}
      />
      <span className="hidden text-sm font-black tracking-wide text-slate-700">{name}</span>
    </span>
  );
}

function SectionHeader({ index, accent, title, brand, badge, badgeClass, subtitle }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-black text-white shadow-soft"
          style={{ background: accent }}
        >
          {index}
        </span>
        <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
        <BrandLogo name={brand} />
        <span className={`chip ${badgeClass}`}>{badge}</span>
      </div>
      <p
        className="mt-3 text-xl font-extrabold"
        style={{ color: accent }}
      >
        {subtitle}
      </p>
    </div>
  );
}

/* ----------------------------- page ----------------------------- */

const ACCENTS = {
  goupil: "#0ea5e9",
  greenman: "#16a34a",
  polaris: "#f59e0b",
};

export default function Page() {
  const [vehicle, setVehicle] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToForm = useCallback((v) => {
    if (v) setVehicle(v);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* ---------------- Top bar ---------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/85 shadow-soft backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scrolled ? "/logos/dlb-motosport-dark.png" : "/logos/dlb-motosport.png"}
              alt="DLB Motosport — The Best Adventure You Can Get"
              className={
                scrolled
                  ? "h-8 w-auto sm:h-10 lg:h-12" // black logo is tightly cropped — ~half height to match the padded white logo's visible footprint
                  : "h-16 w-auto sm:h-20 lg:h-24"
              }
              onError={(e) => {
                if (e.currentTarget.src.includes("dlb-motosport-dark")) {
                  // black variant not present yet — fall back to the white logo
                  e.currentTarget.src = "/logos/dlb-motosport.png";
                } else {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "inline";
                }
              }}
            />
            <span className="hidden text-lg font-black text-brand">DLB&nbsp;Motosport</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-brand sm:inline-flex"
            >
              <I.Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <button onClick={() => goToForm()} className="btn-primary px-5 py-2.5 text-sm">
              דברו איתנו
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-white sm:pt-40">
          {/* background layers */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink to-ink" />
            <div className="absolute -right-1/4 -top-1/3 h-[700px] w-[700px] rounded-full bg-brand-600/30 blur-[120px]" />
            <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-electric/20 blur-[120px]" />
            <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]" />
          </div>

          <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal className="eyebrow border-white/15 bg-white/10 text-white">
                <span className="h-2 w-2 rounded-full bg-electric shadow-glow" />
                למועצות ועיריות
              </Reveal>
              <Reveal as="h1" delay={1} className="mt-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
                פתרונות רכב תפעולי
                <br />
                <span className="text-gradient">לרשויות מקומיות</span>
              </Reveal>
              <Reveal as="p" delay={2} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                ניקיון, שינוע ואחזקה — לכביש, לשטח התפעולי או לשטח. בחשמל מלא או
                בדיזל, בהתאמה למשימה.
              </Reveal>
              <Reveal delay={3} className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={() => goToForm()} className="btn-light">
                  לתיאום הדגמה
                  <I.ArrowLeft className="h-5 w-5" />
                </button>
                <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
                  <I.Phone className="h-5 w-5" />
                  {PHONE_DISPLAY}
                </a>
              </Reveal>

              {/* stats */}
              <Reveal delay={4} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {[
                  ["3", "כלים תפעוליים"],
                  ["100%", "אופציית חשמל"],
                  ["4×4", "יכולת שטח"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-3xl font-black text-white sm:text-4xl">{n}</div>
                    <div className="mt-1 text-sm font-medium text-slate-400">{l}</div>
                  </div>
                ))}
              </Reveal>
            </div>

            {/* hero visual */}
            <Reveal delay={2} className="relative">
              <div className="absolute inset-6 rounded-[2rem] bg-electric/20 blur-3xl" />
              <div className="relative animate-float-slow rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-float backdrop-blur">
                <div style={{ "--accent": ACCENTS.goupil }}>
                  <ImageFrame
                    src="/images/g4-hp500-v3.png"
                    alt="Goupil G4 — תיבה סגורה"
                    className="aspect-[16/11] !border-white/10 !bg-white"
                    priority
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div style={{ "--accent": ACCENTS.greenman }}>
                    <ImageFrame
                      src="/images/greenman-uf2.webp"
                      alt="GREENMAN UF2+2"
                      className="aspect-[4/3] !border-white/10 !bg-white"
                    />
                  </div>
                  <div style={{ "--accent": ACCENTS.polaris }}>
                    <ImageFrame
                      src="/images/polaris-ranger.webp"
                      alt="Polaris Ranger Diesel"
                      className="aspect-[4/3] !border-white/10 !bg-white"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* brand trust strip */}
          <div className="container-page relative mt-16">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-white/60">
              <span className="text-sm font-bold text-white/40">מותגים מובילים:</span>
              <BrandLogo name="GOUPIL" light />
              <BrandLogo name="GREENMAN" light />
              <BrandLogo name="POLARIS" light />
            </div>
          </div>
        </section>

        {/* ---------------- Vehicle 1: Goupil G4 ---------------- */}
        <section
          id="goupil-g4"
          className="container-page scroll-mt-24 py-20 sm:py-24"
          style={{ "--accent": ACCENTS.goupil }}
        >
          <Reveal>
            <SectionHeader
              index="1"
              accent={ACCENTS.goupil}
              title="Goupil G4"
              brand="GOUPIL"
              badge="חשמלי 100%"
              badgeClass="border-sky-200 bg-sky-50 text-sky-700"
              subtitle="רכב משא חשמלי עירוני קומפקטי, מודולרי, עם יכולת העמסה גבוהה"
            />
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              רכב תפעולי חשמלי 100% לעבודות ניקיון, תחזוקה ולוגיסטיקה עירונית. מודולרי,
              חסכוני וקל לתמרון ברחובות צרים.
            </p>
          </Reveal>

          {/* Gallery */}
          <Reveal className="mt-10 grid gap-4 lg:grid-cols-4">
            <ImageFrame
              src="/images/G4M_Fourgon_45.webp"
              alt="Goupil G4 — תיבה סגורה / מרכב ארגז עם תריס גלילה"
              className="aspect-[16/10] lg:col-span-4"
            />
            <ImageFrame src="/images/G4M_PB_Box_90.webp" alt="מרכב הטיה (טיפר) עם ארגז כלים" className="aspect-[4/3] lg:col-span-2" />
            <ImageFrame src="/images/G4M_Arrosage_45.webp" alt="תצורת השקיה/שטיפה עם גלגלת צינור ומיכל מים" className="aspect-[4/3]" />
            <ImageFrame src="/images/G4M_HP_90.webp" alt="תצורת שטיפה בלחץ גבוה עם כלוב רשת" className="aspect-[4/3]" />
          </Reveal>

          <Reveal as="h3" className="mb-5 mt-12 text-2xl font-black text-ink">יתרונות עיקריים</Reveal>
          <FeatureGrid
            items={[
              { Icon: I.Weight, text: "יכולת העמסה גבוהה" },
              { Icon: I.Compress, text: "קומפקטי למעבר במקומות צרים" },
              { Icon: I.Leaf, text: "ידידותי לסביבה" },
              { Icon: I.Zap, text: "0% זיהום · 100% חשמלי" },
              { Icon: I.Coins, text: "חסכוני בתפעול" },
              { Icon: I.Layers, text: "רב-שימושי ומודולרי" },
              { Icon: I.Plug, text: "טעינה משקע ביתי רגיל" },
            ]}
          />

          <Reveal className="mt-8 flex flex-col gap-4 rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-[15px] text-slate-600">
                ארגז סגור, ארגז פתוח, ארגז מתרומם, מערכת שטיפה/השקיה ועוד — מותאם
                לצורכי הרשות.
              </p>
              <p className="text-[15px] font-bold text-brand">
                מגוון אפשרויות רכישה או ליסינג תפעולי מלא
              </p>
            </div>
            <button onClick={() => goToForm("Goupil G4")} className="btn-primary shrink-0">
              בקשת הצעה / תיאום הדגמה
              <I.ArrowLeft className="h-5 w-5" />
            </button>
          </Reveal>
        </section>

        {/* ---------------- Vehicle 2: GREENMAN UF2+2 ---------------- */}
        <section
          id="greenman-uf2"
          className="scroll-mt-24 bg-slate-50 py-20 sm:py-24"
          style={{ "--accent": ACCENTS.greenman }}
        >
          <div className="container-page">
            <Reveal>
              <SectionHeader
                index="2"
                accent={ACCENTS.greenman}
                title="GREENMAN UF2+2"
                brand="GREENMAN"
                badge="חשמלי"
                badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                subtitle="הרכב התפעולי החשמלי לשטח התפעולי"
              />
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
                הכלי האידיאלי למי שצריך רכב תפעולי קומפקטי אך רב-תכליתי, המשלב שלדת
                אלומיניום קלת משקל וסוללת ליתיום מתקדמת בעלת אורך חיים ארוך. תצורת 2+2
                (עד 4 נוסעים) עם יכולות העמסה ושינוע מרשימות.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <ImageFrame src="/images/greenman-uf2-1.webp" alt="GREENMAN UF2+2" className="aspect-[16/10]" />
            </Reveal>

            <Reveal as="h3" className="mb-5 mt-12 text-2xl font-black text-ink">יתרונות עיקריים</Reveal>
            <FeatureGrid
              items={[
                { Icon: I.Feather, text: "שלדת אלומיניום קלת משקל" },
                { Icon: I.Battery, text: "סוללת ליתיום 48V 105Ah" },
                { Icon: I.Users, text: "תצורת 2+2 — עד 4 נוסעים" },
                { Icon: I.Route, text: 'טווח נסיעה עד 60 ק"מ' },
                { Icon: I.Clock, text: "זמן טעינה 2–4 שעות" },
                { Icon: I.Camera, text: "מצלמת רוורס + צג דיגיטלי" },
                { Icon: I.Shield, text: "2 שנות אחריות + 5 שנים על הסוללה" },
              ]}
            />

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {/* Spec table */}
              <Reveal>
                <h3 className="mb-5 text-2xl font-black text-ink">מפרט טכני</h3>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
                  <table className="w-full text-right text-[15px]">
                    <tbody>
                      {[
                        ["מנוע", "AC 48V 5kW"],
                        ["סוללה", "ליתיום 48V 105Ah"],
                        ["בקר", "48V AC"],
                        ["שלדה", "אלומיניום"],
                        ["בלמים", "4 בלמי דיסק + בלם אלקטרומגנטי"],
                        ["מתלה קדמי", "עצמאי מקפרסון"],
                        ["מתלה אחורי", "קפיץ רב-שכבתי + בולם הידראולי"],
                        ["טווח נסיעה", 'עד 60 ק"מ'],
                        ["זמן טעינה", "2–4 שעות"],
                        ["כושר העמסה (כולל נוסעים)", '360 ק"ג'],
                        ["בסיס גלגלים", '1700 מ"מ'],
                        ["משקל עצמי (כולל סוללה)", '480 ק"ג'],
                        ["מרווח גחון", '200 מ"מ'],
                      ].map(([k, v], i) => (
                        <tr key={k} className={i % 2 ? "bg-slate-50/70" : "bg-white"}>
                          <th scope="row" className="w-1/2 border-b border-slate-100 px-4 py-3 font-bold text-ink">
                            {k}
                          </th>
                          <td className="border-b border-slate-100 px-4 py-3 text-slate-700">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              {/* Equipment chips */}
              <Reveal delay={2}>
                <h3 className="mb-5 text-2xl font-black text-ink">אבזור</h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    'חישוקי אלומיניום 14"',
                    "ריפודים מפוארים",
                    "מדרכי צד",
                    "פגוש קדמי",
                    "מגני בוץ",
                    "תאורת LED",
                    "צג דיגיטלי",
                    "בלם יד חשמלי",
                    "חגורות בטיחות",
                    "שמשה קדמית מתקפלת",
                    "צמיגי שטח",
                    "מצלמת נסיעה לאחור",
                  ].map((c) => (
                    <span key={c} className="chip">
                      <I.Check className="h-4 w-4 text-emerald-600" />
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm text-slate-500">
                  התמונות להמחשה בלבד · המחיר כולל אגרות, מע&quot;מ ומיסים · ט.ל.ח.
                </p>
                <button onClick={() => goToForm("GREENMAN UF2+2")} className="btn-primary mt-6">
                  בקשת הצעה / תיאום הדגמה
                  <I.ArrowLeft className="h-5 w-5" />
                </button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- Vehicle 3: Polaris Ranger Diesel ---------------- */}
        <section
          id="polaris-ranger"
          className="container-page scroll-mt-24 py-20 sm:py-24"
          style={{ "--accent": ACCENTS.polaris }}
        >
          <Reveal>
            <SectionHeader
              index="3"
              accent={ACCENTS.polaris}
              title="Polaris Ranger Diesel 2026"
              brand="POLARIS"
              badge="דיזל · 4×4"
              badgeClass="border-amber-200 bg-amber-50 text-amber-700"
              subtitle="כוח דיזל למשימות שטח קשוחות"
            />
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              הריינג&apos;ר דיזל החדש מותאם למשימות הקשוחות ביותר בתוואי שטח מורכב, עם
              מנוע דיזל ומהירות מקסימלית של 60 קמ&quot;ש.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <ImageFrame src="/images/polaris-ranger-1.webp" alt="Polaris Ranger Diesel 2026" className="aspect-[16/10]" />
          </Reveal>

          <Reveal as="h3" className="mb-5 mt-12 text-2xl font-black text-ink">יתרונות עיקריים</Reveal>
          <FeatureGrid
            items={[
              { Icon: I.Mountain, text: "מותאם לתוואי שטח מורכב · הנעה 4×4" },
              { Icon: I.Hook, text: 'יכולת גרירה 1,134 ק"ג' },
              { Icon: I.Box, text: 'יכולת העמסה 720 ק"ג' },
              { Icon: I.Steering, text: "הגה חשמלי (EPS)" },
              { Icon: I.TrendingDown, text: "מערכת בקרת ירידות (ADS)" },
              { Icon: I.Brake, text: "מערכת בלימת מנוע (EBS)" },
              { Icon: I.Wrench, text: "מרווח טיפולים 200 שעות" },
            ]}
          />

          <Reveal className="mt-8 overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-l from-amber-50 to-white p-6 text-[15px] leading-relaxed text-slate-700">
            לריינג&apos;ר דיזל מערכות טכנולוגיות רבות: הגה חשמלי (EPS), מערכת בקרת ירידות
            (ADS) ומערכת בלימת מנוע (EBS) — שמאפשרות עבודה בטוחה ונוחה לאורך כל יום
            העבודה. מרווח טיפולים של 200 שעות מתורגם לחיסכון כספי משמעותי.
          </Reveal>

          <Reveal as="h3" className="mb-4 mt-10 text-xl font-black text-ink">מפרט</Reveal>
          <Reveal className="flex flex-wrap gap-2.5">
            {[
              "מנוע דיזל",
              'מהירות מקס\' 60 קמ"ש',
              "הנעה 4×4",
              'גרירה 1,134 ק"ג',
              'העמסה 720 ק"ג',
              "מרווח טיפולים 200 שעות",
            ].map((c) => (
              <span key={c} className="chip border-amber-200 bg-amber-50/70 text-amber-800">
                {c}
              </span>
            ))}
          </Reveal>

          <Reveal className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-[15px] font-bold text-amber-700">
                מגוון אפשרויות רכישה או ליסינג תפעולי מלא
              </p>
              <p className="max-w-xl text-sm text-slate-500">
                התמונות להמחשה בלבד · ייתכן שחלק מהצבעים/המפרטים כרוכים בתוספת תשלום ·
                המחיר אינו כולל אגרות רישוי · ט.ל.ח.
              </p>
            </div>
            <button onClick={() => goToForm("Polaris Ranger Diesel 2026")} className="btn-primary shrink-0">
              בקשת הצעה / תיאום הדגמה
              <I.ArrowLeft className="h-5 w-5" />
            </button>
          </Reveal>
        </section>

        {/* ---------------- Comparison strip ---------------- */}
        <section className="bg-ink py-20 text-white sm:py-24">
          <div className="container-page">
            <Reveal className="text-center">
              <span className="eyebrow border-white/15 bg-white/10 text-white">השוואה מהירה</span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">איזה כלי מתאים לרשות שלכם?</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  name: "Goupil G4",
                  accent: ACCENTS.goupil,
                  drive: "חשמלי 100%",
                  load: "העמסה גבוהה · מודולרי",
                  fit: "לוגיסטיקה ותחזוקה עירונית",
                  tag: "Goupil G4",
                },
                {
                  name: "GREENMAN UF2+2",
                  accent: ACCENTS.greenman,
                  drive: "חשמלי",
                  load: '360 ק"ג (כולל נוסעים)',
                  fit: "תפעול קומפקטי · עד 4 נוסעים",
                  tag: "GREENMAN UF2+2",
                },
                {
                  name: "Polaris Ranger Diesel",
                  accent: ACCENTS.polaris,
                  drive: "דיזל · 4×4",
                  load: '720 ק"ג · גרירה 1,134 ק"ג',
                  fit: "שטח קשה ומשימות קשוחות",
                  tag: "Polaris Ranger Diesel 2026",
                },
              ].map((v, i) => (
                <Reveal
                  key={v.name}
                  delay={i + 1}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                  style={{ "--accent": v.accent }}
                >
                  <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: v.accent }} />
                  <h3 className="text-xl font-black text-white">{v.name}</h3>
                  <dl className="mt-5 space-y-3.5 text-sm">
                    {[
                      ["סוג הנעה", v.drive],
                      ["יכולת העמסה", v.load],
                      ["מתאים ל…", v.fit],
                    ].map(([k, val]) => (
                      <div key={k} className="flex justify-between gap-3 border-b border-white/10 pb-3.5">
                        <dt className="font-bold text-slate-400">{k}</dt>
                        <dd className="text-left font-semibold text-white">{val}</dd>
                      </div>
                    ))}
                  </dl>
                  <button
                    onClick={() => goToForm(v.tag)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold"
                    style={{ color: v.accent }}
                  >
                    בקשת הצעה
                    <I.ArrowLeft className="h-4 w-4" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Lead form ---------------- */}
        <section
          id="lead-form"
          className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-brand-700 to-brand py-20 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
          <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="text-white">
              <span className="eyebrow border-white/15 bg-white/10 text-white">תיאום הדגמה והצעת מחיר</span>
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">קבלת הצעה לרשות שלכם</h2>
              <p className="mt-4 max-w-md text-lg text-brand-100">
                השאירו פרטים ונחזור אליכם לתיאום הדגמה והתאמת הכלי המדויק לצורכי הרשות.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "ייעוץ והתאמה אישית לצורכי הרשות",
                  "הדגמה בשטח ללא התחייבות",
                  "מענה אנושי מהיר",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-brand-50">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                      <I.Check className="h-4 w-4" />
                    </span>
                    <span className="font-semibold">{t}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-8 inline-flex items-center gap-2 text-lg font-black text-white hover:text-brand-100"
              >
                <I.Phone className="h-5 w-5" />
                {PHONE_DISPLAY}
              </a>
            </Reveal>

            <Reveal delay={2}>
              <div className="rounded-3xl bg-white p-6 shadow-float sm:p-8">
                <LeadForm vehicle={vehicle} onVehicleChange={setVehicle} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-ink py-14 text-slate-300">
        <div className="container-page">
          <div className="flex flex-col items-center gap-7 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex h-7 w-[130px] shrink-0 items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/dlb-motosport.png"
                alt="DLB Motosport"
                className="h-[72px] w-auto max-w-none shrink-0"
              />
            </span>
              <span className="text-slate-600">|</span>
              <span className="text-sm font-bold text-slate-400">מותגים:</span>
              <BrandLogo name="GOUPIL" light />
              <BrandLogo name="GREENMAN" light />
              <BrandLogo name="POLARIS" light />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-1.5 font-bold text-white hover:text-brand-200"
              >
                <I.Phone className="h-4 w-4" />
                לפניות אישיות: {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:royso@lubinski.co.il"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                <I.Mail className="h-4 w-4" />
                royso@lubinski.co.il
              </a>
            </div>
            <p className="text-xs text-slate-500">
              © DLB Motosport · כל התמונות להמחשה בלבד · ט.ל.ח.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
