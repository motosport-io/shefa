"use client";

import { useState } from "react";
import * as I from "@/components/icons";

const VEHICLES = [
  "Goupil G4",
  "GREENMAN UF2+2",
  "Polaris Ranger Diesel 2026",
  "לא בטוח/ייעוץ",
];

export default function LeadForm({ vehicle, onVehicleChange }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      fullName: fd.get("fullName")?.toString().trim(),
      phone: fd.get("phone")?.toString().trim(),
      email: fd.get("email")?.toString().trim(),
      organization: fd.get("organization")?.toString().trim(),
      vehicle: fd.get("vehicle")?.toString(),
      consent: fd.get("consent") === "on",
      company: fd.get("company")?.toString() || "", // honeypot
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "validation" && data.fields) {
          throw new Error(`נא לבדוק את השדות: ${data.fields.join(", ")}`);
        }
        throw new Error("send_failed");
      }
      setStatus("success");
      form.reset();
      onVehicleChange?.("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.message && err.message !== "send_failed"
          ? err.message
          : "אירעה תקלה בשליחה. נסו שוב או חייגו 050-363-6365."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-emerald-50 p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
          <I.Check className="h-7 w-7" />
        </span>
        <p className="text-lg font-bold text-emerald-800">
          תודה! הפנייה התקבלה, נחזור אליכם בהקדם.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-bold text-emerald-700 underline"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  const labelCls = "mb-1 block text-sm font-bold text-ink";
  const inputCls =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
      {/* Honeypot (hidden from humans) */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          אל תמלאו שדה זה
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelCls}>
            שם מלא <span className="text-brand">*</span>
          </label>
          <input id="fullName" name="fullName" type="text" required autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            טלפון <span className="text-brand">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            dir="ltr"
            pattern="^0(5\d|[2-489])-?\d{7}$"
            placeholder="050-1234567"
            autoComplete="tel"
            className={`${inputCls} text-right`}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            אימייל <span className="text-brand">*</span>
          </label>
          <input id="email" name="email" type="email" required dir="ltr" autoComplete="email" className={`${inputCls} text-right`} />
        </div>
        <div>
          <label htmlFor="organization" className={labelCls}>
            ארגון / רשות <span className="text-brand">*</span>
          </label>
          <input id="organization" name="organization" type="text" required autoComplete="organization" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="vehicle" className={labelCls}>
          כלי מבוקש <span className="text-brand">*</span>
        </label>
        <select
          id="vehicle"
          name="vehicle"
          required
          value={vehicle}
          onChange={(e) => onVehicleChange?.(e.target.value)}
          className={inputCls}
        >
          <option value="" disabled>
            בחרו כלי…
          </option>
          {VEHICLES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-slate-600">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
        <span>
          אני מאשר/ת לחברת DLB Motosport ליצור עמי קשר בנוגע לפנייה. הפרטים יישמרו
          לצורך מענה בלבד ולא יועברו לצד שלישי.
        </span>
      </label>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "שולח…" : "שליחה"}
      </button>
    </form>
  );
}
