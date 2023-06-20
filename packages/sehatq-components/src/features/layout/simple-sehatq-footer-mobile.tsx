import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, Text, useImage } from "../../user-interfaces";

export function SimpleSehatQFooterMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["MINISTRY_OF_HEALTH", "SEHATQ_WITH_TEXT"]);
  return (
    <Box paddingY={5} paddingX={4} background="#EFF3F7">
      <Image
        src={ASSETS.SEHATQ_WITH_TEXT}
        alt="logo-sehatq"
        height={31}
        width={142}
        layout="fixed"
        priority
      />
      <Text fontSize="xs" color="brownGrey.500" marginTop={4}>
        PT. SehatQ Harsana Emedika <br />
        Jl. MH Thamrin no. 51, Jakarta 10350 - Indonesia Phone: +6221-27899827
      </Text>
    </Box>
  );
}
