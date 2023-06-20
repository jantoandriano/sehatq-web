import React from "react";
import {
  AdSlot,
  Box,
  Center,
  Divider,
  HealthCareProfessionalFilters,
  HealthCareProfessionalList,
  HealthCareProfessionalSorter,
  HStack,
  VStack,
  SelectedHCPFiltersResultSummary,
  SehatQFooter,
  HCPContent,
  HealthCareProfessionalFaq,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { HCPListHead } from "@components/head";
import { HCPsGPTProvider } from "@components/gpt-provider/health-care-professionals";

export type HealthCareProfessionalsMobileProps = {
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

export function HealthCareProfessionalsMobile(
  props: HealthCareProfessionalsMobileProps
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
          <SehatQHeader
            variant="text"
            text="Cari Dokter"
            withSearch
            placeholderSearch="Cari Nama Dokter"
            searchNavigation={{ name: "HEALTH_CARE_PROFESIONAL" }}
          />
          {totalRecords > 0 && (
            <Box px={4} mb={4}>
              <SelectedHCPFiltersResultSummary {...props} />
            </Box>
          )}
          <Box px={4} marginBottom={8}>
            <HealthCareProfessionalList
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
                <HealthCareProfessionalSorter
                  selectedSorter={sortBy ?? "terdekat"}
                  {...props}
                />
                <HealthCareProfessionalFilters
                  {...props}
                  cityDefaultValue={citySlug}
                  genderDefaultValue={gender}
                  specialityDefaultValue={specialitySlug}
                  procedureDefaultValue={procedureId}
                  scheduleDefaultValue={scheduleDayId}
                />
              </HStack>
            </Center>
          </Box>
          <VStack spacing={4} px={3} alignItems="flex-start">
            <HCPContent {...props} />
            <HealthCareProfessionalFaq {...props} isMobile={true} />
          </VStack>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" />
          <Box background="white" px={3} paddingBottom={3}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </HCPsGPTProvider>
    </>
  );
}
