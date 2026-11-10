import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAKE_LISTINGS, getListingById } from "../data";
import Reveal from "../../components/Reveal";
import EnquiryForm from "./EnquiryForm";
import PhotoGallery from "./PhotoGallery";
import ActionLinks from "./ActionLinks";

export async function generateStaticParams() {
  return FAKE_LISTINGS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getListingById(id);
  if (!p) return { title: "Property Not Found" };
  return {
    title: `${p.address}, ${p.suburb} — Spinelli Commercial`,
    description: p.description,
  };
}

const TYPE_LABEL: Record<string, string> = {
  "commercial-sale": "For Sale",
  "commercial-lease": "For Lease",
  "business": "Business",
  "residential-sale": "For Sale",
  "residential-rent": "For Rent",
  "project": "Project",
};

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getListingById(id);
  if (!p) notFound();

  const paragraphs = p.longDescription?.split("\n\n") ?? [p.description];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        position: "relative", height: "100svh", minHeight: 600,
        overflow: "hidden", background: "#000",
      }}>
        <Image src={p.image} alt={p.address} fill priority sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.88 }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", top: 32, left: "var(--gutter)" }}>
          <Link href="/listings" style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>← All listings</Link>
        </div>
      </section>

      {/* ── INFO PANEL ───────────────────────────────────────────── */}
      <section style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="wrap property-info-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr clamp(300px,36vw,520px)",
          gap: 0, alignItems: "start",
        }}>

          {/* LEFT */}
          <div style={{
            padding: "clamp(48px,6vw,96px) clamp(32px,4vw,72px) clamp(48px,6vw,96px) 0",
            borderRight: "1px solid rgba(0,0,0,0.08)",
          }}>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(0,0,0,0.35)", marginBottom: 28,
                display: "flex", gap: 10, alignItems: "center",
              }}>
                <Link href="/listings" style={{ color: "inherit" }}>Listings</Link>
                <span style={{ opacity: 0.4 }}>›</span>
                <span>{p.suburb}</span>
              </p>
            </Reveal>

            <Reveal delay={30}>
              <h1 style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "clamp(28px,4vw,56px)",
                fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05,
                color: "#000", marginBottom: 28,
              }}>
                {p.address}<br />
                <span style={{ color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>
                  {p.suburb.toUpperCase()}&nbsp;NSW
                </span>
              </h1>
            </Reveal>

            {/* specs row */}
            <Reveal delay={50}>
              <div style={{ display: "flex", gap: "clamp(20px,3vw,40px)", flexWrap: "wrap", marginBottom: 20 }}>
                {p.buildingSize && (
                  <span style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#000",
                  }}>{p.buildingSize} Building</span>
                )}
                {p.landSize && (
                  <span style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#000",
                  }}>{p.landSize} Land</span>
                )}
              </div>
            </Reveal>

            <Reveal delay={60}>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11, letterSpacing: "0.1em",
                color: "rgba(0,0,0,0.5)", marginBottom: 48,
              }}>
                <span style={{ color: "#000", fontWeight: 600 }}>{TYPE_LABEL[p.type] ?? "Commercial"}</span>
                {p.price !== "Contact Agent" ? ` — ${p.price}` : " — Contact Agent"}
              </p>
            </Reveal>

            {p.openHome && (
              <Reveal delay={80}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 16,
                  padding: "14px 20px",
                  border: "1px solid rgba(0,0,0,0.15)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "rgba(0,0,0,0.4)",
                  }}>Inspection</span>
                  <span style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11, letterSpacing: "0.08em", color: "#000",
                  }}>{p.openHome}</span>
                </div>
              </Reveal>
            )}
          </div>

          {/* RIGHT */}
          <div style={{ padding: "clamp(48px,6vw,96px) 0 clamp(48px,6vw,96px) clamp(32px,4vw,72px)" }}>
            <Reveal>
              <ActionLinks />
            </Reveal>

            {p.agent && (
              <Reveal delay={60}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {/* agent 1 */}
                  <div>
                    <div style={{
                      aspectRatio: "3/4", background: "#111",
                      overflow: "hidden", marginBottom: 14, position: "relative",
                      filter: "grayscale(1)",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, #1a1a1a 0%, #000 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{
                          fontFamily: "var(--font-sans), sans-serif",
                          fontSize: "clamp(32px,5vw,52px)", fontWeight: 700,
                          color: "rgba(255,255,255,0.12)", letterSpacing: "-0.04em",
                        }}>{p.agent.split(" ").map(w => w[0]).join("")}</span>
                      </div>
                    </div>
                    <p style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "#000", fontWeight: 600, marginBottom: 4,
                    }}>{p.agent}</p>
                    {p.agentPhone && (
                      <a href={`tel:${p.agentPhone.replace(/\s/g, "")}`} style={{
                        display: "block",
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 10, letterSpacing: "0.06em",
                        color: "rgba(0,0,0,0.5)", marginBottom: 2,
                      }}>{p.agentPhone}</a>
                    )}
                    <a href={`mailto:jye@spinellire.com?subject=Enquiry: ${p.address}`} style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10, letterSpacing: "0.06em", color: "#000",
                      borderBottom: "1px solid rgba(0,0,0,0.3)", paddingBottom: 1,
                    }}>Email agent</a>
                  </div>

                  {/* agent 2 */}
                  <div>
                    <div style={{
                      aspectRatio: "3/4", background: "#111",
                      overflow: "hidden", marginBottom: 14, position: "relative",
                      filter: "grayscale(1)",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{
                          fontFamily: "var(--font-sans), sans-serif",
                          fontSize: "clamp(32px,5vw,52px)", fontWeight: 700,
                          color: "rgba(255,255,255,0.12)", letterSpacing: "-0.04em",
                        }}>SC</span>
                      </div>
                    </div>
                    <p style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "#000", fontWeight: 600, marginBottom: 4,
                    }}>Spinelli Commercial</p>
                    <a href="tel:0242232655" style={{
                      display: "block",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10, letterSpacing: "0.06em",
                      color: "rgba(0,0,0,0.5)", marginBottom: 2,
                    }}>02 4223 2655</a>
                    <a href={`mailto:commercial@spinellire.com?subject=Enquiry: ${p.address}`} style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10, letterSpacing: "0.06em", color: "#000",
                      borderBottom: "1px solid rgba(0,0,0,0.3)", paddingBottom: 1,
                    }}>Email agent</a>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── ABOUT THE PROPERTY ───────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(80px,10vw,160px) 0" }}>
        <div className="wrap property-desc-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr clamp(260px,32vw,480px)",
          gap: "clamp(48px,6vw,96px)", alignItems: "start",
        }}>
          <div>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(0,0,0,0.35)", marginBottom: 40,
              }}>About the property</p>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {paragraphs.map((para, i) => (
                <Reveal key={i} delay={i * 30}>
                  <p style={{
                    fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.75, color: "#000",
                    fontWeight: i === 0 ? 500 : 400, opacity: i === 0 ? 1 : 0.75,
                  }}>{para}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {p.photos && p.photos[1] && (
            <Reveal delay={80}>
              <div style={{
                position: "sticky", top: 120,
                aspectRatio: "3/4", overflow: "hidden", background: "#e8e8e8",
              }}>
                <Image src={p.photos[1]} alt={p.address} fill
                  sizes="(max-width: 768px) 100vw, 32vw"
                  style={{ objectFit: "cover" }} />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────── */}
      {p.photos && p.photos.length > 0 && (
        <section style={{ background: "#fff", padding: "clamp(60px,8vw,120px) 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="wrap">
            <Reveal>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(0,0,0,0.35)", marginBottom: 40,
              }}>Gallery</p>
            </Reveal>
            <PhotoGallery photos={[p.image, ...p.photos]} address={p.address} />
          </div>
        </section>
      )}

      {/* ── ENQUIRY ──────────────────────────────────────────────── */}
      <section id="enquire" style={{ background: "#fff", padding: "clamp(80px,10vw,140px) 0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="wrap property-enquiry-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(48px,8vw,120px)", alignItems: "start",
        }}>
          <div>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(0,0,0,0.35)", marginBottom: 32,
              }}>Enquire</p>
            </Reveal>
            <Reveal delay={40}>
              <h2 style={{
                fontSize: "clamp(36px,6vw,80px)",
                fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.92,
                color: "#000", marginBottom: 32,
              }}>Interested<br />in this<br />property?</h2>
            </Reveal>
            <Reveal delay={80}>
              <p style={{
                fontSize: "clamp(14px,1.4vw,17px)", lineHeight: 1.7,
                color: "rgba(0,0,0,0.5)", maxWidth: 380,
              }}>
                Send us a message and we&apos;ll be in touch within the hour.
              </p>
            </Reveal>
          </div>
          <Reveal delay={60}>
            <EnquiryForm address={p.address} suburb={p.suburb} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
