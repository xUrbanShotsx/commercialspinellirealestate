import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Inter_Tight({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://commercial.spinellirealestate.com.au"),
  title: { default: "Spinelli Commercial", template: "%s — Spinelli Commercial" },
  description:
    "Spinelli Commercial — Illawarra commercial real estate specialists. Buy, lease or sell across Wollongong, Kiama and Shellharbour.",
  keywords: [
    "commercial real estate Illawarra",
    "commercial property Wollongong",
    "commercial property for sale Wollongong",
    "commercial lease Wollongong",
    "office space Wollongong",
    "retail space Illawarra",
    "industrial property Wollongong",
    "Spinelli Commercial",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://commercial.spinellirealestate.com.au",
    siteName: "Spinelli Commercial",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
