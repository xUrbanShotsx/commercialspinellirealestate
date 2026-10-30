import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0D3348", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "48px" }}>

          {/* Brand */}
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.06em", marginBottom: "4px" }}>SPINELLI COMMERCIAL</p>
            <p style={{ fontSize: "11px", color: "#5BC2E7", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>Illawarra Commercial Specialists</p>
            <p style={{ fontSize: "13px", lineHeight: 1.8 }}>16 College Avenue<br />Shellharbour City Centre NSW</p>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>Navigate</p>
            {[{ label: "Listings", href: "/" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map((l) => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "10px", transition: "color 0.2s" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>Contact</p>
            <a href="tel:0242960047" style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "10px" }}>02 4296 0047</a>
            <a href="mailto:adam@spinellire.com" style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "10px" }}>adam@spinellire.com</a>
            <a href="https://www.spinellirealestate.com.au" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "13px", color: "#5BC2E7", marginTop: "16px" }}>
              ← Back to main site
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "11px" }}>© {new Date().getFullYear()} Spinelli Real Estate. All rights reserved.</p>
          <p style={{ fontSize: "11px" }}>Licence 10052726</p>
        </div>
      </div>
    </footer>
  );
}
