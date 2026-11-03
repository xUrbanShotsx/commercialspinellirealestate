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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "none"; el.style.boxShadow = "none"; }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "200px", backgroundColor: "#1A3348", overflow: "hidden" }}>
          <Image src={p.image} alt={p.address} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,31,45,0.6) 0%, transparent 50%)" }} />
          {/* Type badge */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            backgroundColor: isLease ? "#0D1F2D" : "#5BC2E7",
            color: isLease ? "#5BC2E7" : "#0D1F2D",
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", padding: "6px 12px",
            fontFamily: "var(--font-sans)",
          }}>
            {isLease ? "For Lease" : "For Sale"}
          </div>
          {p.tag && (
            <div style={{
              position: "absolute", bottom: "12px", left: "12px",
              backgroundColor: "rgba(13,31,45,0.9)",
              color: "#ffffff", fontSize: "9px", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "4px 10px", fontFamily: "var(--font-sans)",
              border: "1px solid rgba(91,194,231,0.3)",
            }}>
              {p.tag}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "20px 20px 24px" }}>
          <p style={{ fontSize: "10px", color: "#5BC2E7", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: "6px", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
            {p.suburb}
          </p>
          <h3 style={{ fontSize: "15px", fontWeight: 400, color: "#0D1F2D", marginBottom: "10px", fontFamily: "var(--font-display)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
            {p.address}
          </h3>
          <p style={{ fontSize: "17px", fontWeight: 700, color: "#0D1F2D", fontFamily: "var(--font-sans)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
            {p.price}
          </p>
          {(p.buildingSize || p.landSize) && (
            <div style={{ display: "flex", gap: "16px", paddingTop: "12px", borderTop: "1px solid #F0EDE8" }}>
              {p.buildingSize && (
                <div>
                  <p style={{ fontSize: "9px", color: "#a2b0aa", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>Building</p>
                  <p style={{ fontSize: "12px", fontWeight: 500, color: "#58503C", fontFamily: "var(--font-sans)" }}>{p.buildingSize}</p>
                </div>
              )}
              {p.landSize && (
                <div>
                  <p style={{ fontSize: "9px", color: "#a2b0aa", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>Land</p>
                  <p style={{ fontSize: "12px", fontWeight: 500, color: "#58503C", fontFamily: "var(--font-sans)" }}>{p.landSize}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
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
    // show empty state
  }

  const totalCount = saleListings.length + leaseListings.length;

  return (
    <>
      {/* Full-bleed hero */}
      <section style={{ position: "relative", minHeight: "520px", display: "flex", alignItems: "flex-end", backgroundColor: "#0D1F2D", overflow: "hidden" }}>
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 40%", opacity: 0.35 }}
        />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,31,45,0.95) 40%, rgba(13,31,45,0.5) 100%)" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7" }} />
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>
              Spinelli Commercial
            </p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "24px", maxWidth: "16ch" }}>
            Illawarra Commercial Property
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)", maxWidth: "48ch", lineHeight: 1.75, marginBottom: "36px" }}>
            Buy, lease or sell commercial real estate across Wollongong, Kiama, Shellharbour and the South Coast with Illawarra&apos;s dedicated commercial team.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#5BC2E7", color: "#0D1F2D", padding: "14px 28px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              Enquire Now
            </Link>
            <a href="tel:0242960047" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", padding: "14px 28px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              02 4296 0047
            </a>
          </div>
        </div>

        {/* Count badge */}
        {totalCount > 0 && (
          <div style={{ position: "absolute", bottom: 0, right: 0, zIndex: 2, backgroundColor: "#5BC2E7", padding: "16px 28px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0D1F2D", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>Active</p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#0D1F2D", fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: 1 }}>{totalCount} <span style={{ fontSize: "12px", fontWeight: 500 }}>Listings</span></p>
          </div>
        )}
      </section>

      {/* Listings */}
      <section style={{ backgroundColor: "#F5F4F0", padding: "64px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

          {totalCount === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", borderTop: "2px solid #0D1F2D" }}>
              <p style={{ fontSize: "15px", color: "#a2b0aa", fontFamily: "var(--font-sans)" }}>
                No commercial listings currently available. <Link href="/contact" style={{ color: "#5BC2E7", fontWeight: 500 }}>Contact us</Link> to discuss your requirements.
              </p>
            </div>
          ) : (
            <>
              {saleListings.length > 0 && (
                <div style={{ marginBottom: "64px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "28px", paddingBottom: "16px", borderBottom: "2px solid #0D1F2D" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em" }}>For Sale</h2>
                      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>{saleListings.length} Properties</span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", backgroundColor: "#E8E5DF" }}>
                    {saleListings.map((p) => <PropCard key={p.id} p={p} />)}
                  </div>
                </div>
              )}

              {leaseListings.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "28px", paddingBottom: "16px", borderBottom: "2px solid #0D1F2D" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em" }}>For Lease</h2>
                      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>{leaseListings.length} Properties</span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", backgroundColor: "#E8E5DF" }}>
                    {leaseListings.map((p) => <PropCard key={p.id} p={p} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ backgroundColor: "#0D1F2D", borderTop: "2px solid #5BC2E7", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>
              Spinelli Commercial
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em", maxWidth: "24ch" }}>
              Looking for something specific? Our team can help.
            </h2>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#5BC2E7", color: "#0D1F2D", padding: "14px 28px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              Get in Touch
            </Link>
            <Link href="/about" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)", padding: "14px 28px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
