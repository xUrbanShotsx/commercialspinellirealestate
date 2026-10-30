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
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#ffffff", borderBottom: "1px solid #E8E5DF" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "32px", height: "32px", backgroundColor: "#5BC2E7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", fontFamily: "var(--font-sans)" }}>S</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#0D3348", letterSpacing: "0.02em", fontFamily: "var(--font-sans)", lineHeight: 1.1 }}>SPINELLI</p>
            <p style={{ margin: 0, fontSize: "9px", fontWeight: 500, color: "#5BC2E7", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)", lineHeight: 1.1 }}>Commercial</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D3348", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}>
              {n.label}
            </Link>
          ))}
          <a href="tel:0242960047" style={{ fontSize: "12px", fontWeight: 500, color: "#5BC2E7", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>
            02 4296 0047
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }} aria-label="Menu">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <rect width="22" height="2" fill="#0D3348" />
            <rect y="7" width="22" height="2" fill="#0D3348" />
            <rect y="14" width="22" height="2" fill="#0D3348" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E5DF", padding: "20px 24px 24px" }} className="md:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", fontSize: "14px", fontWeight: 500, color: "#0D3348", borderBottom: "1px solid #F0EDE8", fontFamily: "var(--font-sans)" }}>
              {n.label}
            </Link>
          ))}
          <a href="tel:0242960047" style={{ display: "block", paddingTop: "16px", fontSize: "14px", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>
            02 4296 0047
          </a>
        </div>
      )}
    </header>
  );
}
