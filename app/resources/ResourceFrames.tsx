"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES } from "@/lib/resources";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

function ResourceCard({ r, delay = 0 }: { r: typeof RESOURCES[0]; delay?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/resources/${r.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        cursor: "pointer",
        textDecoration: "none",
        minHeight: "clamp(260px,38vw,560px)",
      }}
    >
      {/* Image */}
      <Image
        src={r.image}
        alt={r.title}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          filter: hovered ? "grayscale(0)" : "grayscale(1)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: `filter 0.7s ${EASE}, transform 0.9s ${EASE}`,
        }}
      />

      {/* Always-on dark base */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)", zIndex: 1 }} />

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)",
        zIndex: 2,
        opacity: hovered ? 1 : 0,
        transition: `opacity 0.45s ${EASE}`,
      }} />

      {/* Number + tag — top left, always visible */}
      <div style={{
        position: "absolute", top: 20, left: 20, zIndex: 4,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11, letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.4)",
        }}>{r.num}</span>
        <span style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}>{r.tag}</span>
      </div>

      {/* Arrow — top right */}
      <div style={{
        position: "absolute", top: 16, right: 16, zIndex: 4,
        width: 36, height: 36,
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 14,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translate(0,0)" : "translate(4px,-4px)",
        transition: `opacity 0.4s ${EASE}, transform 0.4s ${EASE}`,
      }}>→</div>

      {/* Title + read more — center, reveal on hover */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(20px,3vw,36px)", gap: 10,
        pointerEvents: "none",
      }}>
        <h3 style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(14px,1.6vw,20px)",
          fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2,
          color: "#fff", textAlign: "center", margin: 0,
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 0.55s ${EASE}`,
        }}>{r.title}</h3>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)", textAlign: "center",
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 0.55s 0.08s ${EASE}`,
        }}>Read article →</p>
      </div>
    </Link>
  );
}

export default function ResourceFrames() {
  return (
    <section style={{ background: "#1d4a58", padding: "clamp(60px,8vw,120px) 0 clamp(80px,14vw,160px)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(10px,1.5vw,20px)",
          padding: "0 clamp(20px,4vw,56px) clamp(20px,4vw,56px)",
        }}
        className="listings-grid"
      >
        {RESOURCES.map((r, i) => (
          <ResourceCard key={r.slug} r={r} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}
