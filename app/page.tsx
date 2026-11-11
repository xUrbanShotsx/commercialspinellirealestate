import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchAllListings, mapListing } from "@/lib/agentbox";
import type { Property } from "@/lib/types";
import Reveal from "./components/Reveal";
import HeroVideo from "./components/HeroVideo";
import HeroChat from "./components/HeroChat";
import FeaturedCard from "./components/FeaturedCard";
import { FAKE_LISTINGS } from "./listings/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Commercial Listings — Spinelli Commercial",
};

function PropCard({ p }: { p: Property }) {
  const href = `https://www.spinellirealestate.com.au/property/${p.id}`;
  const isLease = p.type === "commercial-lease";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "block" }}>
      <div style={{ position: "relative", height: 240, background: "#1d4a58", overflow: "hidden" }}>
        <Image
          src={p.image}
          alt={p.address}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <div style={{
          position: "absolute", top: 16, left: 16,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#fff", background: "rgba(30,74,88,0.75)", padding: "5px 10px",
          border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999,
        }}>
          {isLease ? "For Lease" : "For Sale"}
        </div>
      </div>
      <div style={{ paddingTop: 20, paddingBottom: 32, borderBottom: "1px solid var(--line-light)" }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>{p.suburb}</p>
        <h3 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10 }}>{p.address}</h3>
        <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>{p.price}</p>
        {(p.buildingSize || p.landSize) && (
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "var(--grey)" }}>
            {p.buildingSize && <span>Building {p.buildingSize}</span>}
            {p.landSize && <span>Land {p.landSize}</span>}
          </div>
        )}
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
    // show empty state
  }

  const totalCount = saleListings.length + leaseListings.length;

  return (
    <>
      {/* HERO */}
      <section className="hero dark" style={{ position: "relative", overflow: "hidden" }}>
        <HeroVideo />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)", zIndex: 1 }} />
        <div className="hero__grid" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2 }} />
        <HeroChat />
      </section>

      {/* STATEMENT */}
      <section className="section light">
        <div className="wrap statement">
          <Reveal as="p" className="eyebrow">Our approach</Reveal>
          <Reveal as="p" className="statement__text">
            Commercial real estate, done properly. We work with business owners, investors and landlords across Wollongong, Kiama and Shellharbour — bringing local knowledge and a relentless focus on results.
          </Reveal>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{ background: "#1d4a58", padding: "clamp(60px,8vw,120px) 0 clamp(80px,14vw,160px)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px,2vw,24px)",
          padding: "0 clamp(20px,4vw,56px) clamp(20px,4vw,56px)",
        }} className="listings-grid">
          {FAKE_LISTINGS.slice(0, 3).map((p, i) => (
            <FeaturedCard
              key={p.id}
              id={p.id}
              image={p.image}
              address={p.address}
              suburb={p.suburb}
              price={p.price}
              type={p.type}
              delay={i * 80}
            />
          ))}
        </div>
      </section>

      {/* LISTINGS */}
      <section className="section dark">
        <div className="wrap">
          {totalCount === 0 ? (
            <>
              <div className="section__head">
                <Reveal as="h2" className="h2">Available<br />properties</Reveal>
              </div>
              <Reveal>
                <p style={{ opacity: 0.6 }}>
                  No commercial listings currently available.{" "}
                  <Link href="/contact" className="link">Contact us</Link> to discuss your requirements.
                </p>
              </Reveal>
            </>
          ) : (
            <>
              {saleListings.length > 0 && (
                <div style={{ marginBottom: "clamp(60px,8vw,120px)" }}>
                  <div className="section__head">
                    <Reveal as="h2" className="h2">For<br />Sale</Reveal>
                    <span className="eyebrow">{saleListings.length} {saleListings.length === 1 ? "property" : "properties"}</span>
                  </div>
                  <div className="prop-cards">
                    {saleListings.map((p, i) => (
                      <Reveal key={p.id} delay={i * 50}>
                        <PropCard p={p} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
              {leaseListings.length > 0 && (
                <div>
                  <div className="section__head">
                    <Reveal as="h2" className="h2">For<br />Lease</Reveal>
                    <span className="eyebrow">{leaseListings.length} {leaseListings.length === 1 ? "property" : "properties"}</span>
                  </div>
                  <div className="prop-cards">
                    {leaseListings.map((p, i) => (
                      <Reveal key={p.id} delay={i * 50}>
                        <PropCard p={p} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee dark" aria-hidden="true">
        <div className="marquee__track">
          {["Wollongong", "Kiama", "Shellharbour", "South Coast", "Wollongong", "Kiama", "Shellharbour", "South Coast"].map((w, i) => (
            <span key={i}>
              {w}
              <i>✱</i>
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta light">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Work with us</Reveal>
          <Reveal as="h2" className="cta__title">
            Looking for<br />something<br />specific?
          </Reveal>
          <Reveal>
            <Link href="/contact" className="btn btn--dark">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
