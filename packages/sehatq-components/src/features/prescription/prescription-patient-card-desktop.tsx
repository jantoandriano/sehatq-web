import React from "react";
import { Box, Flex, VStack, Text, Skeleton } from "../../user-interfaces";

export type PrescriptionPatientCardDesktopProps = {
  prescription?: {
    name: string;
    gender: string;
    age: string | null;
    notes: string | null;
  };
};

export function PrescriptionPatientCardDesktop(
  props: PrescriptionPatientCardDesktopProps
) {
  const { prescription } = props;
  return (
    <>
      {prescription && (
        <Box
          background="white"
          boxShadow="base"
          borderRadius="xl"
          px={8}
          py={4}
          pb={5}
          width="full"
        >
          <Text
            color="charcoalGrey"
            fontSize="md"
            lineHeight="7"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Informasi Pasien
          </Text>
          <Flex width="full" justify="space-between" mt={4}>
            <VStack align="flex-start" spacing={4}>
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Nama Pasien
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="5"
                  color="charcoalGrey"
                  fontWeight="semibold"
                >
                  {prescription.name}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Jenis Kelamin
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="5"
                  color="charcoalGrey"
                  fontWeight="semibold"
                >
                  {prescription.gender === "M" ? "Pria" : "Wanita"}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Umur
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="5"
                  color="charcoalGrey"
                  fontWeight="semibold"
                >
                  {prescription.age || "-"}
                </Text>
              </VStack>
            </VStack>
            {prescription.notes && (
              <Box>
                <VStack
                  spacing={1}
                  align="flex-start"
                  borderRadius="base"
                  background="gray.500"
                  width="296px"
                  minH="84px"
                  p={3}
                >
                  <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                    Catatan Penebusan Resep
                  </Text>
                  <Text fontSize="sm" lineHeight="5" color="charcoalGrey">
                    {prescription.notes}
                  </Text>
                </VStack>
              </Box>
            )}
          </Flex>
        </Box>
      )}
    </>
  );
}

export function PrescriptionPatientCardSkeletonDesktop() {
  return (
    <Box
      background="white"
      boxShadow="base"
      borderRadius="xl"
      px={8}
      py={4}
      pb={5}
      width="full"
    >
      <Skeleton width="242px" height="24px" />
      <Flex width="full" justify="space-between" mt={4}>
        <VStack align="flex-start" spacing={4}>
          <VStack align="flex-start" spacing={1}>
            <Skeleton width="74px" height="16px" />
            <Skeleton width="83px" height="20px" />
          </VStack>
          <VStack align="flex-start" spacing={1}>
            <Skeleton width="75px" height="16px" />
            <Skeleton width="27px" height="20px" />
          </VStack>
          <VStack align="flex-start" spacing={1}>
            <Skeleton width="33px" height="16px" />
            <Skeleton width="63px" height="20px" />
          </VStack>
        </VStack>
        <VStack
          spacing={1}
          align="flex-start"
          borderRadius="base"
          background="gray.500"
          width="296px"
          height="84px"
          p={3}
        >
          <Skeleton width="147px" height="16px" />
          <Skeleton width="272px" height="40px" />
        </VStack>
      </Flex>
    </Box>
  );
}
