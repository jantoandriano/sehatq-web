import React from "react";
import {
  GridBlock,
  GridBlockItem,
  Box,
  VStack,
  SimpleGrid,
  SehatQFooter,
  AdSlot,
  ArticlesSection,
  DiseasesSection,
  MedicalProceduresSection,
  ReviewsSection,
  TagContent,
  TagHeadline,
  FloatingTelemedicineBanner,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { TagHead } from "@components/head";
import { TagGPTProvider } from "@components/gpt-provider/tag";

export type TagDesktopProps = {
  isMobile: boolean;
  tagSlug: string;
};

export function TagDesktop(props: TagDesktopProps) {
  return (
    <>
      <TagHead />
      <TagGPTProvider {...props}>
        <>
          <SehatqNavbar withCompanyPartner />
          <GridBlock my={6} isReverse>
            <GridBlockItem>
              <VStack align="normal" spacing={5} width={760}>
                <TagHeadline {...props} />
                <SimpleGrid columns={2} spacingX={10} spacingY={8}>
                  <ArticlesSection {...props} />
                  <DiseasesSection {...props} />
                  <MedicalProceduresSection {...props} />
                  <ReviewsSection {...props} />
                </SimpleGrid>
                <TagContent {...props} />
              </VStack>
            </GridBlockItem>
            <GridBlockItem>
              <Box position="sticky" top="144px">
                <AdSlot divId="div-gpt-ad-mr1" />
              </Box>
            </GridBlockItem>
          </GridBlock>
          <Box marginBottom={10} marginTop={32}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </TagGPTProvider>
      <FloatingTelemedicineBanner right="30px" bottom="30px" />
    </>
  );
}
