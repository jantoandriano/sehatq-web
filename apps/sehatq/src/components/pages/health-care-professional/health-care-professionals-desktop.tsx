import {
  AdSlot,
  Text,
  Box,
  GridBlock,
  GridBlockItem,
  SimpleBlock,
  HealthCareProfessionalList,
  HealthCareProfessionalFilters,
  SehatQFooter,
  HStack,
  VStack,
  SelectedHCPFiltersResultSummary,
  HealthCareProfessionalSorter,
  HCPContent,
  HealthCareProfessionalFaq,
} from "@sehatq/components";
import React from "react";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { HCPListHead } from "@components/head";
import { HCPsGPTProvider } from "@components/gpt-provider/health-care-professionals";

export type HealthCareProfessionalsDesktopProps = {
  isMobile: boolean;
  query?: string;
  page: number;
  perPage: number;
  citySlug: string;
  procedureId: string;
  specialitySlug: string;
  gender: string;
  userLat: string;
  userLong: string;
  scheduleDayId: string;
  sortBy?: string;
  totalRecords: number;
};
export function HealthCareProfessionalsDesktop(
  props: HealthCareProfessionalsDesktopProps
) {
  const {
    citySlug,
    procedureId,
    specialitySlug,
    gender,
    scheduleDayId,
    sortBy,
    totalRecords,
  } = props;
  return (
    <>
      <HCPListHead />
      <HCPsGPTProvider {...props}>
        <>
          <SehatqNavbar
            withCompanyPartner
            placeholderSearch="Cari di Dokter"
            searchNavigation={{ name: "HEALTH_CARE_PROFESIONAL" }}
          />
          <GridBlock my={6} isReverse={false}>
            <GridBlockItem>
              <HealthCareProfessionalFilters
                {...props}
                cityDefaultValue={citySlug}
                genderDefaultValue={gender}
                specialityDefaultValue={specialitySlug}
                procedureDefaultValue={procedureId}
                scheduleDefaultValue={scheduleDayId}
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
                Cari Dokter
              </Text>
              {totalRecords > 0 && (
                <HStack mb={4} justify="space-between">
                  <Box width="50%">
                    <SelectedHCPFiltersResultSummary {...props} />
                  </Box>
                  <HealthCareProfessionalSorter
                    selectedSorter={sortBy ?? "terdekat"}
                    {...props}
                  />
                </HStack>
              )}
              <HealthCareProfessionalList
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
              <HCPContent {...props} />
              <HealthCareProfessionalFaq {...props} />
            </VStack>
          </SimpleBlock>
          <Box marginY={8}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </HCPsGPTProvider>
    </>
  );
}
