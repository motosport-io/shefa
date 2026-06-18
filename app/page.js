"use client";

import { useState, useCallback } from "react";
import * as I from "@/components/icons";
import LeadForm from "@/components/LeadForm";

const PHONE_DISPLAY = "050-363-6365";
const PHONE_TEL = "0503636365";

/* ----------------------------- shared UI ----------------------------- */

function FeatureGrid({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ Icon, text }, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
            <Icon className="h-6 w-6" />
          </span>
          <span className="pt-1 text-[15px] font-semibold leading-snug text-ink">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ImagePlaceholder({ src, alt, className = "" }) {
  // Renders the real image when present; the alt text + filename act as a
  // visible placeholder until the asset is dropped into /public/images.
  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling.style.display = "flex";
        }}
      />
      <div className="absolute inset-0 hidden flex-col items-center justify-center gap-1 p-4 text-center">
        <span className="text-sm font-bold text-slate-500">{alt}</span>
        <span className="text-xs text-slate-400 ltr:font-mono" dir="ltr">
          {src.split("/").pop()}
        </span>
      </div>
    </figure>
  );
}

function BrandLogo({ name }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-extrabold tracking-wide text-slate-600">
      {name}
    </span>
  );
}

/* ----------------------------- page ----------------------------- */

export default function Page() {
  const [vehicle, setVehicle] = useState("");

  const goToForm = useCallback((v) => {
    if (v) setVehicle(v);
    const el = document.getElementById("lead-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* ---------------- Top bar ---------------- */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* DLB Motosport logo (right side in RTL) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/dlb-motosport.svg"
              alt="DLB Motosport"
              className="h-8 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "inline";
              }}
            />
            <span className="hidden text-lg font-black text-brand">
              DLB&nbsp;Motosport
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-brand sm:inline-flex"
            >
              <I.Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <button onClick={() => goToForm()} className="btn-primary px-4 py-2 text-sm">
              דברו איתנו
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-light to-white">
          <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">לרשויות מקומיות ועיריות</span>
              <h1 className="mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl">
                פתרונות רכב תפעולי לרשויות מקומיות
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                שלושה כלים, שלושה צרכים — ניקיון, תחזוקה ושטח. בחשמל מלא או בדיזל,
                בהתאמה למשימה.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button onClick={() => goToForm()} className="btn-primary">
                  לתיאום הדגמה
                  <I.ArrowLeft className="h-5 w-5" />
                </button>
                <a href={`tel:${PHONE_TEL}`} className="btn-secondary">
                  <I.Phone className="h-5 w-5" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImagePlaceholder
                src="/images/G4M_Fourgon_45.webp"
                alt="Goupil G4 — תיבה סגורה"
                className="col-span-2 aspect-[16/10]"
              />
              <ImagePlaceholder
                src="/images/greenman-uf2.webp"
                alt="GREENMAN UF2+2"
                className="aspect-[4/3]"
              />
              <ImagePlaceholder
                src="/images/polaris-ranger.webp"
                alt="Polaris Ranger Diesel"
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </section>

        {/* ---------------- Vehicle 1: Goupil G4 ---------------- */}
        <section id="goupil-g4" className="container-page scroll-mt-20 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-black text-ink sm:text-4xl">Goupil G4</h2>
            <BrandLogo name="GOUPIL" />
            <span className="chip bg-brand-light text-brand">חשמלי 100%</span>
          </div>
          <p className="mt-1 text-xl font-bold text-brand">רכב תפעולי חשמלי קומפקטי</p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            רכב תפעולי חשמלי 100% לעבודות ניקיון, תחזוקה ולוגיסטיקה עירונית. מודולרי,
            חסכוני וקל לתמרון ברחובות צרים.
          </p>

          {/* Gallery: hero + thumbnails */}
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <ImagePlaceholder
              src="/images/G4M_Fourgon_45.webp"
              alt="Goupil G4 — תיבה סגורה / מרכב ארגז עם תריס גלילה"
              className="aspect-[16/10] lg:col-span-3"
            />
            <ImagePlaceholder
              src="/images/G4M_PB_Box_90.webp"
              alt="מרכב הטיה (טיפר) עם ארגז כלים"
              className="aspect-[4/3]"
            />
            <ImagePlaceholder
              src="/images/G4M_Arrosage_45.webp"
              alt="תצורת השקיה/שטיפה עם גלגלת צינור ומיכל מים"
              className="aspect-[4/3]"
            />
            <ImagePlaceholder
              src="/images/G4M_HP_90.webp"
              alt="תצורת שטיפה בלחץ גבוה עם כלוב רשת"
              className="aspect-[4/3]"
            />
          </div>

          <h3 className="mt-10 mb-4 text-xl font-extrabold text-ink">יתרונות עיקריים</h3>
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

          <p className="mt-6 text-sm text-slate-500">
            מגוון תצורות מרכב: ארגז סגור, טיפר, מערכת השקיה/שטיפה ועוד — מותאם לצורכי
            הרשות.
          </p>

          <div className="mt-7">
            <button onClick={() => goToForm("Goupil G4")} className="btn-primary">
              בקשת הצעה / תיאום הדגמה
              <I.ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </section>

        <hr className="container-page border-slate-100" />

        {/* ---------------- Vehicle 2: GREENMAN UF2+2 ---------------- */}
        <section id="greenman-uf2" className="container-page scroll-mt-20 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-black text-ink sm:text-4xl">GREENMAN UF2+2</h2>
            <BrandLogo name="GREENMAN" />
            <span className="chip bg-brand-light text-brand">חשמלי</span>
          </div>
          <p className="mt-1 text-xl font-bold text-brand">הרכב התפעולי הקומפקטי</p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            הכלי האידיאלי למי שצריך רכב תפעולי קומפקטי אך רב-תכליתי, המשלב שלדת
            אלומיניום קלת משקל וסוללת ליתיום מתקדמת בעלת אורך חיים ארוך. תצורת 2+2 (עד
            4 נוסעים) עם יכולות העמסה ושינוע מרשימות.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ImagePlaceholder
              src="/images/greenman-uf2-1.webp"
              alt="GREENMAN UF2+2 — מבט קדמי"
              className="aspect-[4/3]"
            />
            <ImagePlaceholder
              src="/images/greenman-uf2-2.webp"
              alt="GREENMAN UF2+2 — מבט צד"
              className="aspect-[4/3]"
            />
          </div>

          <h3 className="mt-10 mb-4 text-xl font-extrabold text-ink">יתרונות עיקריים</h3>
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

          {/* Spec table */}
          <h3 className="mt-10 mb-4 text-xl font-extrabold text-ink">מפרט טכני</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-right text-[15px]">
              <tbody>
                {[
                  ["מנוע", "AC 48V 5kW"],
                  ["סוללה", "ליתיום 48V 105Ah"],
                  ["בקר", "48V AC"],
                  ["שלדה", "אלומיניום"],
                  ["בלמים", "4 בלמי דיסק + בלם אלקטרומגנטי"],
                  ["מתלה קדמי", "עצמאי מקפרסון"],
                  ["מתלה אחורי", "קפיץ רב-שכבתי + בולם זעזועים הידראולי"],
                  ["טווח נסיעה", 'עד 60 ק"מ'],
                  ["זמן טעינה", "2–4 שעות"],
                  ["כושר העמסה (כולל נוסעים)", ' 360 ק"ג'],
                  ["בסיס גלגלים", "1700 מ\"מ"],
                  ["משקל עצמי (כולל סוללה)", '480 ק"ג'],
                  ["מרווח גחון", "200 מ\"מ"],
                ].map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                    <th
                      scope="row"
                      className="w-1/2 border-b border-slate-100 px-4 py-3 font-bold text-ink"
                    >
                      {k}
                    </th>
                    <td className="border-b border-slate-100 px-4 py-3 text-slate-700">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Equipment chips */}
          <h3 className="mt-10 mb-4 text-xl font-extrabold text-ink">אבזור</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'חישוקי אלומיניום 10"',
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
                {c}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            התמונות להמחשה בלבד · המחיר כולל אגרות, מע&quot;מ ומיסים · ט.ל.ח.
          </p>

          <div className="mt-7">
            <button onClick={() => goToForm("GREENMAN UF2+2")} className="btn-primary">
              בקשת הצעה / תיאום הדגמה
              <I.ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </section>

        <hr className="container-page border-slate-100" />

        {/* ---------------- Vehicle 3: Polaris Ranger Diesel ---------------- */}
        <section id="polaris-ranger" className="container-page scroll-mt-20 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-black text-ink sm:text-4xl">
              Polaris Ranger Diesel 2026
            </h2>
            <BrandLogo name="POLARIS" />
            <span className="chip bg-amber-100 text-amber-700">דיזל</span>
          </div>
          <p className="mt-1 text-xl font-bold text-brand">כוח דיזל למשימות שטח קשוחות</p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            הריינג&apos;ר דיזל החדש מותאם למשימות הקשוחות ביותר בתוואי שטח מורכב, עם מנוע
            דיזל ומהירות מקסימלית של 60 קמ&quot;ש.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ImagePlaceholder
              src="/images/polaris-ranger-1.webp"
              alt="Polaris Ranger Diesel — מבט קדמי"
              className="aspect-[4/3]"
            />
            <ImagePlaceholder
              src="/images/polaris-ranger-2.webp"
              alt="Polaris Ranger Diesel — בשטח"
              className="aspect-[4/3]"
            />
          </div>

          <h3 className="mt-10 mb-4 text-xl font-extrabold text-ink">יתרונות עיקריים</h3>
          <FeatureGrid
            items={[
              { Icon: I.Mountain, text: "מותאם למשימות קשוחות בתוואי שטח מורכב · הנעה 4×4" },
              { Icon: I.Hook, text: 'יכולת גרירה 1,134 ק"ג' },
              { Icon: I.Box, text: 'יכולת העמסה 720 ק"ג' },
              { Icon: I.Steering, text: "הגה חשמלי (EPS)" },
              { Icon: I.TrendingDown, text: "מערכת בקרת ירידות (ADS)" },
              { Icon: I.Brake, text: "מערכת בלימת מנוע (EBS)" },
              { Icon: I.Wrench, text: "מרווח טיפולים 200 שעות — חיסכון לעסק/לרשות" },
            ]}
          />

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-relaxed text-slate-700">
            לריינג&apos;ר דיזל מערכות טכנולוגיות רבות: הגה חשמלי (EPS), מערכת בקרת ירידות
            (ADS) ומערכת בלימת מנוע (EBS) — שמאפשרות עבודה בטוחה ונוחה לאורך כל יום
            העבודה. מרווח טיפולים של 200 שעות מתורגם לחיסכון כספי משמעותי.
          </div>

          <h3 className="mt-10 mb-4 text-xl font-extrabold text-ink">מפרט</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "מנוע דיזל",
              "מהירות מקס' 60 קמ\"ש",
              "הנעה 4×4",
              'גרירה 1,134 ק"ג',
              'העמסה 720 ק"ג',
              "מרווח טיפולים 200 שעות",
            ].map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            התמונות להמחשה בלבד · ייתכן שחלק מהצבעים/המפרטים כרוכים בתוספת תשלום ·
            המחיר אינו כולל אגרות רישוי · ט.ל.ח.
          </p>

          <div className="mt-7">
            <button
              onClick={() => goToForm("Polaris Ranger Diesel 2026")}
              className="btn-primary"
            >
              בקשת הצעה / תיאום הדגמה
              <I.ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* ---------------- Comparison strip ---------------- */}
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <h2 className="text-2xl font-black text-ink sm:text-3xl">השוואה מהירה</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Goupil G4",
                  drive: "חשמלי 100%",
                  load: 'העמסה גבוהה · מודולרי',
                  fit: "לוגיסטיקה ותחזוקה עירונית",
                },
                {
                  name: "GREENMAN UF2+2",
                  drive: "חשמלי",
                  load: '360 ק"ג (כולל נוסעים)',
                  fit: "תפעול קומפקטי · עד 4 נוסעים",
                },
                {
                  name: "Polaris Ranger Diesel",
                  drive: "דיזל · 4×4",
                  load: '720 ק"ג · גרירה 1,134 ק"ג',
                  fit: "שטח קשה ומשימות קשוחות",
                },
              ].map((v) => (
                <div
                  key={v.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-black text-ink">{v.name}</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="font-bold text-slate-500">סוג הנעה</dt>
                      <dd className="text-ink">{v.drive}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="font-bold text-slate-500">יכולת העמסה</dt>
                      <dd className="text-left text-ink">{v.load}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="font-bold text-slate-500">מתאים ל…</dt>
                      <dd className="text-left text-ink">{v.fit}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Lead form ---------------- */}
        <section id="lead-form" className="scroll-mt-20 bg-brand py-16">
          <div className="container-page max-w-2xl">
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-black text-ink sm:text-3xl">
                קבלת הצעה לרשות שלכם
              </h2>
              <p className="mt-2 text-slate-600">
                השאירו פרטים ונחזור אליכם לתיאום הדגמה והצעת מחיר.
              </p>
              <LeadForm vehicle={vehicle} onVehicleChange={setVehicle} />
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-ink py-12 text-slate-300">
        <div className="container-page">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-lg font-black text-white">DLB Motosport</span>
              <span className="text-slate-500">|</span>
              <span className="text-sm font-bold text-slate-400">מותגים:</span>
              <BrandLogo name="GOUPIL" />
              <BrandLogo name="GREENMAN" />
              <BrandLogo name="POLARIS" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-1.5 font-bold text-white hover:text-brand-light"
              >
                <I.Phone className="h-4 w-4" />
                לפניות אישיות: {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:info2@motosport.co.il"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                <I.Mail className="h-4 w-4" />
                info2@motosport.co.il
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
