import type { Metadata } from "next";
import CalculatorsHero from "./CalculatorsHero";
import CalculatorsIndex from "./CalculatorsIndex";

export const metadata: Metadata = {
  title: "Calculators",
};

export default function CalculatorsPage() {
  return (
    <>
      <CalculatorsHero />
      <section style={{ background: "#fff", padding: "clamp(60px,8vw,120px) 0 clamp(80px,14vw,160px)" }}>
        <div className="wrap">
          <CalculatorsIndex />
        </div>
      </section>
    </>
  );
}
