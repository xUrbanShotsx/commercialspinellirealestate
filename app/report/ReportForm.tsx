"use client";
import { useState } from "react";

const INPUT = {
  display: "block" as const,
  width: "100%",
  height: "52px",
  border: "1px solid #E8E5DF",
  borderRadius: "8px",
  background: "#F9F8F6",
  padding: "0 16px",
  fontSize: "15px",
  fontFamily: "var(--font-sans)",
  color: "#000",
  outline: "none",
  boxSizing: "border-box" as const,
};

const LABEL = {
  display: "block" as const,
  fontSize: "11px",
  fontWeight: 500,
  textTransform: "uppercase" as const,
  letterSpacing: "0.14em",
  color: "#a2b0aa",
  marginBottom: "6px",
  fontFamily: "var(--font-sans)",
};

const PROPERTY_TYPES = [
  "Office / Commercial",
  "Retail",
  "Industrial / Warehouse",
  "Development Site",
  "Other",
];

export default function ReportForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const body = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      address: fd.get("address"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      propertyType: fd.get("propertyType"),
      annualRent: fd.get("annualRent"),
    };
    try {
      const res = await fetch("/api/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#5BC2E7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, color: "#0D1F2D", marginBottom: "10px" }}>Request received</h2>
        <p style={{ fontSize: "14px", color: "#7a7265", fontFamily: "var(--font-sans)", lineHeight: 1.7 }}>
          We&apos;ll prepare your complimentary commercial report and be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
      <style>{`@media (max-width: 540px) { .report-grid { grid-template-columns: 1fr !important; gap: 14px !important; } }`}</style>
      <div>
        <label style={LABEL}>First name</label>
        <input name="firstName" autoComplete="given-name" required style={INPUT} />
      </div>
      <div>
        <label style={LABEL}>Last name</label>
        <input name="lastName" autoComplete="family-name" required style={INPUT} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={LABEL}>Property address</label>
        <input name="address" autoComplete="street-address" required style={INPUT} />
      </div>
      <div>
        <label style={LABEL}>Phone</label>
        <input name="phone" type="tel" autoComplete="tel" required style={INPUT} />
      </div>
      <div>
        <label style={LABEL}>Email</label>
        <input name="email" type="email" autoComplete="email" required style={INPUT} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={LABEL}>Property type</label>
        <select name="propertyType" required style={{ ...INPUT, cursor: "pointer" }}>
          <option value="">Select a type</option>
          {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={LABEL}>
          Annual rent return <span style={{ color: "#c8d0ce", fontWeight: 400, letterSpacing: 0 }}>(optional)</span>
        </label>
        <input name="annualRent" placeholder="e.g. $48,000 / year" style={INPUT} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            width: "100%",
            height: "54px",
            backgroundColor: "#0D1F2D",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontFamily: "var(--font-sans)",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {status === "loading" ? "Sending…" : "Request My Report"}
        </button>
        {status === "error" && (
          <p style={{ marginTop: "12px", fontSize: "13px", color: "#c0392b", textAlign: "center", fontFamily: "var(--font-sans)" }}>
            Something went wrong — please try again or call us on 02 4296 0047.
          </p>
        )}
      </div>
    </form>
  );
}
