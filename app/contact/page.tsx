import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Spinelli Commercial",
  description: "Get in touch with Spinelli Commercial — Illawarra's dedicated commercial real estate team.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0D3348", paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5BC2E7", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>Get in Touch</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Talk to Our<br />Commercial Team
          </h1>
        </div>
      </section>

      {/* Form + details */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gap: "64px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "start" }}>

          {/* Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "48px", border: "1px solid #E8E5DF" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 300, color: "#0D3348", letterSpacing: "-0.02em", marginBottom: "32px" }}>
              Send us a message
            </h2>
            <ContactForm />
          </div>

          {/* Details */}
          <div>
            <div style={{ marginBottom: "40px" }}>
              <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a2b0aa", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Phone</p>
              <a href="tel:0242960047" style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "#0D3348", fontWeight: 300, letterSpacing: "-0.02em" }}>02 4296 0047</a>
            </div>
            <div style={{ marginBottom: "40px" }}>
              <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a2b0aa", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Email</p>
              <a href="mailto:adam@spinellire.com" style={{ fontSize: "15px", fontFamily: "var(--font-sans)", color: "#5BC2E7" }}>adam@spinellire.com</a>
            </div>
            <div style={{ marginBottom: "40px" }}>
              <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a2b0aa", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Office</p>
              <p style={{ fontSize: "15px", fontFamily: "var(--font-sans)", color: "#58503C", lineHeight: 1.8 }}>16 College Avenue<br />Shellharbour City Centre NSW 2529</p>
            </div>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a2b0aa", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Hours</p>
              <p style={{ fontSize: "14px", fontFamily: "var(--font-sans)", color: "#58503C", lineHeight: 1.8 }}>
                Mon – Fri: 8:30am – 5:30pm<br />
                Saturday: 9:00am – 4:00pm
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
