import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";

import { Box, useImage, Text, Link } from "../../user-interfaces";

export function CardiacClinicHeadlineMobile() {
  const Image = useImage();
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ILLUSTRATION_CARDIAC_MOBILE"]);

  return (
    <Box position="relative" width="full">
      <Box position="absolute" zIndex={1} top="107px" left={4} right={4}>
        <Text
          fontSize="5xl"
          color="white"
          fontWeight="bold"
          fontFamily="poppins"
        >
          Pastikan Jantungmu Berdetak Sehat
        </Text>
        <Text
          fontSize="sm"
          color="white"
          mb={7}
          lineHeight={7}
          fontFamily="poppins"
        >
          Penyakit jantung sampai saat ini masih menjadi pembunuh nomor satu di
          Indonesia
        </Text>
        <Navigate name="TELEMED_HCPS" query={{ slugs: ["jantung"] }}>
          <Link
            color="#2E8E8E"
            borderRadius="xl"
            bgColor="white"
            fontSize="sm"
            fontFamily="poppins"
            fontWeight="semibold"
            borderColor="main.500"
            borderWidth="1px"
            boxShadow="2xl"
            variant="unstyled"
          >
            <Text px={6} py={3}>
              Chat Dokter Kardiologi
            </Text>
          </Link>
        </Navigate>
      </Box>
      <Image
        priority
        src={ASSETS.ILLUSTRATION_CARDIAC_MOBILE}
        alt="Headline Penyakit Dalam"
        height={632}
        width={360}
        layout="responsive"
        wrapperProps={{
          width: "100%",
        }}
      />
    </Box>
  );
}
