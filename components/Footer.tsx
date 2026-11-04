import Link from "next/link";
import Image from "next/image";
import FooterSocials from "./FooterSocials";

const NAV = [
  { label: "Listings", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#ffffff", fontFamily: "var(--font-sans)", borderTop: "1px solid #E8E5DF" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Main row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "32px" }}>

          {/* Logo */}
          <Image
            src="/logo.webp"
            alt="Spinelli Commercial"
            width={200}
            height={56}
            style={{ height: "56px", width: "auto", objectFit: "contain", filter: "invert(1)" }}
          />

          {/* Nav links */}
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "13px", color: "#7a7265", textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact + socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <a href="tel:0242960047" style={{ fontSize: "13px", color: "#7a7265", textDecoration: "none" }}>02 4296 0047</a>
            <a href="mailto:adam@spinellire.com" style={{ fontSize: "13px", color: "#7a7265", textDecoration: "none" }}>adam@spinellire.com</a>
            <FooterSocials />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #E8E5DF", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <p style={{ fontSize: "11px", color: "#a2b0aa", letterSpacing: "0.02em" }}>
            © {new Date().getFullYear()} Spinelli Real Estate. Licensed Real Estate Agent NSW.
          </p>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a href="/privacy" style={{ fontSize: "11px", color: "#a2b0aa", textDecoration: "none" }}>Privacy Policy</a>
            <a href="/disclaimer" style={{ fontSize: "11px", color: "#a2b0aa", textDecoration: "none" }}>Disclaimer</a>
            <a href="https://www.sanjstudio.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "#a2b0aa", textDecoration: "none" }}>Website by SanjStudio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
