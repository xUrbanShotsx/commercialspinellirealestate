import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculators | Spinelli Commercial",
};

export default function CalculatorsPage() {
  return (
    <>
      <section style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "flex-end", backgroundColor: "#0D1F2D", overflow: "hidden" }}>
        <Image src="/hero.webp" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center 60%", opacity: 0.3 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,31,45,0.98) 35%, rgba(13,31,45,0.5))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "80px 40px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7" }} />
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>Calculators</p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1 }}>
            Property Calculators
          </h1>
        </div>
      </section>

      <section style={{ backgroundColor: "#F5F4F0", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ fontSize: "15px", color: "#7a7265", fontFamily: "var(--font-sans)", lineHeight: 1.8, maxWidth: "600px", marginBottom: "48px" }}>
            Yield calculators, stamp duty estimators and financing tools — coming soon. Contact our team for a tailored financial analysis of any commercial property.
          </p>
          <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#0D1F2D", color: "#ffffff", padding: "14px 28px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)", textDecoration: "none" }}>
            Get a custom analysis
          </Link>
        </div>
      </section>
    </>
  );
}
