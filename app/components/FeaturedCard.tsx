"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

const TYPE_LABEL: Record<string, string> = {
  "commercial-sale": "For Sale",
  "commercial-lease": "For Lease",
  "business": "Business",
  "residential-sale": "For Sale",
  "residential-rent": "For Rent",
  "project": "Project",
};

type Props = {
  id: string;
  image: string;
  address: string;
  suburb: string;
  price: string;
  type: string;
  delay?: number;
};

export default function FeaturedCard({ id, image, address, suburb, price, type, delay = 0 }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/listings/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.15)",
        minHeight: "clamp(300px,45vw,680px)",
        transitionDelay: `${delay}ms`,
        textDecoration: "none",
      }}
    >
      <Image
        src={image}
        alt={address}
        fill
        sizes="(max-width: 960px) 100vw, 33vw"
        style={{
          objectFit: "cover",
          filter: hovered ? "grayscale(0)" : "grayscale(1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: `filter 0.7s ${EASE}, transform 0.9s ${EASE}`,
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1,
        opacity: hovered ? 1 : 0,
        transition: `opacity 0.5s ${EASE}`,
      }} />

      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(20px,3vw,36px)", gap: 10,
        pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(16px,1.8vw,26px)", fontWeight: 700,
          letterSpacing: "-0.03em", lineHeight: 1.1,
          color: "#fff", textAlign: "center",
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 0.55s ${EASE}`,
        }}>{address}</p>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)", textAlign: "center",
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 0.55s 0.07s ${EASE}`,
        }}>{suburb} · {TYPE_LABEL[type] ?? "Commercial"} · {price}</p>
      </div>
    </Link>
  );
}
