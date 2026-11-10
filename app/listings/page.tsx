import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllListings, mapListing } from "@/lib/agentbox";
import type { Property } from "@/lib/types";
import Reveal from "../components/Reveal";
import ListingCard from "./ListingCard";
import { FAKE_LISTINGS } from "./data";

export const metadata: Metadata = { title: "Listings — Spinelli Commercial" };
export const revalidate = 3600;

export default async function ListingsPage() {
  let listings: Property[] = [];

  try {
    const raw = await fetchAllListings({
      "filter[status]": "Available",
      "sort[listedDate]": "desc",
    }, 3600);
    listings = raw.map(mapListing);
  } catch {
    // fall through to fake listings
  }

  if (listings.length === 0) listings = FAKE_LISTINGS;

  return (
    <>
      {/* HERO */}
      <section className="page-hero dark" style={{ background: "#000" }}>
        <div className="wrap">
          <Reveal as="p" className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
            Current listings
          </Reveal>
          <Reveal as="h1" className="page-hero__title" delay={60} style={{ color: "#fff" }}>
            Available<br />properties.
          </Reveal>
          {listings.length > 0 && (
            <Reveal delay={120}>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12, letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.4)", marginTop: 32,
              }}>
                {listings.length} {listings.length === 1 ? "property" : "properties"} available
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* LISTINGS GRID */}
      <section className="section light" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(32px,4vw,60px) clamp(12px,1.5vw,24px)",
          }} className="listings-grid">
            {listings.map((p, i) => {
              const group = Math.floor(i / 3);
              const pos   = i % 3;
              const isWide = group % 2 === 0 ? pos === 0 : pos === 2;
              return (
                <Reveal key={p.id} delay={Math.min((i % 3) * 70, 140)}
                  style={{ gridColumn: isWide ? "span 2" : "span 1" }}>
                  <ListingCard p={p} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section dark" style={{ background: "#000" }}>
        <div className="wrap">
          <Reveal as="p" className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
            Off-market
          </Reveal>
          <Reveal as="h2" delay={60} style={{
            fontSize: "clamp(40px,8vw,120px)",
            fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.92,
            color: "#fff", marginBottom: 48,
          }}>
            Not everything<br />is advertised.
          </Reveal>
          <Reveal delay={120}>
            <p style={{ maxWidth: 480, opacity: 0.6, color: "#fff", marginBottom: 40, lineHeight: 1.6 }}>
              Our commercial buyer and tenant network gets early access to properties
              before they reach the open market. Tell us your brief.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link href="/contact" className="btn btn--light">
              Register your brief <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
