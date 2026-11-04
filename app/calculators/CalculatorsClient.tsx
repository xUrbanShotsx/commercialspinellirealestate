"use client";
import { useState } from "react";

// NSW Transfer Duty rates 2024-25
function calcStampDuty(price: number): number {
  if (price <= 14000)   return price * 0.0125;
  if (price <= 31000)   return 175   + (price - 14000)  * 0.015;
  if (price <= 83000)   return 430   + (price - 31000)  * 0.0175;
  if (price <= 310000)  return 1340  + (price - 83000)  * 0.035;
  if (price <= 1033000) return 9285  + (price - 310000) * 0.045;
  return                       41820 + (price - 1033000) * 0.055;
}

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

function pct(n: number) {
  return n.toFixed(2) + "%";
}

const INPUT: React.CSSProperties = {
  display: "block", width: "100%", height: "52px",
  border: "1px solid #E8E5DF", borderRadius: "8px",
  background: "#F9F8F6", padding: "0 16px",
  fontSize: "15px", fontFamily: "var(--font-sans)",
  color: "#0D1F2D", outline: "none", boxSizing: "border-box",
};

const LABEL: React.CSSProperties = {
  display: "block", fontSize: "10px", fontWeight: 700,
  letterSpacing: "0.18em", textTransform: "uppercase",
  color: "#a2b0aa", marginBottom: "8px", fontFamily: "var(--font-sans)",
};

const RESULT_ROW = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #F0EDE8" }}>
    <span style={{ fontSize: "13px", color: "#7a7265", fontFamily: "var(--font-sans)" }}>{label}</span>
    <span style={{ fontSize: highlight ? "1.3rem" : "15px", fontWeight: highlight ? 700 : 500, color: highlight ? "#0D1F2D" : "#0D1F2D", fontFamily: "var(--font-sans)", letterSpacing: highlight ? "-0.02em" : 0 }}>{value}</span>
  </div>
);

function StampDutyCalc() {
  const [price, setPrice] = useState("");
  const p = parseFloat(price.replace(/,/g, "")) || 0;
  const duty = calcStampDuty(p);
  const hasResult = p > 0;

  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", padding: "40px" }}>
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>NSW Transfer Duty</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em", marginBottom: "32px" }}>
        Stamp Duty Calculator
      </h2>

      <div style={{ marginBottom: "28px" }}>
        <label style={LABEL}>Purchase price</label>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#a2b0aa", fontFamily: "var(--font-sans)", pointerEvents: "none" }}>$</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="1,500,000"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ ...INPUT, paddingLeft: "28px" }}
          />
        </div>
      </div>

      {hasResult ? (
        <div style={{ borderTop: "2px solid #0D1F2D", marginTop: "8px" }}>
          <RESULT_ROW label="Transfer duty (NSW)" value={fmt(duty)} highlight />
          <RESULT_ROW label="Purchase price" value={fmt(p)} />
          <RESULT_ROW label="Estimated total outlay" value={fmt(p + duty)} />
          <p style={{ fontSize: "11px", color: "#a2b0aa", fontFamily: "var(--font-sans)", marginTop: "16px", lineHeight: 1.6 }}>
            Estimate based on NSW transfer duty rates 2024–25. Does not include conveyancing, lender fees or other costs. Seek independent legal and financial advice.
          </p>
        </div>
      ) : (
        <div style={{ borderTop: "2px solid #E8E5DF", paddingTop: "24px" }}>
          <p style={{ fontSize: "13px", color: "#a2b0aa", fontFamily: "var(--font-sans)", lineHeight: 1.7 }}>Enter a purchase price to calculate the NSW transfer duty (stamp duty) payable on a commercial property.</p>
        </div>
      )}
    </div>
  );
}

function YieldCalc() {
  const [price, setPrice]    = useState("");
  const [rent, setRent]      = useState("");
  const [rentFreq, setRentFreq] = useState<"weekly" | "annual">("weekly");
  const [expenses, setExpenses] = useState("");

  const p  = parseFloat(price.replace(/,/g, ""))    || 0;
  const r  = parseFloat(rent.replace(/,/g, ""))     || 0;
  const ex = parseFloat(expenses.replace(/,/g, "")) || 0;

  const annualRent = rentFreq === "weekly" ? r * 52 : r;
  const grossYield = p > 0 ? (annualRent / p) * 100 : 0;
  const netYield   = p > 0 ? ((annualRent - ex) / p) * 100 : 0;
  const hasResult  = p > 0 && r > 0;

  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E5DF", padding: "40px" }}>
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>Return on investment</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 300, color: "#0D1F2D", letterSpacing: "-0.03em", marginBottom: "32px" }}>
        Yield Calculator
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={LABEL}>Purchase price</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#a2b0aa", fontFamily: "var(--font-sans)", pointerEvents: "none" }}>$</span>
            <input type="text" inputMode="numeric" placeholder="1,200,000" value={price} onChange={e => setPrice(e.target.value)} style={{ ...INPUT, paddingLeft: "28px" }} />
          </div>
        </div>

        <div>
          <label style={LABEL}>Rental income</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#a2b0aa", fontFamily: "var(--font-sans)", pointerEvents: "none" }}>$</span>
            <input type="text" inputMode="numeric" placeholder="1,500" value={rent} onChange={e => setRent(e.target.value)} style={{ ...INPUT, paddingLeft: "28px" }} />
          </div>
        </div>

        <div>
          <label style={LABEL}>Frequency</label>
          <div style={{ display: "flex", height: "52px", border: "1px solid #E8E5DF", borderRadius: "8px", overflow: "hidden" }}>
            {(["weekly", "annual"] as const).map(f => (
              <button
                key={f}
                onClick={() => setRentFreq(f)}
                style={{
                  flex: 1, border: "none", cursor: "pointer",
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                  fontFamily: "var(--font-sans)", transition: "background 0.15s, color 0.15s",
                  backgroundColor: rentFreq === f ? "#0D1F2D" : "#F9F8F6",
                  color: rentFreq === f ? "#ffffff" : "#a2b0aa",
                }}
              >
                {f === "weekly" ? "Weekly" : "Annual"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={LABEL}>Annual expenses <span style={{ color: "#c8d0ce", fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>(optional — rates, insurance, mgmt)</span></label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#a2b0aa", fontFamily: "var(--font-sans)", pointerEvents: "none" }}>$</span>
            <input type="text" inputMode="numeric" placeholder="12,000" value={expenses} onChange={e => setExpenses(e.target.value)} style={{ ...INPUT, paddingLeft: "28px" }} />
          </div>
        </div>
      </div>

      {hasResult ? (
        <div style={{ borderTop: "2px solid #0D1F2D", marginTop: "8px" }}>
          <RESULT_ROW label="Annual rent" value={fmt(annualRent)} />
          <RESULT_ROW label="Gross yield" value={pct(grossYield)} highlight />
          {ex > 0 && <RESULT_ROW label="Net yield (after expenses)" value={pct(netYield)} highlight />}
          <RESULT_ROW label="Weekly return" value={fmt(annualRent / 52)} />
          <p style={{ fontSize: "11px", color: "#a2b0aa", fontFamily: "var(--font-sans)", marginTop: "16px", lineHeight: 1.6 }}>
            Indicative only. Does not account for vacancy, capital costs or tax. Seek independent financial advice before purchasing.
          </p>
        </div>
      ) : (
        <div style={{ borderTop: "2px solid #E8E5DF", paddingTop: "24px" }}>
          <p style={{ fontSize: "13px", color: "#a2b0aa", fontFamily: "var(--font-sans)", lineHeight: 1.7 }}>Enter a purchase price and rental income to calculate the gross and net yield on a commercial investment property.</p>
        </div>
      )}
    </div>
  );
}

export default function CalculatorsClient() {
  return (
    <section style={{ backgroundColor: "#F5F4F0", padding: "80px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "2px", backgroundColor: "#E8E5DF" }}>
        <StampDutyCalc />
        <YieldCalc />
      </div>
    </section>
  );
}
