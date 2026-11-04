import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources | Spinelli Commercial",
};

const RESOURCES = [
  {
    num: "01",
    tag: "Leasing Guide",
    title: "The Commercial Tenant's Guide to Leasing in NSW",
    summary:
      "Understanding your rights and obligations before signing a commercial lease is critical. This guide covers lease types, make-good clauses, rent reviews, outgoings, and what to negotiate before you commit.",
    topics: ["Gross vs net leases", "Outgoings & who pays", "Rent review mechanisms", "Make-good obligations", "Break clauses & assignments"],
  },
  {
    num: "02",
    tag: "Buyer's Checklist",
    title: "Due Diligence Checklist for Commercial Property",
    summary:
      "Commercial property purchases carry more complexity than residential. Before exchanging contracts, there are financial, legal, structural and tenancy matters that must be investigated thoroughly.",
    topics: ["Zoning & permitted use", "Existing lease review", "WALE & vacancy risk", "Environmental & contamination searches", "Outgoings reconciliation"],
  },
  {
    num: "03",
    tag: "Investment",
    title: "Understanding Commercial Yields — Gross, Net & Passing",
    summary:
      "Yield is the primary metric commercial investors use to compare assets. But gross yield, net yield and passing yield each tell a different story — knowing the difference can mean the difference between a sound investment and a costly mistake.",
    topics: ["Gross vs net yield explained", "Passing yield vs market yield", "Cap rates & valuation", "Impact of vacancy on returns", "How to benchmark against the market"],
  },
  {
    num: "04",
    tag: "Planning & Zoning",
    title: "NSW Commercial Zoning: What It Means for Your Property",
    summary:
      "NSW uses the Standard Instrument LEP to classify land use. The zone your property sits in determines what can legally operate from it — which directly affects tenant demand, lease income and capital value.",
    topics: ["E1–E4 employment zones", "MU1 mixed use explained", "Permitted vs permissible with consent", "How zoning affects value", "DA requirements for change of use"],
  },
  {
    num: "05",
    tag: "Market Insight",
    title: "Illawarra Commercial Market: What's Driving Demand in 2025",
    summary:
      "Population growth, the Shellharbour City Centre expansion, and infrastructure investment along the Princes Highway corridor are reshaping the Illawarra's commercial landscape. Here's what buyers, tenants and vendors need to know.",
    topics: ["Shellharbour City Centre precinct", "Industrial land supply squeeze", "Retail vacancy trends", "Owner-occupier demand vs investment", "What to expect in the next 12 months"],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "flex-end", backgroundColor: "#0D1F2D", overflow: "hidden" }}>
        <Image src="/hero.webp" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center 60%", opacity: 0.3 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,31,45,0.98) 35%, rgba(13,31,45,0.5))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "80px 40px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7" }} />
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>Resources</p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1, maxWidth: "18ch" }}>
            Commercial Property Resources
          </h1>
        </div>
      </section>

      <section style={{ backgroundColor: "#F5F4F0", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Intro */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: "20px", borderBottom: "2px solid #0D1F2D", marginBottom: "0" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.02em" }}>
              Guides & Insights
            </h2>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>
              {RESOURCES.length} Resources
            </p>
          </div>

          {/* Resource list */}
          {RESOURCES.map((r, i) => (
            <div
              key={r.num}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: "0 40px",
                padding: "48px 0",
                borderBottom: i < RESOURCES.length - 1 ? "1px solid #E8E5DF" : "none",
              }}
            >
              {/* Number */}
              <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300, color: "#5BC2E7", letterSpacing: "-0.04em", lineHeight: 1, opacity: 0.5, paddingTop: "4px" }}>
                {r.num}
              </span>

              {/* Content */}
              <div>
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>
                  {r.tag}
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "16px" }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#7a7265", lineHeight: 1.85, fontFamily: "var(--font-sans)", maxWidth: "680px", marginBottom: "24px" }}>
                  {r.summary}
                </p>

                {/* Topics */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {r.topics.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em",
                        fontFamily: "var(--font-sans)", color: "#0D1F2D",
                        backgroundColor: "#ffffff", border: "1px solid #E8E5DF",
                        padding: "5px 12px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D1F2D", borderTop: "2px solid #5BC2E7", padding: "64px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>
              Spinelli Commercial
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em", maxWidth: "28ch" }}>
              Have a question? Our team is happy to walk you through any of these topics.
            </h2>
          </div>
          <Link
            href="/contact"
            style={{ display: "inline-block", backgroundColor: "#5BC2E7", color: "#0D1F2D", padding: "14px 28px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)", textDecoration: "none" }}
          >
            Talk to Us
          </Link>
        </div>
      </section>
    </>
  );
}
