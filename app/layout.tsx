import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://commercial.spinellirealestate.com.au"),
  title: {
    default: "Spinelli Commercial | Illawarra Commercial Property",
    template: "%s | Spinelli Commercial",
  },
  description:
    "Spinelli Commercial — Illawarra's trusted commercial real estate specialists. Buy, lease or sell commercial property across Wollongong, Kiama, Shellharbour and surrounds.",
  keywords: [
    "commercial real estate Illawarra",
    "commercial property Wollongong",
    "commercial property for sale Wollongong",
    "commercial lease Wollongong",
    "office space Wollongong",
    "retail space Illawarra",
    "industrial property Wollongong",
    "Spinelli Commercial",
    "commercial real estate agent Illawarra",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://commercial.spinellirealestate.com.au",
    siteName: "Spinelli Commercial",
    title: "Spinelli Commercial | Illawarra Commercial Property",
    description: "Illawarra's trusted commercial real estate specialists — buy, lease or sell commercial property across Wollongong, Kiama and Shellharbour.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
