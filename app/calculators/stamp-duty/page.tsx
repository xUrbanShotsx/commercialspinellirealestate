import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import CalculatorsClient from "../CalculatorsClient";

export const metadata: Metadata = {
  title: "Transfer Duty Calculator — Spinelli Commercial",
};

export default function StampDutyPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">NSW 2024-25</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Transfer Duty.
          </Reveal>
        </div>
      </section>
      <CalculatorsClient mode="stamp" />
    </>
  );
}
