import React from "react";
import { Box, HealthToolRecordList } from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";

interface Props {
  userId: string;
}

export function HealthToolLandingMobile({ userId }: Props) {
  return (
    <>
      <SehatQHeader variant="text" text="Health Record" />
      <Box py={8} px={4}>
        <HealthToolRecordList isMobile userId={userId} />
      </Box>
    </>
  );
}
