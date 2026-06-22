# DLB Motosport — דף נחיתה לרשויות מקומיות

דף נחיתה שיווקי (עמוד יחיד) בעברית / RTL לרשויות מקומיות בישראל, המציג שלושה
כלים תפעוליים — **Goupil G4** (חשמלי), **GREENMAN UF2+2** (חשמלי) ו-**Polaris
Ranger Diesel 2026** (דיזל) — ולוכד לידים.

Built with **Next.js (App Router)** + **Tailwind CSS**.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Lead form / email

The form POSTs JSON to the serverless route **`/api/lead`** (`app/api/lead/route.js`),
which emails the lead to `royso@lubinski.co.il` via [Resend](https://resend.com)
using the REST API (no extra dependency). The API key is read server-side only
and never exposed to the client. Includes field validation + a honeypot anti-spam
field.

If `RESEND_API_KEY` is not set, the route logs the lead and returns success so the
page still works in dev/preview — no email is sent.

### Required environment variables

Add these in **Vercel → Project → Settings → Environment Variables**
(and locally in `.env.local`). See `.env.example`.

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | yes (for live email) | Resend API key (`re_...`). |
| `FROM` | recommended | Verified sender, e.g. `DLB Motosport <leads@yourdomain.co.il>`. Defaults to `onboarding@resend.dev`. |
| `TO` | optional | Recipient. Defaults to `royso@lubinski.co.il`. |

The email subject is `ליד חדש מדף הרשויות — {כלי מבוקש}` and the body lists all
five fields plus a timestamp in Asia/Jerusalem time.

## Assets

Product images and brand/company logos go in `public/images` and `public/logos`.
The page references images by exact filename; missing files render as a labelled
placeholder. See `public/images/README.md` for the full filename list. The 4
Goupil G4 webp files are wired into a responsive gallery.

## Deploy to Vercel

```bash
vercel --prod
```

Set the environment variables above in the Vercel project before going live.
