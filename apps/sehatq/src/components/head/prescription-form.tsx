import React from "react";
import { SEO } from "@sehatq/constants";
import { HeadContent } from "./head-content";
export function PrescriptionFormHead() {
  return <HeadContent {...SEO.SEHATQ.SEO_DEFAULT} />;
}
