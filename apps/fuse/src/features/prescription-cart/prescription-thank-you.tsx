import React from "react";
import { Box, Fallback, Flex, Image, Text } from "@sehatq/components";
import { useAssets } from "@sehatq/utils";

export function PrescriptionThankYou() {
  const ASSETS = useAssets(["THUMBS_UP", "SEHATQ"]);

  return (
    <Flex flexDirection="column" align="center" justify="center" minH="100vh">
      <Image src={ASSETS.SEHATQ} alt="SehatQ" width={160} height={132} />
      <Box my="auto">
        <Fallback
          isMobile
          image={{
            src: ASSETS.THUMBS_UP,
            width: 264,
            height: 264,
          }}
          layout="vertical"
          title="Obatmu Segera Dikirim"
          description={
            <Text
              color="charcoalGrey"
              fontSize="sm"
              fontFamily="openSans"
              textAlign="center"
            >
              Untuk detail obat dan alamat pengiriman, bisa <br /> kamu cek di
              email. Cepat sembuh, ya!
            </Text>
          }
        />
      </Box>
    </Flex>
  );
}
