import React from "react";

import { Box, Text, HStack, VStack, Skeleton } from "../../user-interfaces";
import { Content } from "../layout";

export type TelemedicineHCPProfileContentDesktopProps = {
  doctor?: {
    str: string;
    description: string;
    hospitalName: string;
    education: string;
  };
};

export function TelemedicineHCPProfileContentDesktop(
  props: TelemedicineHCPProfileContentDesktopProps
) {
  const { doctor } = props;
  return (
    <>
      {doctor && (
        <>
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            color="charcoalGrey"
            fontSize="lg"
            lineHeight="9"
          >
            Tentang Dokter
          </Text>
          <VStack spacing={5} align="flex-start" mt={3}>
            <HStack spacing={6} align="baseline">
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                color="brownGrey.500"
                width="110px"
              >
                No. STR
              </Text>
              <Text fontSize="sm" color="charcoalGrey" lineHeight="6">
                {doctor.str || "-"}
              </Text>
            </HStack>
            <HStack spacing={6} align="baseline">
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                color="brownGrey.500"
                width="110px"
              >
                Alumni
              </Text>
              <Text fontSize="sm" color="charcoalGrey" lineHeight="6">
                {doctor.education || "-"}
              </Text>
            </HStack>
            <HStack spacing={6} align="baseline">
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                color="brownGrey.500"
                width="110px"
              >
                Tempat Praktik
              </Text>
              <Text fontSize="sm" color="charcoalGrey" lineHeight="6">
                {doctor.hospitalName || "-"}
              </Text>
            </HStack>
            <HStack spacing={6} align="baseline">
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                color="brownGrey.500"
                width="110px"
              >
                Spesialisasi
              </Text>
              <Box width="512px">
                <Content isMobile>{doctor.description || "-"}</Content>
              </Box>
            </HStack>
          </VStack>
        </>
      )}
    </>
  );
}

export function TelemedicineHCPProfileContentSkeletonDesktop() {
  return (
    <>
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        color="charcoalGrey"
        fontSize="lg"
        lineHeight="9"
      >
        Tentang Dokter
      </Text>
      <VStack spacing={5} align="flex-start" mt={3}>
        <HStack spacing={6} align="flex-start">
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
            width="110px"
          >
            No. STR
          </Text>
          <Skeleton width="200px" height="20px" />
        </HStack>
        <HStack spacing={6} align="flex-start">
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
            width="110px"
          >
            Alumni
          </Text>
          <Skeleton width="190px" height="20px" />
        </HStack>
        <HStack spacing={6} align="flex-start">
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
            width="110px"
          >
            Tempat Praktik
          </Text>
          <Skeleton width="160px" height="20px" />
        </HStack>
        <HStack spacing={6} align="flex-start">
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
            width="110px"
          >
            Spesialisasi
          </Text>
          <Skeleton width="512px" height="44px" />
        </HStack>
      </VStack>
    </>
  );
}
