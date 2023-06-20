import React from "react";
import {
  Box,
  GridBlock,
  GridBlockItem,
  SehatQFooter,
  SimpleBlock,
  DiseaseList,
  DiseaseCategoryFilter,
  VStack,
  AdSlot,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { DiseasesHead } from "@components/head";
import { DiseasesGPTProvider } from "@components/gpt-provider/diseases";

type DiseaseListDesktopProps = {
  categorySlug: string;
  firstCharSlug: string;
};

export function DiseaseListDesktop(props: DiseaseListDesktopProps) {
  const { categorySlug, firstCharSlug } = props;
  return (
    <>
      <DiseasesHead />
      <DiseasesGPTProvider {...props}>
        <>
          <SehatqNavbar withCompanyPartner />
          <Box bg="#F8F8F8" marginBottom="35px" pt="14px">
            <SimpleBlock>
              <DiseaseCategoryFilter
                isMobile={false}
                currentCategorySlug={categorySlug}
              />
            </SimpleBlock>
          </Box>
          <GridBlock my={6} isReverse>
            <GridBlockItem>
              <DiseaseList
                isMobile={false}
                categorySlug={categorySlug}
                alphabetSlug={firstCharSlug}
                slug={categorySlug}
                adsMiddle={<AdSlot divId="div-gpt-ad-leaderboard" />}
              />
            </GridBlockItem>
            <GridBlockItem>
              <Box position="sticky" top="144px">
                <VStack spacing={4}>
                  <AdSlot divId="div-gpt-ad-mr1" />
                  <AdSlot divId="div-gpt-ad-mr2" />
                </VStack>
              </Box>
            </GridBlockItem>
          </GridBlock>
          <Box marginBottom={10} marginTop={32}>
            <SehatQFooter isMobile={false} />
          </Box>
        </>
      </DiseasesGPTProvider>
    </>
  );
}
