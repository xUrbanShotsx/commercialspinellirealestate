"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── NSW Transfer Duty bands (2024-25) ───────────────────────── */
function calcStampDuty(price: number): number {
  if (price <= 14000)   return price * 0.0125;
  if (price <= 31000)   return 175   + (price - 14000)  * 0.015;
  if (price <= 83000)   return 430   + (price - 31000)  * 0.0175;
  if (price <= 310000)  return 1340  + (price - 83000)  * 0.035;
  if (price <= 1033000) return 9285  + (price - 310000) * 0.045;
  return                       41820 + (price - 1033000) * 0.055;
}

function fmtDollar(n: number) {
  return "$" + Math.round(n).toLocaleString("en-AU");
}

/* ── Count-up animation ──────────────────────────────────────── */
function useCountUp(target: number, duration = 650): number {
  const [val, setVal] = useState(target);
  const raf = useRef<number | null>(null);
  const from = useRef(target);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const a = from.current;
    const b = target;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4); // ease-out quart
      const v = a + (b - a) * e;
      from.current = v;
      setVal(v);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else { from.current = b; setVal(b); }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);

  return val;
}

/* ── IntersectionObserver reveal ────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.07 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return { ref, visible };
}

/* ── Animated input component ───────────────────────────────── */
interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  placeholder?: string;
  optional?: boolean;
}

function CalcInput({ label, value, onChange, prefix, placeholder, optional }: InputProps) {
  const [focused, setFocused] = useState(false);
  const handle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value.replace(/[^0-9.]/g, "")),
    [onChange]
  );

  return (
    <div style={{ marginBottom: "36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <label style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", fontFamily: "var(--font-sans)",
          color: focused ? "#111" : "#bbb",
          transition: "color 0.4s cubic-bezier(0.32,0.72,0,1)",
        }}>
          {label}
        </label>
        {optional && (
          <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ddd", fontFamily: "var(--font-sans)" }}>
            Optional
          </span>
        )}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && (
          <span style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
            fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 300,
            color: focused ? "#111" : "#ccc",
            transition: "color 0.4s cubic-bezier(0.32,0.72,0,1)",
            userSelect: "none", pointerEvents: "none",
          }}>
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%",
            border: "none",
            borderBottom: `1.5px solid ${focused ? "#111" : "#E8E8E8"}`,
            outline: "none",
            padding: `14px 0 14px ${prefix ? "22px" : "0"}`,
            fontSize: "22px",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            backgroundColor: "transparent",
            color: "#111",
            transition: "border-color 0.4s cubic-bezier(0.32,0.72,0,1)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Sliding toggle ──────────────────────────────────────────── */
interface ToggleProps {
  options: [string, string];
  value: string;
  onChange: (v: string) => void;
}

function Toggle({ options, value, onChange }: ToggleProps) {
  const isFirst = value === options[0];
  return (
    <div style={{ marginBottom: "36px" }}>
      <label style={{
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "#bbb", fontFamily: "var(--font-sans)", display: "block", marginBottom: "10px",
      }}>
        Rent Period
      </label>
      <div style={{ position: "relative", display: "inline-flex", backgroundColor: "#F5F5F5", padding: "2px" }}>
        <div style={{
          position: "absolute",
          top: "2px", bottom: "2px", left: "2px",
          width: "84px",
          backgroundColor: "#111",
          transform: `translateX(${isFirst ? "0px" : "84px"})`,
          transition: "transform 0.42s cubic-bezier(0.32,0.72,0,1)",
          pointerEvents: "none",
        }} />
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              position: "relative", zIndex: 1,
              width: "84px", padding: "9px 0",
              fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
              color: value === opt ? "#fff" : "#aaa",
              background: "none", border: "none", cursor: "pointer",
              transition: "color 0.42s cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Result row ──────────────────────────────────────────────── */
function ResultRow({ label, value, large, accent }: { label: string; value: string; large?: boolean; accent?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "13px 0", borderTop: "1px solid #F0F0F0" }}>
      <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", fontFamily: "var(--font-sans)" }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: large ? "18px" : "15px",
        fontWeight: large ? 500 : 400,
        color: accent ? "#5BC2E7" : "#111",
        letterSpacing: "-0.02em",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Shared reveal transition ────────────────────────────────── */
function revealStyle(visible: boolean, delay = "0ms"): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s cubic-bezier(0.32,0.72,0,1) ${delay}, transform 0.9s cubic-bezier(0.32,0.72,0,1) ${delay}`,
  };
}

/* ── Main export ─────────────────────────────────────────────── */
export default function CalculatorsClient() {

  /* Stamp duty state */
  const [sdPrice, setSdPrice] = useState("1500000");
  const sdP = parseFloat(sdPrice) || 0;
  const sdDuty = calcStampDuty(sdP);
  const sdOutlay = sdP + sdDuty;
  const sdDutyAnim  = useCountUp(sdDuty);
  const sdOutlayAnim = useCountUp(sdOutlay);

  /* Yield state */
  const [yPrice, setYPrice] = useState("1500000");
  const [yRent, setYRent]   = useState("1800");
  const [yMode, setYMode]   = useState("Weekly");
  const [yExp, setYExp]     = useState("");

  const yP = parseFloat(yPrice) || 0;
  const yR = parseFloat(yRent)  || 0;
  const annualRent = yMode === "Weekly" ? yR * 52 : yR;
  const grossYield = yP > 0 ? (annualRent / yP) * 100 : 0;
  const expenses   = parseFloat(yExp) || 0;
  const netYield   = yP > 0 && expenses > 0 ? ((annualRent - expenses) / yP) * 100 : 0;

  const grossAnim      = useCountUp(grossYield);
  const netAnim        = useCountUp(netYield);
  const annualRentAnim = useCountUp(annualRent);

  /* Reveal hooks */
  const header = useReveal(0);
  const sdCard = useReveal(0);
  const yCard  = useReveal(100);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .calc-grid  { grid-template-columns: 1fr !important; }
          .calc-card  { padding: 36px 28px !important; }
          .calc-shift { margin-top: 0 !important; }
          .calc-hero  { font-size: 2.4rem !important; }
        }
        input::placeholder { color: #DDD; }
      `}</style>

      <section style={{ backgroundColor: "#fff", paddingBottom: "120px" }}>

        {/* ── Editorial header ───────────────────────────────────── */}
        <div ref={header.ref} style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "120px 40px 80px",
          ...revealStyle(header.visible),
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <div style={{ width: "36px", height: "1px", backgroundColor: "#5BC2E7" }} />
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5BC2E7", fontFamily: "var(--font-sans)" }}>
              Tools
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 7vw, 7rem)",
            fontWeight: 300, color: "#111",
            letterSpacing: "-0.045em", lineHeight: 0.93,
            margin: "0 0 32px",
          }}>
            Property<br />Calculators
          </h1>
          <p style={{ fontSize: "16px", color: "#aaa", fontFamily: "var(--font-sans)", maxWidth: "44ch", lineHeight: 1.75, fontWeight: 400 }}>
            Estimate transfer duty and forecast investment yields using live NSW figures. Results update as you type.
          </p>
        </div>

        {/* ── Calculator grid ────────────────────────────────────── */}
        <div className="calc-grid" style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2px",
          alignItems: "start",
        }}>

          {/* ── STAMP DUTY ─────────────────────────────────────── */}
          <div ref={sdCard.ref} style={revealStyle(sdCard.visible)}>
            <div style={{ border: "1px solid #EBEBEB" }}>
              <div className="calc-card" style={{ backgroundColor: "#fff", padding: "56px 60px 52px" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px" }}>
                  <div>
                    <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ddd", fontFamily: "var(--font-sans)", margin: "0 0 10px" }}>
                      NSW · 2024-25
                    </p>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 300, color: "#111", letterSpacing: "-0.03em", margin: 0 }}>
                      Transfer Duty
                    </h2>
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", color: "#e8e8e8", fontFamily: "var(--font-sans)", paddingTop: "4px" }}>01</span>
                </div>

                {/* Live result display */}
                <div style={{ marginBottom: "52px", paddingBottom: "44px", borderBottom: "1px solid #F2F2F2" }}>
                  <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ccc", fontFamily: "var(--font-sans)", margin: "0 0 14px" }}>
                    Estimated Duty
                  </p>
                  <div className="calc-hero" style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.8rem, 5vw, 4.4rem)",
                    fontWeight: 300, color: "#111",
                    letterSpacing: "-0.045em", lineHeight: 1,
                    willChange: "transform",
                  }}>
                    {fmtDollar(sdDutyAnim)}
                  </div>
                </div>

                <CalcInput label="Purchase Price" value={sdPrice} onChange={setSdPrice} prefix="$" placeholder="1,500,000" />

                <div style={{ marginTop: "8px" }}>
                  <ResultRow label="Transfer Duty" value={fmtDollar(sdDutyAnim)} />
                  <ResultRow label="Purchase Price" value={fmtDollar(sdP)} />
                  <ResultRow label="Total Outlay"   value={fmtDollar(sdOutlayAnim)} large />
                </div>

                <p style={{ marginTop: "28px", fontSize: "11px", color: "#ccc", fontFamily: "var(--font-sans)", lineHeight: 1.7 }}>
                  Estimate only. NSW transfer duty as at 2024-25. Concessions or exemptions may apply. Confirm with your solicitor.
                </p>
              </div>
            </div>
          </div>

          {/* ── YIELD ──────────────────────────────────────────── */}
          <div ref={yCard.ref} className="calc-shift" style={{ marginTop: "56px", ...revealStyle(yCard.visible, "120ms") }}>
            <div style={{ border: "1px solid #EBEBEB" }}>
              <div className="calc-card" style={{ backgroundColor: "#fff", padding: "56px 60px 52px" }}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px" }}>
                  <div>
                    <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ddd", fontFamily: "var(--font-sans)", margin: "0 0 10px" }}>
                      Investment
                    </p>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 300, color: "#111", letterSpacing: "-0.03em", margin: 0 }}>
                      Yield Calculator
                    </h2>
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", color: "#e8e8e8", fontFamily: "var(--font-sans)", paddingTop: "4px" }}>02</span>
                </div>

                {/* Live result display */}
                <div style={{ marginBottom: "52px", paddingBottom: "44px", borderBottom: "1px solid #F2F2F2", display: "flex", gap: "48px" }}>
                  <div>
                    <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ccc", fontFamily: "var(--font-sans)", margin: "0 0 14px" }}>
                      Gross Yield
                    </p>
                    <div className="calc-hero" style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.8rem, 5vw, 4.4rem)",
                      fontWeight: 300, color: "#111",
                      letterSpacing: "-0.045em", lineHeight: 1,
                    }}>
                      {grossAnim.toFixed(2)}%
                    </div>
                  </div>

                  {expenses > 0 && (
                    <div style={{
                      opacity: expenses > 0 ? 1 : 0,
                      transform: expenses > 0 ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.5s cubic-bezier(0.32,0.72,0,1), transform 0.5s cubic-bezier(0.32,0.72,0,1)",
                    }}>
                      <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ccc", fontFamily: "var(--font-sans)", margin: "0 0 14px" }}>
                        Net Yield
                      </p>
                      <div className="calc-hero" style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.8rem, 5vw, 4.4rem)",
                        fontWeight: 300, color: "#5BC2E7",
                        letterSpacing: "-0.045em", lineHeight: 1,
                      }}>
                        {netAnim.toFixed(2)}%
                      </div>
                    </div>
                  )}
                </div>

                <CalcInput label="Purchase Price"  value={yPrice} onChange={setYPrice} prefix="$" placeholder="1,500,000" />
                <Toggle options={["Weekly", "Annual"]} value={yMode} onChange={setYMode} />
                <CalcInput
                  label={`${yMode} Rent`}
                  value={yRent}
                  onChange={setYRent}
                  prefix="$"
                  placeholder={yMode === "Weekly" ? "1,800" : "93,600"}
                />
                <CalcInput label="Annual Expenses" value={yExp} onChange={setYExp} prefix="$" placeholder="e.g. 18,000" optional />

                <div style={{ marginTop: "8px" }}>
                  <ResultRow label="Annual Rent"  value={fmtDollar(annualRentAnim)} />
                  <ResultRow label="Weekly Return" value={fmtDollar(annualRentAnim / 52)} />
                  <ResultRow label="Gross Yield"  value={grossAnim.toFixed(2) + "%"} large />
                  {expenses > 0 && <ResultRow label="Net Yield" value={netAnim.toFixed(2) + "%"} large accent />}
                </div>

                <p style={{ marginTop: "28px", fontSize: "11px", color: "#ccc", fontFamily: "var(--font-sans)", lineHeight: 1.7 }}>
                  Indicative only. Does not account for vacancy, capital costs or tax. Seek independent financial advice before purchasing.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
