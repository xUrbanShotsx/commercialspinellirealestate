import type { Metadata } from "next";
import Image from "next/image";
import CalculatorsClient from "./CalculatorsClient";

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
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>Tools</p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1 }}>
            Property Calculators
          </h1>
        </div>
      </section>

      <CalculatorsClient />
    </>
  );
}
