"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Listings", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const iconColor = scrolled ? "#0D1F2D" : "#ffffff";
  const textColor = scrolled ? "#0D1F2D" : "#ffffff";

  return (
    <>
      <style>{`
        .navbar-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: background-color 0.3s, box-shadow 0.3s;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 18s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .mega-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #F5F4F0;
          z-index: 99;
          overflow-y: auto;
          animation: menuIn 0.25s ease;
        }
        @keyframes menuIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mega-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-sans);
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0D1F2D;
          text-decoration: none;
          padding: 20px 0;
          border-bottom: 1px solid #E8E5DF;
          transition: color 0.15s;
        }
        .mega-nav-link:last-child { border-bottom: none; }
        .mega-nav-link:hover { color: #5BC2E7; }
        .mega-nav-link .arrow { font-size: 0.6em; opacity: 0.4; transition: transform 0.15s, opacity 0.15s; }
        .mega-nav-link:hover .arrow { transform: translateX(4px); opacity: 1; }
      `}</style>

      {/* Announcement bar — hidden on scroll */}
      <div
        style={{
          backgroundColor: "#ffffff",
          height: "36px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          maxHeight: scrolled ? "0" : "36px",
          transition: "max-height 0.3s ease",
          borderBottom: "1px solid #e8e5df",
        }}
      >
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <Link
              key={i}
              href="/report"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#0D1F2D",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.14em",
                whiteSpace: "nowrap",
                padding: "0 48px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              GET A COMPLIMENTARY COMMERCIAL REPORT &nbsp;→
            </Link>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header
        className="navbar-top"
        style={{
          top: scrolled ? 0 : "36px",
          backgroundColor: scrolled ? "#ffffff" : "transparent",
          boxShadow: scrolled ? "0 1px 0 #E8E5DF" : "none",
          transition: "top 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "84px" }}>

          {/* Left — hamburger / close toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", gap: "10px", zIndex: 101, position: "relative" }}
          >
            {open ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="1" y1="1" x2="15" y2="15" stroke={open ? "#0D1F2D" : iconColor} strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="1" x2="1" y2="15" stroke={open ? "#0D1F2D" : iconColor} strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0D1F2D", fontFamily: "var(--font-sans)" }}>Close</span>
              </>
            ) : (
              <>
                <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
                  <span style={{ display: "block", height: "2px", backgroundColor: iconColor, transition: "background-color 0.3s" }} />
                  <span style={{ display: "block", height: "2px", backgroundColor: iconColor, transition: "background-color 0.3s" }} />
                  <span style={{ display: "block", height: "2px", backgroundColor: iconColor, transition: "background-color 0.3s" }} />
                </div>
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: iconColor, fontFamily: "var(--font-sans)", transition: "color 0.3s" }}>Menu</span>
              </>
            )}
          </button>

          {/* Centre — logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <Image
              src="/logo.webp"
              alt="Spinelli Commercial"
              width={220}
              height={56}
              style={{
                objectFit: "contain",
                filter: scrolled ? "invert(1)" : "none",
                transition: "filter 0.3s",
                height: "68px",
                width: "auto",
              }}
              priority
            />
          </Link>

          {/* Right — Enquire Now */}
          <Link
            href="/contact"
            style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", borderBottom: "2px solid #5BC2E7", paddingBottom: "2px",
              color: textColor, transition: "color 0.3s", textDecoration: "none",
            }}
          >
            Enquire Now
          </Link>
        </div>

        {/* Nav row — hidden on scroll */}
        <div style={{
          overflow: "hidden",
          maxHeight: scrolled ? "0" : "90px",
          transition: "max-height 0.3s ease",
        }}>
          <div className="hidden md:flex" style={{ justifyContent: "center", alignItems: "center" }}>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase" as const,
                  color: scrolled ? "#0D1F2D" : "#ffffff",
                  padding: "0 20px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.15s",
                  textDecoration: "none",
                }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Full-screen mega menu */}
      {open && (
        <div className="mega-menu" ref={menuRef}>
          {/* Top bar spacer (matches header height) */}
          <div style={{ height: "84px" }} />

          {/* Content */}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

            {/* Left — primary nav */}
            <nav>
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="mega-nav-link" onClick={() => setOpen(false)}>
                  {n.label}
                  <span className="arrow">▶</span>
                </Link>
              ))}
              <Link href="/report" className="mega-nav-link" onClick={() => setOpen(false)} style={{ color: "#5BC2E7" }}>
                Get a Report
                <span className="arrow">▶</span>
              </Link>
            </nav>

            {/* Right — contact details */}
            <div style={{ paddingTop: "8px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a2b0aa", fontFamily: "var(--font-sans)", marginBottom: "28px" }}>Contact</p>
              <a href="tel:0242960047" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 300, color: "#0D1F2D", textDecoration: "none", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                02 4296 0047
              </a>
              <a href="mailto:info@spinellire.com" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 300, color: "#0D1F2D", textDecoration: "none", marginBottom: "40px", letterSpacing: "-0.01em" }}>
                info@spinellire.com
              </a>
              <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7", marginBottom: "20px" }} />
              <p style={{ fontSize: "13px", fontFamily: "var(--font-sans)", color: "#a2b0aa", lineHeight: 1.8 }}>
                16 College Avenue<br />Shellharbour City Centre NSW 2529<br /><br />Mon – Fri · 8:30am – 5:30pm<br />Saturday · 9:00am – 4:00pm
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
