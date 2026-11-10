import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import ResourceFrames from "./ResourceFrames";

export const metadata: Metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Market intelligence</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Resources.
          </Reveal>
        </div>
      </section>
      <ResourceFrames />
    </>
  );
}
