"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Property } from "@/lib/types";

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const IMG_H = "clamp(200px, 23vw, 380px)";

const TYPE_LABEL: Record<string, string> = {
  "commercial-sale": "For Sale",
  "commercial-lease": "For Lease",
  "business": "Business",
  "residential-sale": "For Sale",
  "residential-rent": "For Rent",
  "project": "Project",
};

export default function ListingCard({ p }: { p: Property }) {
  const [hovered, setHovered] = useState(false);

  const specs = [
    p.buildingSize ? `${p.buildingSize}` : null,
    p.landSize && !p.buildingSize ? `${p.landSize}` : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/listings/${p.id}`}
      className="listing-card"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", height: IMG_H, overflow: "hidden", background: "#e8e8e8" }}>
        <Image
          src={p.image}
          alt={p.address}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            filter: hovered ? "grayscale(1)" : "grayscale(0)",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: `filter 0.6s ${EASE}, transform 0.9s ${EASE}`,
          }}
        />

        {/* type badge + specs — stacked bottom-left on hover */}
        <div style={{
          position: "absolute", bottom: 18, left: 18,
          display: "flex", flexDirection: "column", gap: 2,
          pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#fff", lineHeight: 1.4,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 0.4s ${EASE}, transform 0.4s ${EASE}`,
          }}>{TYPE_LABEL[p.type] ?? "Commercial"}</span>
          {specs.map((s, i) => (
            <span key={s} style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)", lineHeight: 1.4,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: `opacity 0.4s ${(i + 1) * 0.05}s ${EASE}, transform 0.4s ${(i + 1) * 0.05}s ${EASE}`,
            }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 14 }}>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#000", marginBottom: 4,
        }}>{p.address.toUpperCase()}</p>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(0,0,0,0.4)",
        }}>{p.suburb.toUpperCase()} NSW</p>
      </div>
    </Link>
  );
}
