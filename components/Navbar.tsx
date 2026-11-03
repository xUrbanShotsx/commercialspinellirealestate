"use client";
import { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Listings", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div style={{ backgroundColor: "#0D1F2D", borderBottom: "1px solid #1e3448" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>
            Illawarra&apos;s Commercial Property Specialists
          </p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <a href="tel:0242960047" style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>02 4296 0047</a>
            <a href="mailto:adam@spinellire.com" style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>adam@spinellire.com</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "#0D1F2D", borderBottom: "2px solid #5BC2E7" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", backgroundColor: "#5BC2E7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#0D1F2D", fontSize: "14px", fontWeight: 800, fontFamily: "var(--font-sans)" }}>S</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.1em", fontFamily: "var(--font-sans)", lineHeight: 1, textTransform: "uppercase" }}>Spinelli</p>
              <p style={{ margin: 0, fontSize: "9px", fontWeight: 500, color: "#5BC2E7", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>Commercial</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0" }} className="hidden md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-sans)", padding: "0 20px",
                  height: "64px", display: "flex", alignItems: "center",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              style={{
                marginLeft: "16px", backgroundColor: "#5BC2E7", color: "#0D1F2D",
                padding: "10px 20px", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
              }}
            >
              Enquire Now
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }} aria-label="Menu">
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "2px", backgroundColor: "#fff" }} />
              <span style={{ display: "block", height: "2px", backgroundColor: "#fff" }} />
              <span style={{ display: "block", height: "2px", backgroundColor: "#fff" }} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ backgroundColor: "#0a1922", borderTop: "1px solid rgba(255,255,255,0.08)" }} className="md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", padding: "14px 24px",
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-sans)",
                }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
