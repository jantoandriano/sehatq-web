import React from "react";

import { Box, HealthToolScoreDetail } from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";

interface Props {
  title: string;
  slug: string;
  userId: string;
  scoreId: string;
}

export function HealthToolScoreDetailPageMobile({
  title,
  slug,
  userId,
  scoreId,
}: Props) {
  return (
    <>
      <SehatQHeader
        variant="text"
        text={title ? `Detail ${title}` : "Kembali"}
        backNavigate={{
          name: "PROFILE_HEALTH_TOOL_SCORE_LIST",
          query: {
            healthToolSlug: slug,
            userId,
          },
        }}
      />
      <Box p={6}>
        <HealthToolScoreDetail isMobile scoreId={scoreId} slug={slug} />
      </Box>
    </>
  );
}
