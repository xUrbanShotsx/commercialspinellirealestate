import type { Metadata } from "next";
import CalculatorsClient from "./CalculatorsClient";

export const metadata: Metadata = {
  title: "Calculators | Spinelli Commercial",
};

export default function CalculatorsPage() {
  return <CalculatorsClient />;
}
