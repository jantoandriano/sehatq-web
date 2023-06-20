import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";

import { Box, useImage, Text, Link } from "../../user-interfaces";
import { SimpleBlock } from "../layout";

export function CardiacClinicHeadlineDesktop() {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ILLUSTRATION_CARDIAC"]);

  return (
    <Box position="relative" width="full">
      <Image
        priority
        src={ASSETS.ILLUSTRATION_CARDIAC}
        alt="Headline Penyakit Dalam"
        height={650}
        width={1440}
        layout="responsive"
        wrapperProps={{
          width: "100%",
        }}
      />
      <SimpleBlock
        position="absolute"
        top="223px"
        left={0}
        right={0}
        zIndex={1}
        fontFamily="poppins"
      >
        <Text
          w="570px"
          fontSize="40px"
          color="white"
          fontWeight="bold"
          lineHeight="60px"
          mb={3}
        >
          Pastikan Jantungmu Berdetak Sehat
        </Text>
        <Text w="570px" fontSize="md" color="white" mb={7}>
          Penyakit jantung masih menjadi penyebab kematian tertinggi di
          Indonesia
        </Text>
        <Navigate name="TELEMED_HCPS" query={{ slugs: ["jantung"] }}>
          <Link
            display="flex"
            color="#2E8E8E"
            borderRadius="xl"
            bgColor="white"
            fontSize="sm"
            fontFamily="poppins"
            fontWeight="semibold"
            borderColor="main.500"
            borderWidth="1px"
            width="251px"
            height="52px"
            justifyContent="center"
            alignItems="center"
            boxShadow="2xl"
            variant="unstyled"
          >
            Chat Dokter Kardiologi
          </Link>
        </Navigate>
      </SimpleBlock>
    </Box>
  );
}
