import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RESOURCES } from "@/lib/resources";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = RESOURCES.find((r) => r.slug === slug);
  if (!r) return {};
  return { title: `${r.title} | Spinelli Commercial` };
}

export default async function ResourceArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = RESOURCES.find((r) => r.slug === slug);
  if (!r) notFound();

  const idx = RESOURCES.indexOf(r);
  const prev = RESOURCES[idx - 1];
  const next = RESOURCES[idx + 1];

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", height: "60vh", minHeight: "360px", overflow: "hidden" }}>
        <Image src={r.image} alt={r.title} fill priority style={{ objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,31,45,0.65)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 40px 56px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7" }} />
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>
                {r.tag}
              </p>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3.6rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1.1, maxWidth: "26ch" }}>
              {r.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 40px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>

          {/* Topics */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "48px", paddingBottom: "48px", borderBottom: "1px solid #E8E5DF" }}>
            {r.topics.map((t) => (
              <span key={t} style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", fontFamily: "var(--font-sans)", color: "#0D1F2D", backgroundColor: "#F5F4F0", border: "1px solid #E8E5DF", padding: "5px 12px" }}>
                {t}
              </span>
            ))}
          </div>

          {/* Paragraphs */}
          {r.body.map((para, i) => (
            <p key={i} style={{ fontSize: "16px", color: i === 0 ? "#0D1F2D" : "#58503C", lineHeight: 2, marginBottom: "28px", fontFamily: "var(--font-sans)", fontWeight: i === 0 ? 500 : 400 }}>
              {para}
            </p>
          ))}

          {/* CTA */}
          <div style={{ marginTop: "64px", padding: "40px", backgroundColor: "#F5F4F0", borderLeft: "3px solid #5BC2E7" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>
              Spinelli Commercial
            </p>
            <p style={{ fontSize: "16px", color: "#0D1F2D", fontFamily: "var(--font-sans)", lineHeight: 1.7, marginBottom: "24px", fontWeight: 400 }}>
              Have questions about this topic? Our team is happy to provide specific advice for your property or situation.
            </p>
            <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#0D1F2D", color: "#ffffff", padding: "13px 24px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-sans)", textDecoration: "none" }}>
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section style={{ backgroundColor: "#F5F4F0", borderTop: "1px solid #E8E5DF" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr", gap: "1px", backgroundColor: "#E8E5DF" }}>
          {prev && (
            <Link href={`/resources/${prev.slug}`} style={{ display: "block", padding: "36px 40px", backgroundColor: "#ffffff", textDecoration: "none" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a2b0aa", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>← Previous</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.02em" }}>{prev.title}</p>
            </Link>
          )}
          {next && (
            <Link href={`/resources/${next.slug}`} style={{ display: "block", padding: "36px 40px", backgroundColor: "#ffffff", textDecoration: "none", textAlign: prev ? "right" : "left" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a2b0aa", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>Next →</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.02em" }}>{next.title}</p>
            </Link>
          )}
        </div>
        <div style={{ padding: "24px 40px", textAlign: "center" }}>
          <Link href="/resources" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a2b0aa", fontFamily: "var(--font-sans)", textDecoration: "none" }}>
            ← All Resources
          </Link>
        </div>
      </section>
    </>
  );
}
