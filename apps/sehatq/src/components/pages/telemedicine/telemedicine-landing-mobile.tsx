import React from "react";
import {
  Box,
  Text,
  MyBookedTelemedicineBanner,
  SearchIcon,
  Divider,
  CorporateTelemedicineBanner,
  RegularTelemedicineBanner,
  SehatQFooter,
  TelemedicineLandingHCFS,
  TelemedicineLandingHCPS,
  ConsultationRedirection,
  TelemedicineSpecialities,
  OfficialPartnerBanner,
  TelemedicineNavigation,
} from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";
import { TelemedicineLandingHead } from "@components/head";

type TelemedicineLandingMobileProps = {
  isLogin: boolean;
  isCorporate: boolean;
};

export function TelemedicineLandingMobile(
  props: TelemedicineLandingMobileProps
) {
  const { isLogin, isCorporate } = props;
  return (
    <>
      {isLogin ? (
        <ConsultationRedirection currentNavigationName="TELEMEDICINES" />
      ) : null}
      <TelemedicineLandingHead />
      <SehatQHeader
        variant="search"
        placeholderSearch="Cari dokter, faskes atau spesialisasi"
        leftElement={<SearchIcon color="brownGrey.500" />}
        searchNavigation={{ name: "TELEMED_HCPS" }}
      />
      <Box paddingX={4} paddingY={3}>
        <OfficialPartnerBanner />
      </Box>
      <Box background="paleBlue.500" p={4}>
        <Text fontWeight="semibold" fontFamily="poppins" mb={3}>
          Konsultasi Harga Terjangkau
        </Text>
        <RegularTelemedicineBanner isMobile={true} />
      </Box>
      {isLogin ? (
        <Box pb={1}>
          <MyBookedTelemedicineBanner isMobile={true} />
          <Divider
            backgroundColor="#f3f3f3"
            orientation="vertical"
            height="10px"
          />
        </Box>
      ) : null}
      <Box paddingX={4} marginY={4}>
        <TelemedicineSpecialities isMobile />
      </Box>
      <Box marginY={4} background="white">
        <TelemedicineLandingHCPS isMobile={true} />
      </Box>
      {!isCorporate ? <CorporateTelemedicineBanner isMobile={true} /> : null}
      <Box background="white" marginY={4}>
        <TelemedicineLandingHCFS isMobile={true} />
      </Box>
      <Box background="white" px={3} paddingBottom={3}>
        <SehatQFooter isMobile={true} />
      </Box>
      <Box position="sticky" bottom="0" zIndex="docked">
        <TelemedicineNavigation isMobile activeNavigation="explore" />
      </Box>
    </>
  );
}
