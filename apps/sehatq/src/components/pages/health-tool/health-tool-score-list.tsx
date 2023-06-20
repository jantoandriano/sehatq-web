import React from "react";
import { useRouter } from "next/router";
import { HealthToolScoreListDesktop } from "./health-tool-score-list-desktop";
import { HealthToolScoreListMobile } from "./health-tool-score-list-mobile";

interface Props {
  isMobile: boolean;
  healthTool?: {
    id: number;
    name: string;
    slug: string;
    title: string;
    description: string;
    type: string;
  };
}

export function HealthToolScoreList({ isMobile, healthTool }: Props) {
  const { query } = useRouter();

  const props = {
    userId: `${query?.userId || ""}`,
    healthToolTitle: healthTool?.title || "",
    healthToolDesc: healthTool?.description || "",
  };
  if (isMobile) {
    return <HealthToolScoreListMobile {...props} />;
  }
  return <HealthToolScoreListDesktop {...props} />;
}
