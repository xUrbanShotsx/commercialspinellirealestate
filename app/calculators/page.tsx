import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import CalculatorsIndex from "./CalculatorsIndex";

export const metadata: Metadata = {
  title: "Calculators",
};

export default function CalculatorsPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Investment tools</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Calculators.
          </Reveal>
        </div>
      </section>
      <CalculatorsIndex />
    </>
  );
}
