import React from "react";
import {
  Box,
  SearchIcon,
  VStack,
  StackDivider,
  TelemedicineLandingCampaign,
  ConsultationRedirection,
  TelemedicineNavigation,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { TelemedicineCampaignListHead } from "@components/head";

type TelemedicineCampaignListPageMobileProps = {
  isLogin: boolean;
  hasCampaign1: boolean;
  hasCampaign2: boolean;
};

export function TelemedicineCampaignListPageMobile(
  props: TelemedicineCampaignListPageMobileProps
) {
  const { isLogin, hasCampaign1, hasCampaign2 } = props;
  return (
    <Box minHeight="100vh" pb="66px">
      {isLogin ? (
        <ConsultationRedirection currentNavigationName="TELEMED_CAMPAIGNS" />
      ) : null}
      <TelemedicineCampaignListHead />
      <SehatQHeader
        variant="search"
        placeholderSearch="Cari dokter, faskes atau spesialisasi"
        leftElement={<SearchIcon color="brownGrey.500" />}
        searchNavigation={{ name: "TELEMED_HCPS" }}
      />
      <VStack
        py={5}
        spacing={5}
        divider={<StackDivider backgroundColor="#f3f3f3" height="10px" />}
      >
        {hasCampaign1 ? (
          <TelemedicineLandingCampaign
            isMobile={true}
            landingCampaignType="landing-1"
          />
        ) : null}
        {hasCampaign2 ? (
          <TelemedicineLandingCampaign
            isMobile={true}
            landingCampaignType="landing-2"
          />
        ) : null}
      </VStack>
      <Box position="fixed" bottom="0" width="full">
        <TelemedicineNavigation isMobile activeNavigation="promo" />
      </Box>
    </Box>
  );
}
