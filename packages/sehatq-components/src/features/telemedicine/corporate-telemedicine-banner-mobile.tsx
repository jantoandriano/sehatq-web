import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import { Box, LinkBox, LinkOverlay, Text } from "../../user-interfaces";

export function CorporateTelemedicineBannerMobile() {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["CORP_MEMBER"]);
  return (
    <Box
      px={4}
      py={5}
      backgroundImage="linear-gradient(to bottom, rgba(214, 241, 244, 0) 38%, #d6f1f4)"
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontFamily="poppins"
        fontWeight="semibold"
        mb={2.5}
      >
        Layanan Medis untuk Perusahaan
      </Text>
      <LinkBox>
        <Box
          backgroundImage={ASSETS.CORP_MEMBER}
          backgroundRepeat="no-repeat"
          backgroundPosition="right center"
          backgroundSize="cover"
          justifyContent="flex-start"
          width="full"
        >
          <Box px={4} py={3}>
            <Navigate name="PARTNER_CORPORATE">
              <LinkOverlay
                fontSize="sm"
                fontFamily="poppins"
                fontWeight="semibold"
                color="white"
              >
                Paket MCU Mulai dari 75 Ribu
              </LinkOverlay>
            </Navigate>
            <Text lineHeight="4" fontSize="xs" width="170px" color="white">
              Dan banyak benefit kesehatan lainnya untuk karyawan Anda.
            </Text>
          </Box>
        </Box>
      </LinkBox>
    </Box>
  );
}
