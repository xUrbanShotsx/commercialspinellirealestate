import type { Metadata } from "next";
import ResourceFrames from "./ResourceFrames";
import ResourcesHero from "./ResourcesHero";

export const metadata: Metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHero />
      <ResourceFrames />
    </>
  );
}
