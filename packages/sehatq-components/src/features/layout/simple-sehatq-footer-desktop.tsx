import React from "react";
import { useAssets } from "@sehatq/utils";
import { Flex, Box, Text, useImage } from "../../user-interfaces";
import { SimpleBlock } from "./simple-block";

export function SimpleSehatQFooterDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["MINISTRY_OF_HEALTH", "SEHATQ_WITH_TEXT"]);
  return (
    <Box background="#EFF3F7" py={5}>
      <SimpleBlock>
        <Flex align="center" justify="space-between">
          <Image
            src={ASSETS.SEHATQ_WITH_TEXT}
            alt="logo-sehatq"
            height={25}
            width={114.5}
            layout="fixed"
            priority
          />
          <Text fontSize="sm" color="brownGrey.500">
            PT. SehatQ Harsana Emedika Jl. MH Thamrin no. 51, Jakarta 10350 -
            Indonesia Phone: +6221-27899827
          </Text>
        </Flex>
      </SimpleBlock>
    </Box>
  );
}
