"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "#0D1F2D" : "#ffffff";
  const hamburgerColor = scrolled ? "#0D1F2D" : "#ffffff";

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
        .navbar-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: background-color 0.3s, box-shadow 0.3s;
        }
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
        <style>{`
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
        `}</style>
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

          {/* Left — phone (desktop only) */}
          <a
            href="tel:0242960047"
            className="hidden md:block"
            style={{
              fontSize: "11px", fontWeight: 500, fontFamily: "var(--font-sans)", letterSpacing: "0.06em",
              color: scrolled ? "#7a7265" : "rgba(255,255,255,0.75)",
              transition: "color 0.3s",
            }}
          >
            02 4296 0047
          </a>

          {/* Centre — logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
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

          {/* Right — enquire (desktop) / hamburger (mobile) */}
          <Link
            href="/contact"
            className="hidden md:block"
            style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", borderBottom: "2px solid #5BC2E7", paddingBottom: "2px",
              color: textColor, transition: "color 0.3s",
            }}
          >
            Enquire Now
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }} aria-label="Menu">
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "2px", backgroundColor: hamburgerColor, transition: "background-color 0.3s" }} />
              <span style={{ display: "block", height: "2px", backgroundColor: hamburgerColor, transition: "background-color 0.3s" }} />
              <span style={{ display: "block", height: "2px", backgroundColor: hamburgerColor, transition: "background-color 0.3s" }} />
            </div>
          </button>
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
