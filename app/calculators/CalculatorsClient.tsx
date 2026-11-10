"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── NSW Transfer Duty (2024-25) ─────────────────────────────── */
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

function sliderPct(val: number, min: number, max: number) {
  return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
}

/* ── Duty bands ───────────────────────────────────────────────── */
const BANDS = [
  { max: 14000,    rate: "1.25%" },
  { max: 31000,    rate: "1.50%" },
  { max: 83000,    rate: "1.75%" },
  { max: 310000,   rate: "3.50%" },
  { max: 1033000,  rate: "4.50%" },
  { max: Infinity, rate: "5.50%" },
];
function getBand(price: number) {
  if (price <= 14000)   return 0;
  if (price <= 31000)   return 1;
  if (price <= 83000)   return 2;
  if (price <= 310000)  return 3;
  if (price <= 1033000) return 4;
  return 5;
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
      const e = 1 - Math.pow(1 - p, 4);
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

/* ── Dark-aware input ────────────────────────────────────────── */
function CalcInput({
  label, value, onChange, prefix, placeholder, optional, dark,
}: {
  label: string; value: string; onChange: (v: string) => void;
  prefix?: string; placeholder?: string; optional?: boolean; dark?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const handle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value.replace(/[^0-9.]/g, "")),
    [onChange]
  );
  const dimText = dark ? "rgba(255,255,255,0.35)" : "#bbb";
  const activeText = dark ? "rgba(255,255,255,0.9)" : "#111";
  const borderColor = focused
    ? (dark ? "rgba(255,255,255,0.7)" : "#111")
    : (dark ? "rgba(255,255,255,0.15)" : "#E8E8E8");

  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <label style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", fontFamily: "var(--font-sans)",
          color: focused ? activeText : dimText,
          transition: "color 0.4s cubic-bezier(0.32,0.72,0,1)",
        }}>
          {label}
        </label>
        {optional && (
          <span style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.2)" : "#ddd", fontFamily: "var(--font-sans)" }}>
            Optional
          </span>
        )}
      </div>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
            fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 300,
            color: focused ? activeText : dimText,
            transition: "color 0.4s cubic-bezier(0.32,0.72,0,1)",
            userSelect: "none", pointerEvents: "none",
          }}>{prefix}</span>
        )}
        <input
          type="text" inputMode="decimal"
          value={value} onChange={handle}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%", border: "none",
            borderBottom: `1.5px solid ${borderColor}`,
            outline: "none",
            padding: `13px 0 13px ${prefix ? "22px" : "0"}`,
            fontSize: "22px", fontFamily: "var(--font-sans)",
            fontWeight: 300, letterSpacing: "-0.02em",
            backgroundColor: "transparent",
            color: dark ? (value ? "white" : "rgba(255,255,255,0.4)") : "#111",
            transition: "border-color 0.4s cubic-bezier(0.32,0.72,0,1)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Sliding toggle ──────────────────────────────────────────── */
function Toggle({ options, value, onChange, dark }: {
  options: [string, string]; value: string; onChange: (v: string) => void; dark?: boolean;
}) {
  const isFirst = value === options[0];
  return (
    <div style={{ marginBottom: "32px" }}>
      <label style={{
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
        fontFamily: "var(--font-sans)", display: "block", marginBottom: "10px",
        color: dark ? "rgba(255,255,255,0.35)" : "#bbb",
      }}>
        Rent Period
      </label>
      <div style={{
        position: "relative", display: "inline-flex",
        backgroundColor: dark ? "rgba(255,255,255,0.08)" : "#F4F4F4",
        padding: "2px",
      }}>
        <div style={{
          position: "absolute", top: "2px", bottom: "2px", left: "2px",
          width: "84px",
          backgroundColor: dark ? "rgba(255,255,255,0.9)" : "#111",
          transform: `translateX(${isFirst ? "0" : "84px"})`,
          transition: "transform 0.42s cubic-bezier(0.32,0.72,0,1)",
          pointerEvents: "none",
        }} />
        {options.map((opt) => (
          <button key={opt} onClick={() => onChange(opt)} style={{
            position: "relative", zIndex: 1, width: "84px", padding: "9px 0",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
            fontFamily: "var(--font-sans)",
            color: value === opt
              ? (dark ? "#111" : "#fff")
              : (dark ? "rgba(255,255,255,0.4)" : "#aaa"),
            background: "none", border: "none", cursor: "pointer",
            transition: "color 0.42s cubic-bezier(0.32,0.72,0,1)",
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

/* ── Result row ──────────────────────────────────────────────── */
function Row({ label, value, large, accent, dark }: {
  label: string; value: string; large?: boolean; accent?: boolean; dark?: boolean;
}) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      padding: "11px 0",
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "#F0F0F0"}`,
    }}>
      <span style={{
        fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
        fontFamily: "var(--font-sans)",
        color: dark ? "rgba(255,255,255,0.3)" : "#bbb",
      }}>{label}</span>
      <span style={{
        fontFamily: "var(--font-sans)",
        fontSize: large ? "17px" : "14px",
        fontWeight: large ? 500 : 400,
        letterSpacing: "-0.02em",
        color: accent ? (dark ? "#fff" : "#555") : (dark ? "rgba(255,255,255,0.85)" : "#111"),
      }}>{value}</span>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────── */
export default function CalculatorsClient() {

  /* Stamp duty */
  const [sdPrice, setSdPrice] = useState("1500000");
  const sdP   = parseFloat(sdPrice) || 0;
  const sdDuty   = calcStampDuty(sdP);
  const sdOutlay = sdP + sdDuty;
  const sdEffRate = sdP > 0 ? (sdDuty / sdP) * 100 : 0;
  const sdDutyAnim    = useCountUp(sdDuty);
  const sdOutlayAnim  = useCountUp(sdOutlay);
  const sdEffAnim     = useCountUp(sdEffRate);
  const band          = getBand(sdP);

  /* Yield */
  const [yPrice, setYPrice] = useState("1500000");
  const [yRent,  setYRent]  = useState("1800");
  const [yMode,  setYMode]  = useState("Weekly");
  const [yExp,   setYExp]   = useState("");
  const yP  = parseFloat(yPrice) || 0;
  const yR  = parseFloat(yRent)  || 0;
  const annualRent = yMode === "Weekly" ? yR * 52 : yR;
  const grossYield = yP > 0 ? (annualRent / yP) * 100 : 0;
  const expenses   = parseFloat(yExp) || 0;
  const netYield   = yP > 0 && expenses > 0 ? ((annualRent - expenses) / yP) * 100 : 0;
  const grossAnim      = useCountUp(grossYield);
  const netAnim        = useCountUp(netYield);
  const annualRentAnim = useCountUp(annualRent);

  /* Slider sync for stamp duty */
  const sdSliderVal = Math.min(Math.max(sdP, 100000), 10000000);
  const ySliderVal  = Math.min(Math.max(yP,  100000), 10000000);

  const sdSliderPct = sliderPct(sdSliderVal, 100000, 10000000);
  const ySliderPct  = sliderPct(ySliderVal,  100000, 10000000);

  return (
    <>
      <style>{`
        /* ── Slider reset ─────────────────────────────── */
        input[type=range] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          outline: none;
          cursor: pointer;
          border-radius: 0;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.32,0.72,0,1),
                      box-shadow 0.25s cubic-bezier(0.32,0.72,0,1);
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.3);
        }
        input[type=range]::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
        .sd-slider::-webkit-slider-thumb {
          background: #fff;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.12);
        }
        .sd-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 8px rgba(255,255,255,0.2);
        }
        .y-slider::-webkit-slider-thumb {
          background: #111;
          box-shadow: 0 0 0 4px rgba(0,0,0,0.06);
        }
        .y-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 8px rgba(0,0,0,0.12);
        }

        /* ── Mobile stack ─────────────────────────────── */
        @media (max-width: 768px) {
          .calc-split   { grid-template-columns: 1fr !important; }
          .calc-panel   { padding: 120px 28px 60px !important; }
          .calc-ghost   { font-size: 120px !important; }
          .calc-hero-n  { font-size: 2.6rem !important; }
        }
        input::placeholder { color: rgba(255,255,255,0.18) }
        .y-panel input::placeholder { color: #DDD; }
      `}</style>

      <section className="calc-split" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100dvh",
        alignItems: "stretch",
      }}>

        {/* ════════════════════════════════════════════════
            LEFT — STAMP DUTY  (dark panel, fixes navbar)
           ════════════════════════════════════════════════ */}
        <div className="calc-panel" style={{
          backgroundColor: "#111",
          padding: "80px 64px 80px",
          position: "relative",
          overflow: "hidden",
          borderRight: "1px solid rgba(255,255,255,0.12)",
        }}>

          {/* Ghost number */}
          <div className="calc-ghost" aria-hidden style={{
            position: "absolute", right: "-32px", bottom: "-20px",
            fontFamily: "var(--font-display)",
            fontSize: "220px", fontWeight: 700,
            color: "rgba(255,255,255,0.03)",
            lineHeight: 1, letterSpacing: "-0.06em",
            userSelect: "none", pointerEvents: "none",
            whiteSpace: "nowrap",
          }}>
            {Math.round(sdDutyAnim).toLocaleString("en-AU")}
          </div>

          {/* Chapter label */}
          <div style={{
            position: "absolute", left: "24px", top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "center center",
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.12)",
            fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
          }}>
            NSW · 2024-25
          </div>

          {/* Header */}
          <div style={{ marginBottom: "52px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)" }}>
                Transfer Duty
              </span>
            </div>
            <h2 className="calc-hero-n" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
              fontWeight: 300, color: "#fff",
              letterSpacing: "-0.045em", lineHeight: 1, margin: 0,
            }}>
              {fmtDollar(sdDutyAnim)}
            </h2>
            <p style={{ marginTop: "10px", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}>
              Effective rate: {sdEffAnim.toFixed(2)}%
            </p>
          </div>

          {/* Tax band bar */}
          <div style={{ marginBottom: "44px" }}>
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>
              Duty Band
            </p>
            <div style={{ display: "flex", gap: "3px" }}>
              {BANDS.map((b, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{
                    height: "3px",
                    backgroundColor: i === band ? "#fff" : "rgba(255,255,255,0.1)",
                    transition: "background-color 0.5s cubic-bezier(0.32,0.72,0,1)",
                    marginBottom: "6px",
                  }} />
                  <span style={{
                    fontSize: "7px", display: "block",
                    fontFamily: "var(--font-sans)", letterSpacing: "0.08em",
                    color: i === band ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                    transition: "color 0.5s cubic-bezier(0.32,0.72,0,1)",
                  }}>
                    {b.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price input + slider */}
          <CalcInput label="Purchase Price" value={sdPrice} onChange={setSdPrice} prefix="$" placeholder="1,500,000" dark />

          <div style={{ marginBottom: "40px", marginTop: "-16px" }}>
            <input
              type="range" min={100000} max={10000000} step={10000}
              className="sd-slider"
              value={sdSliderVal}
              onChange={e => setSdPrice(e.target.value)}
              style={{
                background: `linear-gradient(to right, #fff ${sdSliderPct}%, rgba(255,255,255,0.15) ${sdSliderPct}%)`,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sans)" }}>$100k</span>
              <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sans)" }}>$10M</span>
            </div>
          </div>

          {/* Results */}
          <Row label="Transfer Duty"   value={fmtDollar(sdDutyAnim)}   dark large />
          <Row label="Purchase Price"  value={fmtDollar(sdP)}          dark />
          <Row label="Total Outlay"    value={fmtDollar(sdOutlayAnim)} dark large />

          <p style={{ marginTop: "24px", fontSize: "11px", lineHeight: 1.7, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-sans)" }}>
            Estimate only. NSW 2024-25 transfer duty rates. Confirm with your solicitor.
          </p>
        </div>

        {/* ════════════════════════════════════════════════
            RIGHT — YIELD  (white panel)
           ════════════════════════════════════════════════ */}
        <div className="calc-panel y-panel" style={{
          backgroundColor: "#fff",
          padding: "80px 64px 80px",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Ghost number */}
          <div className="calc-ghost" aria-hidden style={{
            position: "absolute", right: "-20px", bottom: "-20px",
            fontFamily: "var(--font-display)",
            fontSize: "220px", fontWeight: 700,
            color: "rgba(0,0,0,0.03)",
            lineHeight: 1, letterSpacing: "-0.06em",
            userSelect: "none", pointerEvents: "none",
            whiteSpace: "nowrap",
          }}>
            {grossAnim.toFixed(1)}%
          </div>

          {/* Chapter label */}
          <div style={{
            position: "absolute", right: "24px", top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            transformOrigin: "center center",
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "rgba(0,0,0,0.1)",
            fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
          }}>
            Investment
          </div>

          {/* Header */}
          <div style={{ marginBottom: "52px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", backgroundColor: "rgba(0,0,0,0.3)" }} />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-sans)" }}>
                Yield Calculator
              </span>
            </div>

            {/* Yield display — gross + net side by side */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "36px", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ccc", fontFamily: "var(--font-sans)", margin: "0 0 6px" }}>
                  Gross
                </p>
                <div className="calc-hero-n" style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                  fontWeight: 300, color: "#111",
                  letterSpacing: "-0.045em", lineHeight: 1,
                }}>
                  {grossAnim.toFixed(2)}%
                </div>
              </div>
              {expenses > 0 && (
                <div style={{
                  opacity: 1, transform: "translateY(0)",
                  transition: "opacity 0.6s cubic-bezier(0.32,0.72,0,1), transform 0.6s cubic-bezier(0.32,0.72,0,1)",
                }}>
                  <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ccc", fontFamily: "var(--font-sans)", margin: "0 0 6px" }}>
                    Net
                  </p>
                  <div className="calc-hero-n" style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                    fontWeight: 300, color: "#555",
                    letterSpacing: "-0.045em", lineHeight: 1,
                  }}>
                    {netAnim.toFixed(2)}%
                  </div>
                </div>
              )}
            </div>

            {/* Yield progress bar */}
            <div style={{ marginTop: "20px" }}>
              <div style={{ position: "relative", height: "2px", backgroundColor: "#F0F0F0" }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: `${Math.min(grossYield / 12 * 100, 100)}%`,
                  backgroundColor: "#111",
                  transition: "width 0.65s cubic-bezier(0.32,0.72,0,1)",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                <span style={{ fontSize: "8px", color: "#ddd", fontFamily: "var(--font-sans)" }}>0%</span>
                <span style={{ fontSize: "8px", color: "#ddd", fontFamily: "var(--font-sans)" }}>6% typical</span>
                <span style={{ fontSize: "8px", color: "#ddd", fontFamily: "var(--font-sans)" }}>12%</span>
              </div>
            </div>
          </div>

          {/* Price input + slider */}
          <CalcInput label="Purchase Price" value={yPrice} onChange={setYPrice} prefix="$" placeholder="1,500,000" />

          <div style={{ marginBottom: "32px", marginTop: "-16px" }}>
            <input
              type="range" min={100000} max={10000000} step={10000}
              className="y-slider"
              value={ySliderVal}
              onChange={e => setYPrice(e.target.value)}
              style={{
                background: `linear-gradient(to right, #111 ${ySliderPct}%, #e8e8e8 ${ySliderPct}%)`,
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ fontSize: "9px", color: "#ddd", fontFamily: "var(--font-sans)" }}>$100k</span>
              <span style={{ fontSize: "9px", color: "#ddd", fontFamily: "var(--font-sans)" }}>$10M</span>
            </div>
          </div>

          <Toggle options={["Weekly", "Annual"]} value={yMode} onChange={setYMode} />

          <CalcInput
            label={`${yMode} Rent`} value={yRent} onChange={setYRent}
            prefix="$" placeholder={yMode === "Weekly" ? "1,800" : "93,600"}
          />

          <CalcInput label="Annual Expenses" value={yExp} onChange={setYExp} prefix="$" placeholder="e.g. 18,000" optional />

          {/* Results */}
          <Row label="Annual Rent"   value={fmtDollar(annualRentAnim)} />
          <Row label="Gross Yield"   value={grossAnim.toFixed(2) + "%"}  large />
          {expenses > 0 && <Row label="Net Yield" value={netAnim.toFixed(2) + "%"} large accent />}
          <Row label="Weekly Return" value={fmtDollar(annualRentAnim / 52)} />

          <p style={{ marginTop: "24px", fontSize: "11px", lineHeight: 1.7, color: "#ccc", fontFamily: "var(--font-sans)" }}>
            Indicative only. Does not account for vacancy, capital costs or tax. Seek independent financial advice.
          </p>
        </div>

      </section>
    </>
  );
}
