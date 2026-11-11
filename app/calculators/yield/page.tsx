import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import CalculatorsClient from "../CalculatorsClient";

export const metadata: Metadata = {
  title: "Yield Calculator — Spinelli Commercial",
};

export default function YieldPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Investment tools</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Yield.
          </Reveal>
        </div>
      </section>
      <CalculatorsClient mode="yield" />
    </>
  );
}
