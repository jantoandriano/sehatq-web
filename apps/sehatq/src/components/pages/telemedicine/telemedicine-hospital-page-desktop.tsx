import React from "react";
import {
  Box,
  GridBlock,
  GridBlockItem,
  SehatQFooter,
  TelemedicineHCPSorter,
  Text,
  TelemedicineHCPList,
  TelemedicineHCPFilter,
  Skeleton,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { TelemedicineHospitalHead } from "@components/head";

export type TelemedicineHospitalPageDesktopProps = {
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
  isLoading: boolean;
};

export function TelemedicineHospitalPageDesktop(
  props: TelemedicineHospitalPageDesktopProps
) {
  return (
    <>
      <TelemedicineHospitalHead />
      <SehatqNavbar
        withCompanyPartner
        placeholderSearch="Cari nama dokter atau spesialisasi"
        searchNavigation={{
          name: "TELEMED_FASKES_DETAIL",
        }}
      />
      <GridBlock my={6}>
        <GridBlockItem>
          <TelemedicineHCPFilter
            {...props}
            navigateName="TELEMED_FASKES_DETAIL"
            resetQuery={{ hospitalSlug: props.hospitalSlug }}
          />
        </GridBlockItem>
        <GridBlockItem>
          {props.isLoading ? (
            <Skeleton width="300px" height="42px" />
          ) : (
            <Text
              as="h1"
              fontSize="5xl"
              fontWeight="semibold"
              fontFamily="poppins"
            >
              {props.hospitalName}
            </Text>
          )}
          <Box my={6}>
            <TelemedicineHCPSorter
              {...props}
              navigateName="TELEMED_FASKES_DETAIL"
            />
          </Box>
          <TelemedicineHCPList
            {...props}
            navigateName="TELEMED_FASKES_DETAIL"
          />
        </GridBlockItem>
      </GridBlock>
      <Box marginY={8}>
        <SehatQFooter />
      </Box>
    </>
  );
}
