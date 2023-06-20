import React from "react";
import {
  Box,
  GridBlock,
  GridBlockItem,
  SehatQFooter,
  TelemedicineCampaignHeadline,
  TelemedicineHCPSorter,
  Text,
  TelemedicineHCPList,
  TelemedicineFilter,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { TelemedicineCampaignHead } from "@components/head";

export type TelemedicineCampaignPageDesktopProps = {
  page: string;
  perPage: string;
  sortBy?: string;
  userLat?: string;
  userLong?: string;
  query?: string;
  campaignSlug: string;
  city?: string;
  doctorExperience?: string;
  gender?: string;
  price?: string;
  specialitySlug?: string;
  campaignName: string;
};

export function TelemedicineCampaignPageDesktop(
  props: TelemedicineCampaignPageDesktopProps
) {
  return (
    <>
      <TelemedicineCampaignHead />
      <SehatqNavbar
        withCompanyPartner
        placeholderSearch="Cari nama dokter atau spesialisasi"
        searchNavigation={{ name: "TELEMED_CAMPAIGN" }}
      />
      <GridBlock my={6}>
        <GridBlockItem>
          <TelemedicineFilter
            {...props}
            resetQuery={{ slug: props.campaignSlug }}
            navigateName="TELEMED_CAMPAIGN"
          />
        </GridBlockItem>
        <GridBlockItem>
          <Text
            as="h1"
            fontSize="5xl"
            fontWeight="semibold"
            fontFamily="poppins"
            mb={6}
          >
            {props.campaignName}
          </Text>
          <TelemedicineCampaignHeadline campaignSlug={props.campaignSlug} />
          <Box my={6}>
            <TelemedicineHCPSorter {...props} navigateName="TELEMED_CAMPAIGN" />
          </Box>
          <TelemedicineHCPList {...props} navigateName="TELEMED_CAMPAIGN" />
        </GridBlockItem>
      </GridBlock>
      <Box marginY={8}>
        <SehatQFooter />
      </Box>
    </>
  );
}
