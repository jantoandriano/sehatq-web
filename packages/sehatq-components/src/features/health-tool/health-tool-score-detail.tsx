import React from "react";
import {
  HealthToolRecordsDetailCache,
  useGetHealthToolRecordsDetail,
} from "./health-tool-queries";

import { HealthToolScoreDetailDesktop } from "./health-tool-score-detail-desktop";
import { HealthToolScoreDetailMobile } from "./health-tool-score-detail-mobile";

export type HealthToolScoreDetailProps = {
  isMobile: boolean;
  slug: string;
  scoreId: string;
};

export function HealthToolScoreDetail({
  isMobile,
  slug,
  scoreId,
}: HealthToolScoreDetailProps) {
  const { data } = useGetHealthToolRecordsDetail({
    healthToolsIdOrSlug: slug,
    id: scoreId,
  });

  const props = {
    content: data?.data || ({} as HealthToolRecordsDetailCache["data"]),
  };

  if (isMobile) {
    return <HealthToolScoreDetailMobile {...props} />;
  }
  return <HealthToolScoreDetailDesktop {...props} />;
}
