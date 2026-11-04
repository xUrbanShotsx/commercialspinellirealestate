import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Spinelli Commercial",
};

export default function ContactPage() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .contact-card { padding: 28px 24px !important; border-radius: 18px !important; }
          .contact-card h1 { font-size: 1.5rem !important; margin-bottom: 20px !important; }
          .contact-hero { padding: 20px !important; }
          header, footer { display: none !important; }
        }
      `}</style>

      <section
        className="contact-hero"
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "140px 20px 60px",
        }}
      >
        <Image
          src="/hero.webp"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 60%", zIndex: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,31,45,0.5)", zIndex: 1 }} />

        <div
          className="contact-card"
          style={{
            position: "relative",
            zIndex: 2,
            background: "#fff",
            borderRadius: "24px",
            padding: "48px",
            width: "100%",
            maxWidth: "480px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          }}
        >
          <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "#5BC2E7", margin: "0 0 12px", textAlign: "center", fontFamily: "var(--font-sans)" }}>
            Spinelli Commercial · Illawarra
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#0D1F2D",
              margin: "0 0 32px",
              textAlign: "center",
            }}
          >
            Talk to our commercial team
          </h1>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
