"use client";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES } from "@/lib/resources";

export default function ResourceFrames() {
  return (
    <section className="dark" style={{ background: "var(--ink)" }}>
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
              .resource-frame img { transition: transform 0.6s var(--ease) !important; }
              .resource-frame:hover img { transform: scale(1.04) !important; }
              .resource-frame .frame-overlay { opacity: 0; transition: opacity 0.35s var(--ease); }
              .resource-frame:hover .frame-overlay { opacity: 1; }
              .resource-frame .frame-meta { transition: transform 0.35s var(--ease), opacity 0.35s var(--ease); transform: translateY(8px); opacity: 0.7; }
              .resource-frame:hover .frame-meta { transform: translateY(0); opacity: 1; }
            `}</style>

            <Image
              src={r.image}
              alt={r.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />

            {/* Always-on dark base */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)" }} />

            {/* Hover overlay — deeper */}
            <div className="frame-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.76)" }} />

            {/* Number */}
            <span style={{
              position: "absolute", top: "24px", left: "32px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "12px", letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.35)",
            }}>
              {r.num}
            </span>

            {/* Tag */}
            <span style={{
              position: "absolute", top: "24px", left: "72px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "12px", letterSpacing: "0.08em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
            }}>
              {r.tag}
            </span>

            {/* Title + arrow */}
            <div className="frame-meta" style={{
              position: "absolute", bottom: "28px", left: "32px", right: "32px",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px",
            }}>
              <h3 style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "clamp(18px,2.2vw,28px)",
                fontWeight: 700, color: "#fff",
                letterSpacing: "-0.03em", lineHeight: 1.15, margin: 0,
                maxWidth: "70ch",
              }}>
                {r.title}
              </h3>
              <span style={{
                flexShrink: 0,
                width: "40px", height: "40px",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "16px",
              }}>→</span>
            </div>
          </div>

          {/* Separator */}
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
        </Link>
      ))}
    </section>
  );
}
