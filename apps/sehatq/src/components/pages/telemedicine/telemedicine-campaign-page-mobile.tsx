import {
  Box,
  HStack,
  SehatQFooter,
  TelemedicineCampaignHeadline,
  TelemedicineQuickFilter,
  TelemedicineHCPList,
  TelemedicineFilter,
} from "@sehatq/components";
import React from "react";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { TelemedicineCampaignHead } from "@components/head";

export type TelemedicineCampaignPageMobileProps = {
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

export function TelemedicineCampaignPageMobile(
  props: TelemedicineCampaignPageMobileProps
) {
  return (
    <>
      <TelemedicineCampaignHead />
      <SehatQHeader variant="text" text={props.campaignName} />
      <HStack px={4} pt={2} overflowX="auto" spacing={0.5}>
        <Box pr={1}>
          <TelemedicineFilter
            {...props}
            isMobile
            resetQuery={{ slug: props.campaignSlug }}
            navigateName="TELEMED_CAMPAIGN"
          />
        </Box>
        <TelemedicineQuickFilter {...props} navigateName="TELEMED_CAMPAIGN" />
      </HStack>
      <Box p={4}>
        <TelemedicineCampaignHeadline
          campaignSlug={props.campaignSlug}
          isMobile
        />
      </Box>
      <Box p={4}>
        <TelemedicineHCPList {...props} isMobile />
      </Box>
      <Box background="white" px={3} paddingBottom={3}>
        <SehatQFooter isMobile />
      </Box>
    </>
  );
}
