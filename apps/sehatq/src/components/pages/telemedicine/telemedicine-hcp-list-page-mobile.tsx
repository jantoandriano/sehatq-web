import {
  Box,
  HStack,
  SehatQFooter,
  TelemedicineHCPFilter,
  TelemedicineHCPList,
  TelemedicineHCPQuickFilter,
  TelemedicineNavigation,
} from "@sehatq/components";
import React from "react";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { TelemedicineHCPListHead } from "@components/head";

export type TelemedicineHCPListPageMobileProps = {
  page: string;
  perPage: string;
  sortBy?: string;
  userLat?: string;
  userLong?: string;
  query?: string;
  campaignSlug?: string;
  city?: string;
  doctorExperience?: string;
  gender?: string;
  price?: string;
  specialitySlug?: string;
  specialityName?: string | undefined;
};

export function TelemedicineHCPListPageMobile(
  props: TelemedicineHCPListPageMobileProps
) {
  return (
    <>
      <TelemedicineHCPListHead />
      <SehatQHeader
        variant="text"
        text={props.specialityName || "Semua Spesialis"}
        withSearch
        placeholderSearch="Cari nama dokter atau spesialisasi"
        searchNavigation={{ name: "TELEMED_HCPS" }}
      />
      <HStack px={4} overflowX="auto" spacing={0.5}>
        <Box pr={1}>
          <TelemedicineHCPFilter {...props} isMobile />
        </Box>
        <TelemedicineHCPQuickFilter {...props} />
      </HStack>
      <Box p={4}>
        <TelemedicineHCPList {...props} isMobile />
      </Box>
      <Box background="white" px={3} paddingBottom={3}>
        <SehatQFooter isMobile />
      </Box>
      <Box position="sticky" bottom="0" zIndex="docked">
        <TelemedicineNavigation isMobile activeNavigation="speciality" />
      </Box>
    </>
  );
}
