import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0D1F2D", fontFamily: "var(--font-sans)" }}>
      {/* Top strip */}
      <div style={{ borderBottom: "2px solid #5BC2E7" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px", display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between", alignItems: "flex-start" }}>

          {/* Brand */}
          <div style={{ maxWidth: "280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "36px", height: "36px", backgroundColor: "#5BC2E7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#0D1F2D", fontSize: "14px", fontWeight: 800 }}>S</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1 }}>Spinelli</p>
                <p style={{ fontSize: "9px", color: "#5BC2E7", letterSpacing: "0.22em", textTransform: "uppercase", lineHeight: 1.4 }}>Commercial</p>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
              Illawarra&apos;s dedicated commercial real estate specialists — Wollongong, Kiama, Shellharbour and surrounds.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Navigate</p>
            {[{ label: "Listings", href: "/" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "10px", letterSpacing: "0.02em" }}>
                {l.label}
              </Link>
            ))}
            <a href="https://www.spinellirealestate.com.au" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "13px", color: "#5BC2E7", marginTop: "16px", letterSpacing: "0.02em" }}>
              ← Main Website
            </a>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>Contact</p>
            <a href="tel:0242960047" style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>02 4296 0047</a>
            <a href="mailto:adam@spinellire.com" style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>adam@spinellire.com</a>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginTop: "16px" }}>16 College Avenue<br />Shellharbour City Centre NSW</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between" }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>© {new Date().getFullYear()} Spinelli Real Estate. All rights reserved. Licence 10052726</p>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>commercial.spinellirealestate.com.au</p>
      </div>
    </footer>
  );
}
