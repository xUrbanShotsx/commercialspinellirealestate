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

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
        .hamburger-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          background: #ffffff;
          border: 1px solid #E8E5DF;
          border-radius: 10px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          min-width: 180px;
          overflow: hidden;
        }
        .hamburger-dropdown a {
          display: block;
          padding: 14px 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0D1F2D;
          text-decoration: none;
          font-family: var(--font-sans);
          border-bottom: 1px solid #F0EDE8;
          transition: background 0.15s;
        }
        .hamburger-dropdown a:last-child { border-bottom: none; }
        .hamburger-dropdown a:hover { background: #F9F8F6; color: #5BC2E7; }
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

          {/* Left — hamburger with dropdown */}
          <div ref={menuRef} style={{ position: "relative" }}>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "block", height: "2px", backgroundColor: iconColor, transition: "background-color 0.3s, transform 0.2s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
                <span style={{ display: "block", height: "2px", backgroundColor: iconColor, transition: "background-color 0.3s, opacity 0.2s", opacity: open ? 0 : 1 }} />
                <span style={{ display: "block", height: "2px", backgroundColor: iconColor, transition: "background-color 0.3s, transform 0.2s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
              </div>
              <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: iconColor, fontFamily: "var(--font-sans)", transition: "color 0.3s" }}>
                Menu
              </span>
            </button>

            {open && (
              <div className="hamburger-dropdown">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
    </>
  );
}
