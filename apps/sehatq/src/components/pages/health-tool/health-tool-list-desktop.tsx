import React from "react";
import {
  Box,
  SehatQFooter,
  HealthToolListHeadline,
  GridBlock,
  GridBlockItem,
  HealthToolList,
  HealthToolListContent,
  AdSlot,
} from "@sehatq/components";
import { HealthToolListHead } from "@components/head";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { HealthToolListGPTProvider } from "@components/gpt-provider/health-tool-list";

export function HealthToolListDesktop() {
  return (
    <>
      <HealthToolListHead />
      <HealthToolListGPTProvider>
        <>
          <SehatqNavbar withCompanyPartner />
          <HealthToolListHeadline isMobile={false} />
          <GridBlock my={6} isReverse>
            <GridBlockItem>
              <Box mt={6}>
                <HealthToolList />
              </Box>
              <Box mt="60px">
                <HealthToolListContent />
              </Box>
            </GridBlockItem>
            <GridBlockItem>
              <Box position="sticky" top="144px">
                <AdSlot divId="div-gpt-ad-mr1" />
              </Box>
            </GridBlockItem>
          </GridBlock>
          <Box marginTop="50">
            <SehatQFooter isMobile={false} />
          </Box>
        </>
      </HealthToolListGPTProvider>
    </>
  );
}
