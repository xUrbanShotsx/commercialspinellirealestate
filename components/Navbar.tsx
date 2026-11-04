"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  const logoSquareBg = scrolled ? "#0D1F2D" : "rgba(255,255,255,0.15)";
  const logoSquareBorder = scrolled ? "none" : "1px solid rgba(255,255,255,0.4)";
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
          backgroundColor: "#0D1F2D",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          maxHeight: scrolled ? "0" : "36px",
          transition: "max-height 0.3s ease",
        }}
      >
        <p style={{ fontSize: "11px", color: "#5BC2E7", fontFamily: "var(--font-sans)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
          Illawarra&apos;s Commercial Property Specialists &nbsp;·&nbsp;
          <a href="tel:0242960047" style={{ color: "#5BC2E7" }}>02 4296 0047</a>
        </p>
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px" }}>

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
          <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "30px", height: "30px",
                backgroundColor: logoSquareBg,
                border: logoSquareBorder,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background-color 0.3s, border 0.3s",
              }}>
                <span style={{ color: "#5BC2E7", fontSize: "13px", fontWeight: 800, fontFamily: "var(--font-sans)" }}>S</span>
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: textColor, letterSpacing: "0.1em", fontFamily: "var(--font-sans)", lineHeight: 1, textTransform: "uppercase", transition: "color 0.3s" }}>Spinelli</p>
                <p style={{ margin: 0, fontSize: "8px", fontWeight: 600, color: "#5BC2E7", letterSpacing: "0.26em", textTransform: "uppercase", fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>Commercial</p>
              </div>
            </div>
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

        {/* Divider + Nav row — hidden on scroll */}
        <div style={{
          overflow: "hidden",
          maxHeight: scrolled ? "0" : "90px",
          transition: "max-height 0.3s ease",
        }}>
          <div style={{ borderTop: `2px solid ${scrolled ? "#0D1F2D" : "rgba(255,255,255,0.3)"}` }} />
          <div className="hidden md:flex" style={{ justifyContent: "center", alignItems: "center", borderBottom: `2px solid ${scrolled ? "#0D1F2D" : "rgba(255,255,255,0.3)"}` }}>
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
