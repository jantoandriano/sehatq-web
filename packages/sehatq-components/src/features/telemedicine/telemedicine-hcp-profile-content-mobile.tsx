import React from "react";

import {
  Box,
  Text,
  HStack,
  VStack,
  Skeleton,
  SkeletonText,
  Divider,
} from "../../user-interfaces";
import { Content } from "../layout";

export type TelemedicineHCPProfileContentMobileProps = {
  doctor?: {
    str: string;
    description: string;
    hospitalName: string;
    education: string;
  };
};

export function TelemedicineHCPProfileContentMobile(
  props: TelemedicineHCPProfileContentMobileProps
) {
  const { doctor } = props;
  return (
    <>
      {doctor && (
        <>
          <Text fontFamily="poppins" fontWeight="semibold" color="charcoalGrey">
            Tentang Dokter
          </Text>
          <HStack spacing={4} mt={3.5}>
            <VStack spacing={3} align="flex-start">
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                color="brownGrey.500"
              >
                No. STR
              </Text>
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                color="brownGrey.500"
              >
                Alumni
              </Text>
              <Text
                fontFamily="poppins"
                fontWeight="semibold"
                fontSize="sm"
                color="brownGrey.500"
              >
                Praktik
              </Text>
            </VStack>
            <VStack spacing={3} align="flex-start">
              <Text fontSize="sm" color="charcoalGrey">
                {doctor.str || "-"}
              </Text>
              <Text fontSize="sm" color="charcoalGrey">
                {doctor.education || "-"}
              </Text>
              <Text fontSize="sm" color="charcoalGrey">
                {doctor.hospitalName || "-"}
              </Text>
            </VStack>
          </HStack>
          <Divider my={4} borderColor="veryLightPink" border="solid 1px" />
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
            mb={1.5}
          >
            Spesialisasi
          </Text>
          <Content isMobile>{doctor.description || "-"}</Content>
        </>
      )}
    </>
  );
}

export function TelemedicineHCPProfileContentSkeletonMobile() {
  return (
    <Box px={4}>
      <Text fontFamily="poppins" fontWeight="semibold">
        Tentang Dokter
      </Text>
      <HStack spacing={4} mt={3.5}>
        <VStack spacing={3} align="flex-start">
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
          >
            No. STR
          </Text>
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
          >
            Alumni
          </Text>
          <Text
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="sm"
            color="brownGrey.500"
          >
            Praktik
          </Text>
        </VStack>
        <VStack spacing={3} align="flex-start">
          <Skeleton width="235px" height="19px" />
          <Skeleton width="155px" height="19px" />
          <Skeleton width="81px" height="19px" />
        </VStack>
      </HStack>
      <Divider my={4} borderColor="veryLightPink" border="solid 1px" />
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="sm"
        color="brownGrey.500"
        mb={1.5}
      >
        Spesialisasi
      </Text>
      <SkeletonText noOfLines={4} width="300px" />
    </Box>
  );
}
