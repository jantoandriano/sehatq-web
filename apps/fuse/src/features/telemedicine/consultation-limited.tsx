import React from "react";
import { Fallback, Box, Flex, Text, Image, Button } from "@sehatq/components";
import { useAssets } from "@sehatq/utils";

export function ConsultationLimited() {
  const ASSETS = useAssets(["SEHATQ"]);

  return (
    <Flex
      flex="1"
      flexDirection="column"
      paddingY={3}
      paddingX={5}
      height="100vh"
    >
      <Flex justifyContent="center">
        <Image src={ASSETS.SEHATQ} alt="SehatQ" width={250} height={250} />
      </Flex>

      <Fallback
        isMobile
        image={{
          src: "/images/consultation-limit.svg",
          width: 264,
          height: 264,
        }}
        layout="vertical"
        title="Kuota Konsultasi Sudah Habis"
        description={
          <Text
            color="charcoalGrey"
            fontSize="sm"
            fontFamily="openSans"
            textAlign="center"
          >
            Kamu sudah menggunakan fitur Konsultasi Dokter sebanyak 1 kali di
            bulan ini. Untuk info lebih lanjut, silakan kontak admin.
          </Text>
        }
      />
      <Box marginTop="auto">
        <Button width="100%">Kontak Admin</Button>
      </Box>
    </Flex>
  );
}
