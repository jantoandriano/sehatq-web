import React from "react";
import { Fallback, Box, Flex, Text, Image, Button } from "@sehatq/components";
import { useAssets } from "@sehatq/utils";

export function ConsultationIneligible() {
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
          src: "/images/consultation-ineligible.svg",
          width: 264,
          height: 264,
        }}
        layout="vertical"
        title="Fitur Ini Belum Tersedia Untukmu"
        description={
          <Text
            color="charcoalGrey"
            fontSize="sm"
            fontFamily="openSans"
            textAlign="center"
          >
            Sepertinya kamu belum memenuhi syarat untuk menggunakan fitur
            konsultasi Dokter. Coba cek kembali asuransimu, ya.
          </Text>
        }
      />
      <Box marginTop="auto">
        <Button width="100%">Refresh</Button>
      </Box>
    </Flex>
  );
}
