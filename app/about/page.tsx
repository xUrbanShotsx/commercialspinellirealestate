import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Spinelli Commercial",
  description: "Spinelli Commercial — Illawarra's dedicated commercial real estate specialists. Local knowledge, genuine expertise, exceptional results.",
};

const services = [
  { title: "Commercial Sales", body: "We represent vendors and purchasers across retail, office, industrial and development sites — delivering transparent, informed sales processes from day one." },
  { title: "Commercial Leasing", body: "Whether you're a landlord seeking quality tenants or a business finding the right space, our leasing team handles negotiations, documentation and handover." },
  { title: "Investment Advisory", body: "We help investors identify, assess and acquire commercial assets in the Illawarra — with market intelligence that goes beyond the listing." },
  { title: "Market Appraisals", body: "Thinking of selling or leasing? Our no-obligation appraisals give you a clear picture of your property's current market value and potential." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0D3348", paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p className="label-tag" style={{ color: "rgba(255,255,255,0.4)" }}>About Us</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "18ch" }}>
            Illawarra&apos;s Commercial Property Specialists
          </h1>
        </div>
      </section>

      {/* Who we are */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gap: "64px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "start" }}>
          <div>
            <p className="label-tag">Who We Are</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "#0D3348", letterSpacing: "-0.03em", marginBottom: "24px" }}>
              Commercial Real Estate,<br />Done Properly
            </h2>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#5BC2E7", marginBottom: "24px" }} />
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.85, marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
              Spinelli Commercial is the dedicated commercial arm of Spinelli Real Estate — the Illawarra&apos;s most trusted boutique agency. We bring the same values that have driven our residential success to the commercial market: local knowledge, honest advice, and a relentless focus on results.
            </p>
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.85, marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
              Our commercial specialists understand that business property decisions carry real financial weight. We take that seriously — providing thorough market analysis, direct access to our senior agents, and a transaction experience that keeps you informed at every step.
            </p>
            <p style={{ fontSize: "15px", color: "#7a7265", lineHeight: 1.85, fontFamily: "var(--font-sans)" }}>
              From retail tenancies and office suites to industrial facilities and development sites, we cover the full spectrum of commercial property across Wollongong, Kiama, Shellharbour and the wider South Coast.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "#E8E5DF", border: "1px solid #E8E5DF" }}>
            {[
              { num: "20+", label: "Years in the Illawarra" },
              { num: "100%", label: "Local ownership" },
              { num: "$", label: "No hidden fees" },
              { num: "1:1", label: "Direct agent access" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "#ffffff", padding: "32px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.03em", margin: "0 0 8px" }}>{s.num}</p>
                <p style={{ fontSize: "12px", color: "#a2b0aa", fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="label-tag">Our Services</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "#0D3348", letterSpacing: "-0.03em", marginBottom: "48px" }}>
            What We Do
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", backgroundColor: "#E8E5DF", border: "1px solid #E8E5DF" }}>
            {services.map((s, i) => (
              <div key={s.title} style={{ backgroundColor: "#ffffff", padding: "36px 32px" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", color: "#5BC2E7", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>0{i + 1}</p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 300, color: "#0D3348", letterSpacing: "-0.02em", marginBottom: "16px" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "#7a7265", lineHeight: 1.8, fontFamily: "var(--font-sans)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D3348", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em", margin: "0 0 12px" }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)" }}>Talk to our commercial team today — no obligation.</p>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#5BC2E7", color: "#ffffff", padding: "14px 28px", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              Contact Us
            </Link>
            <a href="tel:0242960047" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", padding: "14px 28px", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              02 4296 0047
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
