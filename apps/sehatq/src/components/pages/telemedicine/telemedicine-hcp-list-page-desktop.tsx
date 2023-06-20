import React from "react";
import {
  Box,
  GridBlock,
  GridBlockItem,
  SehatQFooter,
  TelemedicineHCPFilter,
  TelemedicineHCPList,
  TelemedicineHCPSorter,
  Text,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { TelemedicineHCPListHead } from "@components/head";

export type TelemedicineHCPListPageDesktopProps = {
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

export function TelemedicineHCPListPageDesktop(
  props: TelemedicineHCPListPageDesktopProps
) {
  return (
    <>
      <TelemedicineHCPListHead />
      <SehatqNavbar
        withCompanyPartner
        placeholderSearch="Cari nama dokter atau spesialisasi"
        searchNavigation={{
          name: "TELEMED_HCPS",
          query: {
            page: "1",
          },
        }}
      />
      <GridBlock my={6}>
        <GridBlockItem>
          <TelemedicineHCPFilter {...props} />
        </GridBlockItem>
        <GridBlockItem>
          <Text
            as="h1"
            fontSize="4xl"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            {props.specialityName || "Semua Spesialis"}
          </Text>
          <Box my={6}>
            <TelemedicineHCPSorter {...props} />
          </Box>
          <TelemedicineHCPList {...props} />
        </GridBlockItem>
      </GridBlock>
      <Box marginY={8}>
        <SehatQFooter />
      </Box>
    </>
  );
}
