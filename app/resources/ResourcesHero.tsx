"use client";

import Image from "next/image";
import Reveal from "../components/Reveal";

function HatchPattern() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "clamp(200px, 28vw, 360px)",
        height: "clamp(200px, 28vw, 360px)",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {/* Diagonal dashed lines at ~45deg — pill/dash style matching reference */}
      {Array.from({ length: 22 }, (_, row) =>
        Array.from({ length: 22 }, (_, col) => {
          const x = col * 20 - 60 + row * 20;
          const y = row * 20 - col * 2;
          if (x < -40 || x > 380 || y < -40 || y > 380) return null;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width={14}
              height={5}
              rx={2.5}
              transform={`rotate(-45 ${x + 7} ${y + 2.5})`}
              fill="#c0392b"
              opacity={0.9}
            />
          );
        })
      )}
    </svg>
  );
}

export default function ResourcesHero() {
  return (
    <section
      style={{
        background: "#0f1f28",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "clamp(100px, 14vw, 180px)",
        paddingBottom: 0,
      }}
    >
      <div className="wrap" style={{ paddingBottom: 0, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Title row — dark bg, text right-aligned */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingBottom: "clamp(20px, 3vw, 36px)",
          }}
        >
          <Reveal>
            <h1
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "clamp(36px, 6vw, 88px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#e8e4de",
              }}
            >
              Resources.
            </h1>
          </Reveal>
        </div>

        {/* Inset image with hatch overlay — grows to fill remaining viewport */}
        <div
          style={{
            position: "relative",
            width: "100%",
            flex: 1,
            minHeight: "40vh",
            overflow: "hidden",
            background: "#1d3344",
          }}
        >
          <Image
            src="/hero.webp"
            alt="Resources"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark overlay to push image toward the reference tones */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(10,20,32,0.45) 0%, rgba(10,20,32,0.1) 60%, transparent 100%)",
              zIndex: 1,
            }}
          />
          <HatchPattern />
        </div>
      </div>
    </section>
  );
}
