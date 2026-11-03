import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Spinelli Commercial",
};

const services = [
  { num: "01", title: "Commercial Sales", body: "We represent vendors and purchasers across retail, office, industrial and development sites — delivering transparent, results-driven sales processes from day one." },
  { num: "02", title: "Commercial Leasing", body: "Whether you're a landlord seeking quality tenants or a business finding the right space, our leasing team handles negotiations, documentation and handover." },
  { num: "03", title: "Investment Advisory", body: "We help investors identify, assess and acquire commercial assets in the Illawarra — with market intelligence that goes beyond the listing." },
  { num: "04", title: "Market Appraisals", body: "Thinking of selling or leasing? Our no-obligation appraisals give you a clear picture of your property's current market value and potential." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "flex-end", backgroundColor: "#0D1F2D", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 50%", opacity: 0.25 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,31,45,0.98) 35%, rgba(13,31,45,0.5))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7" }} />
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>About Us</p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1, maxWidth: "20ch" }}>
            Commercial Real Estate, Done Properly
          </h1>
        </div>
      </section>

      {/* Who we are */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gap: "80px", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>Who We Are</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em", marginBottom: "28px" }}>
              The Illawarra&apos;s Dedicated Commercial Arm
            </h2>
            <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7", marginBottom: "28px" }} />
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.85, marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
              Spinelli Commercial is the dedicated commercial division of Spinelli Real Estate — the Illawarra&apos;s most trusted boutique agency. We bring the same values that have driven our residential success to the commercial market: local knowledge, honest advice, and a relentless focus on results.
            </p>
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.85, marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
              Our commercial specialists understand that business property decisions carry real financial weight. We take that seriously — providing thorough market analysis, direct access to our senior agents, and a transaction experience that keeps you informed at every step.
            </p>
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.85, fontFamily: "var(--font-sans)" }}>
              From retail tenancies and office suites to industrial facilities and development sites, we cover the full spectrum of commercial property across Wollongong, Kiama, Shellharbour and the wider South Coast.
            </p>
          </div>

          {/* Stats */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "#E8E5DF", border: "1px solid #E8E5DF", marginBottom: "32px" }}>
              {[
                { num: "20+", label: "Years in the Illawarra" },
                { num: "100%", label: "Locally owned" },
                { num: "1:1", label: "Direct senior agent access" },
                { num: "Free", label: "Market appraisals" },
              ].map((s) => (
                <div key={s.label} style={{ backgroundColor: "#ffffff", padding: "32px 24px" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.04em", margin: "0 0 6px", lineHeight: 1 }}>{s.num}</p>
                  <div style={{ width: "24px", height: "2px", backgroundColor: "#5BC2E7", marginBottom: "10px" }} />
                  <p style={{ fontSize: "12px", color: "#a2b0aa", fontFamily: "var(--font-sans)", lineHeight: 1.4, letterSpacing: "0.02em" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              style={{ display: "block", backgroundColor: "#0D1F2D", color: "#ffffff", padding: "18px 28px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)", textAlign: "center" }}
            >
              Talk to Our Team →
            </Link>
          </div>
        </div>
      </section>

      {/* Services — editorial list */}
      <section style={{ backgroundColor: "#F5F4F0", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "2px solid #0D1F2D", marginBottom: "0" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em" }}>Our Services</h2>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>What We Do</p>
          </div>

          {services.map((s, i) => (
            <div
              key={s.num}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 2fr",
                gap: "32px",
                padding: "36px 0",
                borderBottom: i < services.length - 1 ? "1px solid #E8E5DF" : "none",
                alignItems: "start",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.5 }}>{s.num}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.02em", paddingTop: "4px" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: "#7a7265", lineHeight: 1.85, fontFamily: "var(--font-sans)", paddingTop: "4px" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D1F2D", borderTop: "2px solid #5BC2E7", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>Ready to start</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em" }}>
              Talk to our commercial team today.
            </h2>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#5BC2E7", color: "#0D1F2D", padding: "14px 28px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              Contact Us
            </Link>
            <a href="tel:0242960047" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)", padding: "14px 28px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              02 4296 0047
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
