import React from "react";
import { useGetHealthToolRecordsDetail } from "@sehatq/components";
import { useRouter } from "next/router";
import { HealthToolScoreDetailPageDesktop } from "./health-tool-score-detail-desktop";
import { HealthToolScoreDetailPageMobile } from "./health-tool-score-detail-mobile";

interface Props {
  isMobile: boolean;
}

export function HealthToolScoreDetailPage({ isMobile }: Props) {
  const { query } = useRouter();
  const { data } = useGetHealthToolRecordsDetail({
    healthToolsIdOrSlug: `${query.healthToolSlug || ""}`,
    id: `${query.healthToolScoreId || ""}`,
  });
  const { healthToolName = "" } = data?.data || {};

  const props = {
    title: healthToolName,
    slug: `${query.healthToolSlug || ""}`,
    userId: `${query.userId || ""}`,
    scoreId: `${query.healthToolScoreId || ""}`,
  };

  if (isMobile) return <HealthToolScoreDetailPageMobile {...props} />;
  return <HealthToolScoreDetailPageDesktop {...props} />;
}
