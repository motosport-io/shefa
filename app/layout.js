import { Heebo, Assistant } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata = {
  title: "DLB Motosport — פתרונות רכב תפעולי לרשויות מקומיות",
  description:
    "שלושה כלים תפעוליים לרשויות מקומיות בישראל: Goupil G4 חשמלי, GREENMAN UF2+2 חשמלי ו-Polaris Ranger Diesel 2026. ניקיון, תחזוקה ושטח — בחשמל מלא או בדיזל.",
  openGraph: {
    title: "DLB Motosport — רכב תפעולי לרשויות מקומיות",
    description:
      "שלושה כלים, שלושה צרכים — ניקיון, תחזוקה ושטח. בחשמל מלא או בדיזל.",
    locale: "he_IL",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b63b8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${assistant.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
