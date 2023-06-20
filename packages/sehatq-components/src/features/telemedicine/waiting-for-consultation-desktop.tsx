import React from "react";
import { useAssets } from "@sehatq/utils";

import { Box, Text } from "../../user-interfaces";
import { Fallback } from "../general";

export function WaitingForConsultationDesktop() {
  const ASSETS = useAssets(["ILLUSTRATION_WAITING"]);
  return (
    <>
      <Box>
        <Fallback
          image={{
            src: ASSETS.ILLUSTRATION_WAITING,
            width: 520,
            height: 520,
          }}
          layout="vertical"
          title="Kamu segera terhubung dengan dokter"
          description={
            <Text
              color="charcoalGrey"
              fontSize="lg"
              fontFamily="openSans"
              textAlign="center"
              width="545px"
            >
              Kamu bisa menyiapkan pertanyaan untuk disampaikan kepada dokter
              saat konsultasi
            </Text>
          }
        />
      </Box>
    </>
  );
}
