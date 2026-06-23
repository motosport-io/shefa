import { NextResponse } from "next/server";

export const runtime = "nodejs";

const VEHICLES = [
  "Goupil G4",
  "GREENMAN UF2+2",
  "Polaris Ranger Diesel 2026",
  "לא בטוח/ייעוץ",
];

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const {
    fullName = "",
    phone = "",
    email = "",
    organization = "",
    vehicle = "",
    consent = false,
    company = "", // honeypot — must stay empty
  } = data || {};

  // Honeypot: silently accept bots without sending mail.
  if (company && String(company).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validation
  const errors = [];
  if (!String(fullName).trim()) errors.push("שם מלא");
  if (!/^[0-9+\-\s()]{7,15}$/.test(String(phone).trim())) errors.push("טלפון");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) errors.push("אימייל");
  if (!String(organization).trim()) errors.push("ארגון / רשות");
  if (!VEHICLES.includes(String(vehicle))) errors.push("כלי מבוקש");
  if (!consent) errors.push("אישור");

  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: errors },
      { status: 422 }
    );
  }

  const timestamp = new Intl.DateTimeFormat("he-IL", {
    timeZone: "Asia/Jerusalem",
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());

  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const from = (process.env.FROM || "DLB Motosport <onboarding@resend.dev>").trim();
  const to = (process.env.TO || "royso@lubinski.co.il").trim();

  const subject = `ליד חדש מדף הרשויות — ${vehicle}`;
  const rows = [
    ["שם מלא", fullName],
    ["טלפון", phone],
    ["אימייל", email],
    ["ארגון / רשות", organization],
    ["כלי מבוקש", vehicle],
    ["התקבל בתאריך", timestamp],
  ];
  const html = `
    <div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;font-size:15px;line-height:1.7">
      <h2 style="margin:0 0 12px">ליד חדש — דף נחיתה לרשויות מקומיות</h2>
      <table style="border-collapse:collapse;min-width:340px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;background:#f1f5f9;font-weight:bold;border:1px solid #e2e8f0">${esc(
                   k
                 )}</td>
                 <td style="padding:8px 12px;border:1px solid #e2e8f0">${esc(v)}</td>
               </tr>`
          )
          .join("")}
      </table>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  // If no provider configured, log and accept so the page works in dev/preview.
  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY missing — lead not emailed:", text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  // The Authorization header must be an ASCII ByteString. If the configured key
  // contains non-ASCII characters (e.g. a wrong/garbled value pasted into the
  // env var), fetch would throw "Cannot convert argument to a ByteString"
  // before any request is sent. Fail gracefully with a clear log instead.
  if (!/^[\x20-\x7E]+$/.test(apiKey)) {
    console.error(
      "[lead] RESEND_API_KEY contains non-ASCII characters — re-enter a clean re_... key in the Vercel env. Lead not emailed:",
      text
    );
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[lead] Resend error:", res.status, detail);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] send exception:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
