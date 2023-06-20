import React from "react";
import {
  PublicMentalHealthToolFaq,
  MentalHealthToolSection,
  VStack,
  Box,
  SehatQFooter,
  FloatingTelemedicineBanner,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { MentalHealthToolHead } from "@components/head";

export type MentalHealthToolMobileProps = {
  isMobile: boolean;
  isLogin: boolean;
};

export function MentalHealthToolMobile(props: MentalHealthToolMobileProps) {
  return (
    <>
      <MentalHealthToolHead />
      <Box background="iceBlue.500">
        <SehatQHeader variant="text" text="Cek Kesehatan Mental" />
        <VStack align="normal" spacing={3.5}>
          <MentalHealthToolSection {...props} />
          <Box px={4} background="white">
            <PublicMentalHealthToolFaq {...props} />
          </Box>
        </VStack>

        <Box background="white" p={3} pt={7} align="normal">
          <SehatQFooter {...props} />
        </Box>
      </Box>
      <FloatingTelemedicineBanner right="12px" bottom="62px" />
    </>
  );
}
