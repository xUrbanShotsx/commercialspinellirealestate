"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES } from "@/lib/resources";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

function ResourceCard({ r }: { r: typeof RESOURCES[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/resources/${r.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", textDecoration: "none" }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#1a3040" }}>
        <Image
          src={r.image}
          alt={r.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            filter: hovered ? "grayscale(0)" : "grayscale(1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: `filter 0.65s ${EASE}, transform 0.9s ${EASE}`,
          }}
        />
        {/* Tag badge — same style as "For Sale" badge on listings */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#fff",
          background: "rgba(10,30,40,0.65)",
          padding: "5px 10px",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 999,
        }}>
          {r.tag}
        </div>
      </div>

      {/* Info row — mirrors PropCard text section */}
      <div style={{
        paddingTop: 18,
        paddingBottom: 28,
        borderBottom: "1px solid rgba(255,255,255,0.09)",
      }}>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: 8,
        }}>{r.num}</p>
        <h3 style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(16px,1.8vw,22px)",
          fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15,
          color: "#fff",
          marginBottom: 10,
        }}>{r.title}</h3>
        <p style={{
          fontSize: "clamp(12px,1.1vw,14px)",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.45)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{r.summary}</p>
      </div>
    </Link>
  );
}

export default function ResourceFrames() {
  return (
    <section style={{ background: "#1d4a58", padding: "clamp(60px,8vw,120px) 0 clamp(80px,14vw,160px)" }}>
      <div className="wrap">
        <div className="prop-cards">
          {RESOURCES.map((r) => (
            <ResourceCard key={r.slug} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
