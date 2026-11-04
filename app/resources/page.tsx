import type { Metadata } from "next";
import ResourceFrames from "./ResourceFrames";

export const metadata: Metadata = {
  title: "Resources | Spinelli Commercial",
};

export default function ResourcesPage() {
  return (
    <>
      <ResourceFrames />
    </>
  );
}
