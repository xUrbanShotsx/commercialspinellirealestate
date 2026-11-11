"use client";

import { useState } from "react";
import Link from "next/link";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

type Card = {
  num: string;
  label: string;
  subtitle: string;
  ghost: string;
  cta: string;
  href: string;
  dark: boolean;
};

const CARDS: Card[] = [
  {
    num: "01",
    label: "Transfer Duty Calculator",
    subtitle: "NSW 2024-25",
    ghost: "4.5%",
    cta: "Calculate duty",
    href: "/calculators/stamp-duty",
    dark: true,
  },
  {
    num: "02",
    label: "Yield Calculator",
    subtitle: "Gross & Net Returns",
    ghost: "6.0%",
    cta: "Calculate yield",
    href: "/calculators/yield",
    dark: false,
  },
];

function CalcCard({ card }: { card: Card }) {
  const [hovered, setHovered] = useState(false);

  const bg         = card.dark ? "#0f1f28" : "#fff";
  const textColor  = card.dark ? "#fff"    : "#1d4a58";
  const dimColor   = card.dark ? "rgba(255,255,255,0.35)" : "rgba(29,74,88,0.4)";
  const ghostColor = card.dark ? "rgba(255,255,255,0.03)" : "rgba(29,74,88,0.04)";
  const borderCol  = card.dark ? "rgba(255,255,255,0.08)" : "rgba(29,74,88,0.1)";
  const arrowBorder= card.dark ? "rgba(255,255,255,0.3)"  : "rgba(29,74,88,0.3)";

  return (
    <Link
      href={card.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        minHeight: "clamp(300px,45vw,580px)",
        overflow: "hidden",
        background: bg,
        border: `1px solid ${borderCol}`,
        borderTop: "none",
        textDecoration: "none",
        padding: "clamp(36px,5vw,72px)",
        cursor: "pointer",
      }}
    >
      {/* Ghost text */}
      <div aria-hidden style={{
        position: "absolute",
        bottom: "-24px", right: "-8px",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "clamp(100px,14vw,190px)",
        fontWeight: 700,
        color: ghostColor,
        lineHeight: 1,
        letterSpacing: "-0.06em",
        userSelect: "none",
        pointerEvents: "none",
        transform: hovered ? "scale(1.05) translateY(-10px)" : "scale(1) translateY(0)",
        transition: `transform 1s ${EASE}`,
        whiteSpace: "nowrap",
      }}>
        {card.ghost}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
          color: dimColor, marginBottom: 24,
        }}>{card.num}</p>

        <h2 style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(22px,2.6vw,40px)",
          fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1,
          color: textColor, marginBottom: 10,
        }}>{card.label}</h2>

        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11, letterSpacing: "0.08em",
          color: dimColor, marginBottom: 44,
        }}>{card.subtitle}</p>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 14,
          transform: hovered ? "translateX(8px)" : "translateX(0)",
          transition: `transform 0.5s ${EASE}`,
        }}>
          <span style={{
            width: 40, height: 40,
            border: `1px solid ${arrowBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: textColor, fontSize: 15,
          }}>→</span>
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            color: dimColor,
          }}>{card.cta}</span>
        </div>
      </div>
    </Link>
  );
}

export default function CalculatorsIndex() {
  return (
    <section style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      minHeight: "80vh",
    }} className="calc-index-grid">
      {CARDS.map((c) => (
        <CalcCard key={c.href} card={c} />
      ))}
    </section>
  );
}
