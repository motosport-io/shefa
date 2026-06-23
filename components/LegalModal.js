"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Terms & Privacy popup. Self-contained: renders the clickable legal trigger
 * (placed below the form's submit button) and an accessible modal.
 * Behavior: opens on click; closes on X / overlay click / Escape; locks
 * background scroll; the long content scrolls inside the dialog. RTL, and
 * styled to match the landing page design system only.
 */
export default function LegalModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock background scroll
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const h3 = "mt-8 text-lg font-black text-ink first:mt-0";
  const h4 = "mt-5 text-base font-bold text-ink";
  const p = "mt-2 leading-relaxed text-slate-600";
  const ul = "mt-2 list-disc space-y-1 pr-5 leading-relaxed text-slate-600";

  return (
    <>
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-sm font-semibold text-slate-500 underline underline-offset-2 transition hover:text-brand focus:outline-none focus:ring-4 focus:ring-brand/20"
        >
          תנאי שימוש ומדיניות פרטיות
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="תנאי שימוש ומדיניות פרטיות"
          dir="rtl"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
          <div
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-float"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4">
              <h2 className="text-xl font-black text-ink">תנאי שימוש ומדיניות פרטיות</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגירה"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-ink focus:outline-none focus:ring-4 focus:ring-brand/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* body (scrollable) */}
            <div className="overflow-y-auto px-6 py-5 text-[15px]">
              {/* ---------------- Section 1 ---------------- */}
              <h3 className={h3}>תנאי שימוש</h3>

              <h4 className={h4}>כללי</h4>
              <p className={p}>
                אתר אינטרנט זה מנוהל ומופעל על-ידי ד.ל.ב מוטוספורט בע&quot;מ ח.פ. 513051771 (להלן &quot;החברה&quot;). הביקור והשימוש באתר מעידים על הסכמתך לתנאים שלהלן ולכן הנך מתבקש לקרוא אותם בעיון – באם אינך מסכים לתנאים, הנך מתבקש להימנע מביקור ומשימוש באתר. התנאים מנוסחים בלשון זכר אך הנם מתייחסים כמובן לנשים ולגברים כאחד.
              </p>

              <h4 className={h4}>המידע באתר</h4>
              <p className={p}>
                המידע, התיאורים, התמונות, הנתונים, והמפרטים המופיעים באתר זה הינם בעלי אופי בינלאומי, אינם תואמים לחלוטין את כל הרכב המיובא לישראל והם מוצגים לצורך התרשמות בלבד. מערכות, אביזרים ופרטים המופיעים בצילומים ו/או בתיאורים שבאתר, אינם נכללים בהכרח במפרט הרכב המיובא לישראל ואינם בהכרח מוצעים כאופציית רכישה.
              </p>
              <p className={p}>
                החברה משקיעה מאמצים על מנת שהמידע באתר יהיה מדויק ועדכני אך אין בכך משום התחייבות לכך. היצרן והחברה שומרים לעצמם את הזכות לשנות את מבנה האתר ואת המידע המוצג בו, בכל עת וללא הודעה מוקדמת. בכל מקרה, המידע הניתן באולמות התצוגה של החברה גובר על המידע הכללי שבאתר זה.
              </p>

              <h4 className={h4}>שימוש במידע</h4>
              <p className={p}>
                החברה רשאית להשתמש בפרטים שנמסרו לה באתר ובמידע שתאסוף אודות דפוסי השימוש באתר – לצורך שיפור השירותים שהיא מציעה, ליצירת הקשר עם מוסר המידע ולצרכים סטטיסטיים. החברה עשויה לשתף מידע עם סוכניה המורשים, מוסכי השירות המוסמכים ומפרסמיה.
              </p>
              <p className={p}>
                מעצם השימוש באתר אתה נותן הסכמתך לכך שהנתונים שמסרת יועברו לגופים הקשורים עם החברה, לרבות חברות אם ו/או אחיות ו/או בנות, ועשויים לשמש לדיוור ישיר בכל אמצעי תקשורת. ניתן לבטל הסכמה זו בכל עת בפנייה בכתב לחברה.
              </p>

              <h4 className={h4}>קישורים חיצוניים</h4>
              <p className={p}>
                ייתכן שתמצא באתר קישורים לאתרים אחרים. קישורים אלו מוצגים לנוחיותך בלבד ואינם בשליטת החברה. החברה אינה אחראית לתוכן האתרים המקושרים, לאמינותם, עדכניותם או חוקיותם.
              </p>

              <h4 className={h4}>קניין רוחני</h4>
              <p className={p}>
                מלוא זכויות היוצרים והקניין הרוחני באתר, לרבות בשם וסימני המסחר, בעיצוב האתר, בתכנים ובכל תוכנה, יישום וקוד מחשב הכלולים בו, הנם של החברה בלבד. אין להעתיק, להפיץ, להציג בפומבי או למסור לצד שלישי כל חלק שהוא בלא קבלת הסכמת החברה בכתב ומראש.
              </p>

              <h4 className={h4}>שינויים באתר והפסקת השירות</h4>
              <p className={p}>
                החברה תשנה מעת לעת את מבנה האתר, שירותיו ומראהו – ללא צורך להודיע מראש. החברה לא תישא באחריות בגין שינויים או תקלות שיתרחשו אגב ביצועם. החברה אינה מתחייבת ששירותי האתר יינתנו ללא הפסקות, בבטחה ללא טעויות.
              </p>

              <h4 className={h4}>דין ומקום שיפוט</h4>
              <p className={p}>
                על כל שימוש באתר יחולו דיני מדינת ישראל בלבד. מקום השיפוט יהיה בבית המשפט המוסמך בתל-אביב.
              </p>

              <h4 className={h4}>שינויים בתנאי השימוש</h4>
              <p className={p}>
                החברה שומרת לעצמה את הזכות לשנות תנאים אלו בכל עת וללא הודעה מוקדמת. המשך השימוש באתר לאחר ביצוע שינויים מעיד על הסכמתך לשינויים.
              </p>

              <h4 className={h4}>יצירת קשר</h4>
              <p className={p}>
                ניתן לפנות אלינו בטלפון: 073-2799258 או בדוא&quot;ל: Moked1@lubinski.co.il
              </p>

              <hr className="my-8 border-slate-200" />

              {/* ---------------- Section 2 ---------------- */}
              <h3 className={h3}>מדיניות פרטיות</h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">עודכן לאחרונה: 01/01/2026</p>

              <h4 className={h4}>1. כללי</h4>
              <p className={p}>
                ד.ל.ב מוטוספורט בע&quot;מ (להלן: &quot;החברה&quot;) פועלת בעיקר בייבוא, שיווק ומכירה של כלי רכב דו־גלגליים (אופנועים ואופניים), רכבי שטח (כגון טרקטורונים, רכבי SSV וריינג&apos;רים) וציוד נלווה לרכיבה ולשטח, לרבות שירותי התאמה, מיגון ושדרוג לרכבים דו־גלגליים ולרכבי שטח.
              </p>
              <p className={p}>
                החברה היא אחת מהחברות בקבוצת דוד לובינסקי בע&quot;מ (להלן: &quot;הקבוצה&quot;). כל אחת מהחברות בקבוצה מנהלת את מאגרי המידע שלה באופן נפרד.
              </p>
              <p className={p}>
                מדיניות זו מבהירה כיצד החברה אוספת, משתמשת, שומרת ומשתפת מידע אישי, בהתאם לחוק הגנת הפרטיות, התשמ&quot;א–1981, לרבות תיקון מס&apos; 13, ותקנות הגנת הפרטיות (אבטחת מידע), תשע&quot;ז–2017.
              </p>
              <p className={p}>
                מדיניות זו חלה על כל אמצעי הקשר עם החברה, לרבות דוא&quot;ל, טלפון, SMS, אפליקציות מסרים, רשתות חברתיות, האתר וכל ערוץ דיגיטלי אחר.
              </p>

              <h4 className={h4}>2. סוג ומקור המידע הנאסף</h4>
              <p className={p}>
                במסגרת השימוש באתר, קבלת שירותים מהרכב או רכישת מוצרים, נאסף מידע בהתאם לדין ובהתאם להסכמת המשתמש. החברה אוספת את סוגי המידע הבאים:
              </p>
              <ul className={ul}>
                <li>מידע אישי: שם, טלפון, כתובת, מספר זהות/דרכון, מגדר, תאריך לידה, דוא&quot;ל, מספר רכב, מספר שלדה, פרטי התקשרות, פרטי רכישה.</li>
                <li>מידע לצורך רכישה באתר: פרטי אמצעי תשלום (מוצפנים), כתובת משלוח, נתוני חשבונית.</li>
                <li>העדפות שיווקיות ומשוב.</li>
                <li>מידע טכנולוגי: כתובת IP, סוג דפדפן, מערכת הפעלה, הרגלי שימוש.</li>
                <li>מידע מגורמים שלישיים: חברות ליסינג, גופי מימון או חברות ביטוח - לצורך השלמת עסקה.</li>
              </ul>

              <h4 className={h4}>3. חובת מסירה ואופן ההסכמה</h4>
              <p className={p}>
                מסירת מידע אישי נעשית על פי רצון המשתמש. ללא מסירת מידע הכרחי לא ניתן יהיה לספק שירותים או להשלים רכישה. השימוש באתר מהווה הסכמה למדיניות זו בהתאם לדין.
              </p>

              <h4 className={h4}>4. מטרות השימוש במידע</h4>
              <ul className={ul}>
                <li>זיהוי אישי ומניעת הונאות.</li>
                <li>אספקת מוצרים ושירותים.</li>
                <li>תיאום נסיעות מבחן ושירותי מוסך.</li>
                <li>ביצוע רכישות, סליקה, הפקת חשבוניות.</li>
                <li>שירות לקוחות ותיעוד.</li>
                <li>שיפור חוויית המשתמש.</li>
                <li>עמידה בדרישות רגולציה וחוק.</li>
                <li>דיוור שיווקי בהסכמה.</li>
              </ul>

              <h4 className={h4}>5. שימוש בעוגיות</h4>
              <p className={p}>
                אתר החברה עושה שימוש בקבצי Cookies לצורך תפעול תקין של האתר בלבד. הקוקיז הינם טכניים בלבד ואינם אוספים מידע על אתרים אחרים ואינם משמשים ליצירת פרופילים או למטרות פרסום. המשתמש יכול לחסום עוגיות דרך הגדרות הדפדפן, אך הדבר עלול להשפיע על תפקוד האתר.
              </p>

              <h4 className={h4}>6. שיתוף מידע עם צדדים שלישיים</h4>
              <p className={p}>
                החברה תעביר מידע אישי אך ורק לצורך מטרות מותרות ועל פי דין. המידע עשוי להיות מועבר ל: יצרן הרכב, מוסכים וספקים טכניים, חברות ביטוח, מערכת CRM, ספקי סליקה, רשויות מוסמכות לפי דין, וחברות בקבוצה - לצורך דיוור בהסכמה בלבד.
              </p>

              <h4 className={h4}>7. העברת מידע לענן ו/או חו&quot;ל</h4>
              <p className={p}>
                מאגרי המידע מנוהלים על גבי שרתים מקומיים של החברה והקבוצה. אין העברת מידע אישי לחו&quot;ל.
              </p>

              <h4 className={h4}>8. זכויות נושאי המידע</h4>
              <ul className={ul}>
                <li>זכות לידיעה - מידע על זהות בעל השליטה ומטרות העיבוד.</li>
                <li>זכות עיון - עיון במידע האישי הנשמר. מענה בתוך 30 ימים.</li>
                <li>זכות לתיקון/מחיקה - תיקון מידע שאינו נכון או רלוונטי.</li>
                <li>זכות להסרה מדיוור ישיר - בכל עת.</li>
                <li>לפניות: privacy@motosport.co.il</li>
              </ul>

              <h4 className={h4}>9. אבטחת מידע</h4>
              <p className={p}>
                החברה מיישמת מנגנוני הגנה פיזיים וארגוניים בהתאם לתקנות אבטחת מידע, כולל הצפנת מידע רגיש. המידע נשמר לתקופה הנדרשת למטרות העיבוד או לפי דרישות הדין.
              </p>

              <h4 className={h4}>10. עדכונים למדיניות</h4>
              <p className={p}>
                החברה רשאית לעדכן מדיניות זו בכל עת. העדכונים יפורסמו באתר וייכנסו לתוקף עם פרסומם.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
