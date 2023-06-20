import React from "react";
import {
  AdSlot,
  Box,
  Center,
  Divider,
  HCFContent,
  HCFFiltersResultSummary,
  HealthCareFacilityFaq,
  HealthCareFacilityFilters,
  HealthCareFacilityList,
  HealthCareFacilitySorter,
  HStack,
  SehatQFooter,
  VStack,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { HealthCareFacilityListHead } from "@components/head";
import { HCFsGPTProvider } from "@components/gpt-provider/health-care-facility-list";

export type HealthCareFacilityListMobileProps = {
  isMobile: boolean;
  query?: string;
  page: string;
  perPage: string;
  totalRecords: number;
  sortBy?: string;
  userLat?: string;
  userLong?: string;
  partner?: string;
  hcfTypeSlug?: string;
  procedureId?: string;
  facility?: string;
  citySlug?: string;
};

export function HealthCareFacilityListMobile(
  props: HealthCareFacilityListMobileProps
) {
  const { citySlug, procedureId, facility, partner, hcfTypeSlug, sortBy } =
    props;
  return (
    <>
      <HealthCareFacilityListHead />
      <HCFsGPTProvider {...props}>
        <>
          <SehatQHeader
            variant="text"
            text="Cari Faskes"
            withSearch
            placeholderSearch="Cari Fasilitas Kesehatan"
            searchNavigation={{ name: "HEALTH_CARE_FACILITIES" }}
          />
          <Box px={4} marginBottom={8}>
            <Box mb={4}>
              <HCFFiltersResultSummary {...props} />
            </Box>
            <HealthCareFacilityList
              {...props}
              adsMiddle={[
                <AdSlot
                  key="div-gpt-ad-leaderboard"
                  divId="div-gpt-ad-leaderboard"
                />,
                <AdSlot
                  key="div-gpt-ad-middleleaderboard"
                  divId="div-gpt-ad-middleleaderboard"
                />,
              ]}
            />
            {props.totalRecords > 0 ? (
              <Center
                position="sticky"
                bottom="58px"
                zIndex="docked"
                width="full"
                marginTop={4}
              >
                <HStack
                  textAlign="center"
                  background="white"
                  borderRadius="4xl"
                  width="212px"
                  height="41px"
                  pl={5}
                  pr={5}
                  justify="space-between"
                  divider={
                    <Divider
                      height="20px"
                      orientation="vertical"
                      borderColor="veryLightPink"
                      border="solid 0.5px"
                    />
                  }
                  boxShadow="base"
                >
                  <HealthCareFacilitySorter
                    selectedSorter={sortBy ?? "terdekat"}
                    {...props}
                  />
                  <HealthCareFacilityFilters
                    {...props}
                    cityDefaultValue={citySlug}
                    partnerDefaultValue={partner}
                    medicalFacilityDefaultValue={facility}
                    procedureDefaultValue={procedureId}
                    hcfTypeDefaultValue={hcfTypeSlug}
                  />
                </HStack>
              </Center>
            ) : null}
          </Box>
          <VStack spacing={4} px={3} alignItems="flex-start">
            <HCFContent {...props} isMobile />
            <HealthCareFacilityFaq {...props} isMobile />
          </VStack>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" />
          <Box background="white" px={3} paddingBottom={3}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </HCFsGPTProvider>
    </>
  );
}
