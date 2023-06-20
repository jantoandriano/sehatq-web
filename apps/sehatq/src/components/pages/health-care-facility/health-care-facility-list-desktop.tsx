import {
  Text,
  Box,
  GridBlock,
  GridBlockItem,
  HealthCareFacilityList,
  HealthCareFacilityFilters,
  SehatQFooter,
  HealthCareFacilitySorter,
  HCFFiltersResultSummary,
  HStack,
  HealthCareFacilityFaq,
  HCFContent,
  SimpleBlock,
  VStack,
  AdSlot,
} from "@sehatq/components";
import React from "react";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { HealthCareFacilityListHead } from "@components/head";
import { HCFsGPTProvider } from "@components/gpt-provider/health-care-facility-list";

export type HealthCareFacilityListDesktopProps = {
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
export function HealthCareFacilityListDesktop(
  props: HealthCareFacilityListDesktopProps
) {
  const { citySlug, procedureId, facility, partner, hcfTypeSlug, sortBy } =
    props;
  return (
    <>
      <HealthCareFacilityListHead />
      <HCFsGPTProvider {...props}>
        <>
          <SehatqNavbar
            withCompanyPartner
            placeholderSearch="Cari Fasilitas Kesehatan"
            searchNavigation={{ name: "HEALTH_CARE_FACILITIES" }}
          />
          <GridBlock my={6} isReverse={false}>
            <GridBlockItem>
              <HealthCareFacilityFilters
                {...props}
                cityDefaultValue={citySlug}
                partnerDefaultValue={partner}
                medicalFacilityDefaultValue={facility}
                procedureDefaultValue={procedureId}
                hcfTypeDefaultValue={hcfTypeSlug}
              />
              <Box mt={6}>
                <AdSlot divId="div-gpt-ad-mr2" />
              </Box>
            </GridBlockItem>
            <GridBlockItem>
              <Text
                as="h1"
                fontSize="4xl"
                fontWeight="semibold"
                fontFamily="poppins"
              >
                Cari Faskes
              </Text>
              {props.totalRecords > 0 ? (
                <HStack justify="space-between" my={4}>
                  <HCFFiltersResultSummary {...props} />
                  <HealthCareFacilitySorter
                    selectedSorter={sortBy ?? "terdekat"}
                    {...props}
                  />
                </HStack>
              ) : null}
              <HealthCareFacilityList
                {...props}
                adsMiddle={[
                  <AdSlot
                    key="div-gpt-ad-leaderboard"
                    divId="div-gpt-ad-leaderboard"
                  />,
                ]}
              />
            </GridBlockItem>
          </GridBlock>
          <SimpleBlock>
            <VStack spacing={4} marginTop={8} alignItems="flex-start">
              <HCFContent {...props} />
              <HealthCareFacilityFaq {...props} />
            </VStack>
          </SimpleBlock>
          <Box marginY={8}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </HCFsGPTProvider>
    </>
  );
}
