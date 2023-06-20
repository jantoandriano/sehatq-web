import React from "react";
import {
  Box,
  SehatQFooter,
  DiseaseList,
  AdSlot,
  Center,
  DiseaseCategoryFilter,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { DiseasesHead } from "@components/head";
import { DiseasesGPTProvider } from "@components/gpt-provider/diseases";

type DiseaseListMobileProps = {
  categorySlug: string;
  firstCharSlug: string;
};

export function DiseaseListMobile(props: DiseaseListMobileProps) {
  const { categorySlug, firstCharSlug } = props;
  return (
    <>
      <DiseasesHead />
      <DiseasesGPTProvider isMobile {...props}>
        <>
          <SehatQHeader variant="search" />
          <DiseaseList
            isMobile
            categorySlug={categorySlug}
            alphabetSlug={firstCharSlug}
            slug={categorySlug}
            adsTop={<AdSlot divId="div-gpt-ad-mr1" />}
            adsBottom={<AdSlot divId="div-gpt-ad-leaderboard" />}
          />
          <Center
            position="sticky"
            bottom="58px"
            zIndex="1"
            width="full"
            marginY={4}
          >
            <Box
              w="124px"
              bg="white"
              h="40px"
              borderRadius="4xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              boxShadow="base"
            >
              <DiseaseCategoryFilter
                isMobile
                currentCategorySlug={categorySlug}
              />
            </Box>
          </Center>
          <Box background="white" p={3} pt={7} align="normal">
            <SehatQFooter isMobile />
          </Box>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" />
        </>
      </DiseasesGPTProvider>
    </>
  );
}
