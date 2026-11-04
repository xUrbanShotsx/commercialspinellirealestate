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
      <style>{`
        .nav-link {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0D1F2D;
          padding: 0 20px;
          height: 44px;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .nav-link:hover { color: #5BC2E7; }
      `}</style>

      {/* Announcement bar */}
      <div style={{ backgroundColor: "#0D1F2D", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)", letterSpacing: "0.08em" }}>
          Illawarra&apos;s Commercial Property Specialists &nbsp;·&nbsp;
          <a href="tel:0242960047" style={{ color: "#5BC2E7" }}>02 4296 0047</a>
        </p>
      </div>

      {/* Main header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "#ffffff", boxShadow: "0 1px 0 #E8E5DF" }}>

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px" }}>

          {/* Left — phone (desktop only) */}
          <a href="tel:0242960047" className="hidden md:block" style={{ fontSize: "11px", fontWeight: 500, color: "#7a7265", fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}>
            02 4296 0047
          </a>

          {/* Centre — logo */}
          <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "30px", height: "30px", backgroundColor: "#0D1F2D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#5BC2E7", fontSize: "13px", fontWeight: 800, fontFamily: "var(--font-sans)" }}>S</span>
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0D1F2D", letterSpacing: "0.1em", fontFamily: "var(--font-sans)", lineHeight: 1, textTransform: "uppercase" }}>Spinelli</p>
                <p style={{ margin: 0, fontSize: "8px", fontWeight: 600, color: "#5BC2E7", letterSpacing: "0.26em", textTransform: "uppercase", fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>Commercial</p>
              </div>
            </div>
          </Link>

          {/* Right — enquire (desktop) / hamburger (mobile) */}
          <Link href="/contact" className="hidden md:block" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0D1F2D", fontFamily: "var(--font-sans)", borderBottom: "2px solid #5BC2E7", paddingBottom: "2px" }}>
            Enquire Now
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }} aria-label="Menu">
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "2px", backgroundColor: "#0D1F2D" }} />
              <span style={{ display: "block", height: "2px", backgroundColor: "#0D1F2D" }} />
              <span style={{ display: "block", height: "2px", backgroundColor: "#0D1F2D" }} />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "2px solid #0D1F2D" }} />

        {/* Nav row (desktop) */}
        <div className="hidden md:flex" style={{ justifyContent: "center", alignItems: "center", borderBottom: "2px solid #0D1F2D" }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link">
              {n.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E5DF" }} className="md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", padding: "14px 24px",
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "#0D1F2D",
                  borderBottom: "1px solid #F0EDE8", fontFamily: "var(--font-sans)",
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
