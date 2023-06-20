import React from "react";
import {
  Box,
  Text,
  SehatQFooter,
  TelemedicineLandingCampaign,
  ConsultationRedirection,
  SimpleBlock,
  VStack,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { TelemedicineCampaignListHead } from "@components/head";

type TelemedicineCampaignListDesktopPageProps = {
  isLogin: boolean;
};

export function TelemedicineCampaignListPageDesktop(
  props: TelemedicineCampaignListDesktopPageProps
) {
  const { isLogin } = props;
  return (
    <>
      {isLogin ? (
        <ConsultationRedirection currentNavigationName="TELEMED_CAMPAIGNS" />
      ) : null}
      <TelemedicineCampaignListHead />
      <SehatqNavbar
        withCompanyPartner
        placeholderSearch='Cari Nama Dokter, Contoh "dr. Budi"'
        searchNavigation={{ name: "TELEMED_HCPS" }}
      />
      <SimpleBlock pt={8}>
        <Text fontSize="5xl" fontFamily="poppins" fontWeight="semibold" mb={6}>
          Promo
        </Text>
        <VStack spacing={14}>
          <TelemedicineLandingCampaign
            isMobile={false}
            landingCampaignType="landing-1"
          />
          <TelemedicineLandingCampaign
            isMobile={false}
            landingCampaignType="landing-2"
          />
        </VStack>
      </SimpleBlock>
      <Box marginBottom={10} marginTop={32}>
        <SehatQFooter isMobile={false} />
      </Box>
    </>
  );
}
