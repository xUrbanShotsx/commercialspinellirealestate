"use client";
import Image from "next/image";

const FRAMES = [
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    label: "Office & Commercial",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    label: "Industrial & Warehouse",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    label: "Retail & Hospitality",
  },
];

export default function ThreeFrames() {
  return (
    <section style={{ backgroundColor: "#ffffff", height: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      {FRAMES.map((frame) => (
        <div
          key={frame.label}
          style={{ position: "relative", overflow: "hidden" }}
          onMouseEnter={e => {
            const img = (e.currentTarget as HTMLElement).querySelector("img");
            if (img) img.style.transform = "scale(1.04)";
          }}
          onMouseLeave={e => {
            const img = (e.currentTarget as HTMLElement).querySelector("img");
            if (img) img.style.transform = "scale(1)";
          }}
        >
          <Image
            src={frame.src}
            alt={frame.label}
            fill
            sizes="33vw"
            style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.6s ease" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,31,45,0.7) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: "36px", left: "32px", right: "32px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Speciality</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{frame.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
