import type { Metadata } from "next";
import { Amiri, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-naskh",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ختمة القرآن في ٤٠ يوم",
  description: "رفيقك اليومي لختم القرآن في أربعين يوماً",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icon.png", sizes: "992x1056", type: "image/png" }],
    shortcut: [{ url: "/icon.png", sizes: "992x1056", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${notoNaskh.variable}`}>
      <body>{children}</body>
    </html>
  );
}
