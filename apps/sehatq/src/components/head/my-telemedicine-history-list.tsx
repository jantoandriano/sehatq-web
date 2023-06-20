import React from "react";
import { SEO } from "@sehatq/constants";
import { HeadContent } from "./head-content";

export function MyTelemedicineHistoryListHead() {
  return <HeadContent {...SEO.SEHATQ.SEO_DEFAULT} />;
}
