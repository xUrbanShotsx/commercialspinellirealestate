import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchAllListings, mapListing } from "@/lib/agentbox";
import type { Property } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Commercial Listings | Spinelli Commercial",
};

function PropCard({ p }: { p: Property }) {
  const href = `https://www.spinellirealestate.com.au/property/${p.id}`;
  const isLease = p.type === "commercial-lease";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #E8E5DF", backgroundColor: "#fff", transition: "box-shadow 0.2s", overflow: "hidden" }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)")}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "220px", backgroundColor: "#E8F6FC", overflow: "hidden" }}>
          <Image src={p.image} alt={p.address} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            backgroundColor: isLease ? "#0D3348" : "#5BC2E7",
            color: "#fff", fontSize: "9px", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "4px 10px", fontFamily: "var(--font-sans)",
          }}>
            {isLease ? "For Lease" : "For Sale"}
          </div>
          {p.tag && p.tag !== "For Sale" && p.tag !== "For Lease" && (
            <div style={{
              position: "absolute", top: "12px", right: "12px",
              backgroundColor: "rgba(13,51,72,0.85)",
              color: "#fff", fontSize: "9px", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "4px 10px", fontFamily: "var(--font-sans)",
            }}>
              {p.tag}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "20px" }}>
          <p style={{ fontSize: "11px", color: "#a2b0aa", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>
            {p.suburb}
          </p>
          <p style={{ fontSize: "15px", fontWeight: 500, color: "#0D3348", marginBottom: "8px", fontFamily: "var(--font-sans)", lineHeight: 1.3 }}>
            {p.address}
          </p>
          <p style={{ fontSize: "16px", fontWeight: 600, color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>
            {p.price}
          </p>
          {(p.buildingSize || p.landSize) && (
            <p style={{ fontSize: "12px", color: "#7a7265", fontFamily: "var(--font-sans)" }}>
              {p.buildingSize && `${p.buildingSize} building`}
              {p.buildingSize && p.landSize && " · "}
              {p.landSize && `${p.landSize} land`}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default async function HomePage() {
  let saleListings: Property[] = [];
  let leaseListings: Property[] = [];

  try {
    const [saleRaw, leaseRaw] = await Promise.all([
      fetchAllListings({ "filter[type]": "Sale", "filter[status]": "Available", "filter[property.type]": "Commercial", "sort[listedDate]": "desc" }, 3600),
      fetchAllListings({ "filter[type]": "Lease", "filter[status]": "Available", "filter[property.type]": "Commercial", "sort[listedDate]": "desc" }, 3600),
    ]);
    saleListings = saleRaw.map(mapListing);
    leaseListings = leaseRaw.map(mapListing);
  } catch {
    // fallback: show empty state
  }

  const allListings = [...saleListings, ...leaseListings];

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0D3348", paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5BC2E7", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
            Illawarra Commercial Property
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "20px" }}>
            Buy · Lease · Sell<br />Commercial Property
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-sans)", maxWidth: "52ch", lineHeight: 1.8 }}>
            Spinelli Commercial connects businesses and investors with the right commercial spaces across Wollongong, Kiama, Shellharbour and the wider Illawarra.
          </p>
        </div>
      </section>

      {/* Listings */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

          {allListings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: "15px", color: "#a2b0aa", fontFamily: "var(--font-sans)" }}>No commercial listings currently available. Check back soon or <Link href="/contact" style={{ color: "#5BC2E7" }}>contact us</Link>.</p>
            </div>
          ) : (
            <>
              {saleListings.length > 0 && (
                <div style={{ marginBottom: "56px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "28px", borderBottom: "1px solid #E8E5DF", paddingBottom: "16px" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, color: "#0D3348", letterSpacing: "-0.02em" }}>For Sale</h2>
                    <span style={{ fontSize: "12px", color: "#a2b0aa", fontFamily: "var(--font-sans)" }}>{saleListings.length} {saleListings.length === 1 ? "property" : "properties"}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                    {saleListings.map((p) => <PropCard key={p.id} p={p} />)}
                  </div>
                </div>
              )}

              {leaseListings.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "28px", borderBottom: "1px solid #E8E5DF", paddingBottom: "16px" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, color: "#0D3348", letterSpacing: "-0.02em" }}>For Lease</h2>
                    <span style={{ fontSize: "12px", color: "#a2b0aa", fontFamily: "var(--font-sans)" }}>{leaseListings.length} {leaseListings.length === 1 ? "property" : "properties"}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                    {leaseListings.map((p) => <PropCard key={p.id} p={p} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ backgroundColor: "#5BC2E7", padding: "56px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em", margin: 0 }}>
              Looking for something specific?
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginTop: "8px", fontFamily: "var(--font-sans)" }}>
              Our commercial team will find the right property for your business.
            </p>
          </div>
          <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#0D3348", color: "#ffffff", padding: "14px 28px", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)", textDecoration: "none" }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
