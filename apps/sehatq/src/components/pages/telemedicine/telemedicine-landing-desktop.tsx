import React from "react";
import {
  Box,
  SehatQFooter,
  TelemedicineSpecialities,
  ConsultationRedirection,
  RegularTelemedicineBanner,
  useImage,
  Flex,
  Text,
  SimpleBlock,
  TelemedicineNavigation,
  TelemedicineLandingHCFS,
  CorporateTelemedicineBanner,
  RegularTelemedicineInfo,
  AspectRatio,
  TelemedicineLandingHCPS,
  MyBookedTelemedicineBanner,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { TelemedicineLandingHead } from "@components/head";

type TelemedicineLandingDesktopProps = {
  allowFreeChat: boolean;
  isLogin: boolean;
  isCorporate: boolean;
};

export function TelemedicineLandingDesktop(
  props: TelemedicineLandingDesktopProps
) {
  const ASSETS = useAssets(["TELEMED_LANDING_BG", "TELEMED_DOCTORS_BANNER"]);
  const { allowFreeChat, isLogin, isCorporate } = props;
  const Image = useImage();
  return (
    <>
      {isLogin ? (
        <ConsultationRedirection currentNavigationName="TELEMEDICINES" />
      ) : null}
      <TelemedicineLandingHead />
      <SehatqNavbar
        withCompanyPartner
        placeholderSearch='Cari Nama Dokter, Contoh "dr. Budi"'
        searchNavigation={{ name: "TELEMED_HCPS" }}
      />
      <SimpleBlock>
        <Flex
          mt={8}
          p={9}
          borderRadius="3xl"
          backgroundColor="sea.500"
          backgroundImage={ASSETS.TELEMED_LANDING_BG}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center center"
          alignItems="start"
        >
          <Box flex={1}>
            <Text
              display="block"
              fontFamily="poppins"
              color="white"
              fontWeight="semibold"
              fontSize="5xl"
              mb={1}
            >
              Konsultasi Harga Terjangkau
            </Text>
            <Text display="block" color="white" fontSize="xl">
              Kami pilihkan dokter umum untukmu
            </Text>
            <Box ml={-10} mt={-2}>
              <Image
                src={ASSETS.TELEMED_DOCTORS_BANNER}
                alt="Kami pilihkan dokter umum untukmu"
                width={444}
                height={296}
                priority={true}
              />
            </Box>
          </Box>
          <Box width="500px">
            <RegularTelemedicineBanner isMobile={false} />
          </Box>
        </Flex>
        <Box mt="-44px" zIndex={1} position="relative">
          <RegularTelemedicineInfo
            allowFreeChat={allowFreeChat}
            isMobile={false}
          />
        </Box>
        {isLogin ? (
          <Box mt={8}>
            <MyBookedTelemedicineBanner isMobile={false} />
          </Box>
        ) : null}
        <Box mt={14}>
          <TelemedicineNavigation />
        </Box>
        <Box mt={14}>
          <TelemedicineSpecialities />
        </Box>
        <Box mt={14}>
          <TelemedicineLandingHCPS isMobile={false} />
        </Box>
        {!isCorporate ? (
          <AspectRatio ratio={1086 / 203} mt={14}>
            <CorporateTelemedicineBanner />
          </AspectRatio>
        ) : null}
        <Box mt={14}>
          <TelemedicineLandingHCFS isMobile={false} />
        </Box>
      </SimpleBlock>
      <Box marginBottom={10} marginTop={32}>
        <SehatQFooter isMobile={false} />
      </Box>
    </>
  );
}
