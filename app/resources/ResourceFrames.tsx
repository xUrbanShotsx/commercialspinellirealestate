"use client";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES } from "@/lib/resources";

export default function ResourceFrames() {
  return (
    <section style={{ backgroundColor: "#0D1F2D" }}>
      {RESOURCES.map((r) => (
        <Link
          key={r.slug}
          href={`/resources/${r.slug}`}
          style={{ display: "block", textDecoration: "none" }}
        >
          <div
            style={{ position: "relative", height: "220px", overflow: "hidden", cursor: "pointer" }}
            className="resource-frame"
          >
            <style>{`
              .resource-frame img { transition: transform 0.6s ease !important; }
              .resource-frame:hover img { transform: scale(1.04) !important; }
              .resource-frame .frame-overlay { opacity: 0; transition: opacity 0.35s ease; }
              .resource-frame:hover .frame-overlay { opacity: 1; }
              .resource-frame .frame-meta { transition: transform 0.35s ease, opacity 0.35s ease; transform: translateY(8px); opacity: 0.7; }
              .resource-frame:hover .frame-meta { transform: translateY(0); opacity: 1; }
            `}</style>

            {/* Image */}
            <Image
              src={r.image}
              alt={r.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />

            {/* Always-on dark base */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(13,31,45,0.55)" }} />

            {/* Hover overlay — deeper */}
            <div className="frame-overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,31,45,0.78)" }} />

            {/* Number — always visible */}
            <span style={{
              position: "absolute", top: "24px", left: "32px",
              fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 300,
              color: "rgba(91,194,231,0.6)", letterSpacing: "-0.02em",
            }}>
              {r.num}
            </span>

            {/* Tag — always visible */}
            <span style={{
              position: "absolute", top: "24px", left: "72px",
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)",
            }}>
              {r.tag}
            </span>

            {/* Title + arrow — fades + rises on hover */}
            <div className="frame-meta" style={{
              position: "absolute", bottom: "28px", left: "32px", right: "32px",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px",
            }}>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                fontWeight: 300, color: "#ffffff",
                letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0,
                maxWidth: "70ch",
              }}>
                {r.title}
              </h3>
              <span style={{
                flexShrink: 0,
                width: "40px", height: "40px", border: "1px solid rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#ffffff", fontSize: "16px",
              }}>→</span>
            </div>
          </div>

          {/* 1px separator */}
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />
        </Link>
      ))}
    </section>
  );
}
