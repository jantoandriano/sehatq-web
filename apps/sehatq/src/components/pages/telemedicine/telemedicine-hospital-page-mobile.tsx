import {
  Box,
  HStack,
  SehatQFooter,
  TelemedicineHCPList,
  TelemedicineHCPFilter,
  TelemedicineHCPQuickFilter,
} from "@sehatq/components";
import React from "react";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { TelemedicineHospitalHead } from "@components/head";

export type TelemedicineHospitalPageMobileProps = {
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
  hospitalName: string;
  hospitalSlug: string;
};

export function TelemedicineHospitalPageMobile(
  props: TelemedicineHospitalPageMobileProps
) {
  return (
    <>
      <TelemedicineHospitalHead />
      <SehatQHeader variant="text" text={props.hospitalName} />
      <HStack px={4} pt={2} overflowX="auto" spacing={0.5}>
        <Box pr={1}>
          <TelemedicineHCPFilter
            {...props}
            isMobile
            resetQuery={{ hospitalSlug: props.hospitalSlug }}
            navigateName="TELEMED_FASKES_DETAIL"
          />
        </Box>
        <TelemedicineHCPQuickFilter
          {...props}
          navigateName="TELEMED_FASKES_DETAIL"
        />
      </HStack>
      <Box p={4}>
        <TelemedicineHCPList {...props} isMobile />
      </Box>
      <Box background="white" px={3} paddingBottom={3}>
        <SehatQFooter isMobile />
      </Box>
    </>
  );
}
