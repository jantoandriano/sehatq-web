import React from "react";
import { Box, Fallback, Flex, Image, Text } from "@sehatq/components";
import { useAssets } from "@sehatq/utils";

export function ConsultationThankYou() {
  const ASSETS = useAssets(["CONSULTATION_THANK_YOU", "SEHATQ"]);

  return (
    <Flex flexDirection="column" align="center" justify="center" minH="100vh">
      <Image src={ASSETS.SEHATQ} alt="SehatQ" width={160} height={132} />
      <Box my="auto">
        <Fallback
          isMobile
          image={{
            src: ASSETS.CONSULTATION_THANK_YOU,
            width: 264,
            height: 264,
          }}
          layout="vertical"
          title={
            <Text mt={5}>
              Terima Kasih Sudah Menggunakan <br /> Layanan Chat Dokter SehatQ
            </Text>
          }
          description={
            <Text
              color="charcoalGrey"
              fontSize="sm"
              fontFamily="openSans"
              textAlign="center"
            >
              Catatan Dokter untuk konsultasi ini sudah <br /> dikirim ke
              emailmu. Sehat selalu, ya!
            </Text>
          }
        />
      </Box>
    </Flex>
  );
}
