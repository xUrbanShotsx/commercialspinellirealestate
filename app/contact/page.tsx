import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Spinelli Commercial",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "flex-end", backgroundColor: "#0D1F2D", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 40%", opacity: 0.2 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,31,45,0.98) 35%, rgba(13,31,45,0.5))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "2px", backgroundColor: "#5BC2E7" }} />
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>Contact</p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1 }}>
            Talk to Our<br />Commercial Team
          </h1>
        </div>
      </section>

      {/* Form + details */}
      <section style={{ backgroundColor: "#F5F4F0", padding: "0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>

          {/* Form panel */}
          <div style={{ backgroundColor: "#ffffff", padding: "56px 48px", borderRight: "1px solid #E8E5DF" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>Send a message</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em", marginBottom: "32px" }}>
              We&apos;ll be in touch within one business day
            </h2>
            <ContactForm />
          </div>

          {/* Details panel */}
          <div style={{ backgroundColor: "#0D1F2D", padding: "56px 48px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "40px" }}>Contact Details</p>

            {[
              { label: "Phone", value: "02 4296 0047", href: "tel:0242960047" },
              { label: "Email", value: "adam@spinellire.com", href: "mailto:adam@spinellire.com" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>{item.label}</p>
                <a href={item.href} style={{ fontSize: "18px", fontFamily: "var(--font-display)", color: "#ffffff", fontWeight: 300, letterSpacing: "-0.02em" }}>{item.value}</a>
              </div>
            ))}

            <div style={{ marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>Office</p>
              <p style={{ fontSize: "15px", fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>16 College Avenue<br />Shellharbour City Centre NSW 2529</p>
            </div>

            <div>
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>Hours</p>
              <p style={{ fontSize: "14px", fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                Mon – Fri · 8:30am – 5:30pm<br />
                Saturday · 9:00am – 4:00pm
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
