import React from "react";
import { Box, VStack, HStack, Text, Skeleton } from "../../user-interfaces";

export type PrescriptionPatientCardMobileProps = {
  prescription?: {
    name: string;
    gender: string;
    age: string | null;
    notes: string | null;
  };
};

export function PrescriptionPatientCardMobile(
  props: PrescriptionPatientCardMobileProps
) {
  const { prescription } = props;
  return (
    <>
      {prescription && (
        <Box
          background="white"
          boxShadow="base"
          borderRadius="xl"
          p={4}
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
          <HStack spacing={6} align="flex-start" mt={4}>
            <VStack spacing={3} align="flex-start">
              <Text
                fontSize="sm"
                lineHeight="5"
                color="brownGrey.500"
                fontWeight="semibold"
              >
                Nama Pasien
              </Text>
              <Text
                fontSize="sm"
                lineHeight="5"
                color="brownGrey.500"
                fontWeight="semibold"
              >
                Jenis Kelamin
              </Text>
              <Text
                fontSize="sm"
                lineHeight="5"
                color="brownGrey.500"
                fontWeight="semibold"
              >
                Umur
              </Text>
            </VStack>
            <VStack spacing={3} align="flex-start">
              <Text fontSize="sm" lineHeight="5" color="charcoalGrey">
                {prescription.name}
              </Text>
              <Text fontSize="sm" lineHeight="5" color="charcoalGrey">
                {prescription.gender === "M" ? "Pria" : "Wanita"}
              </Text>
              <Text fontSize="sm" lineHeight="5" color="charcoalGrey">
                {prescription.age || "-"}
              </Text>
            </VStack>
          </HStack>
          {prescription.notes && (
            <Box>
              <VStack
                spacing={1}
                align="flex-start"
                borderRadius="base"
                background="gray.500"
                width="full"
                minH="84px"
                p={3}
                mt={3}
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
        </Box>
      )}
    </>
  );
}

export function PrescriptionPatientCardSkeletonMobile() {
  return (
    <Box
      background="white"
      boxShadow="base"
      borderRadius="xl"
      p={4}
      width="full"
    >
      <Skeleton width="242px" height="24px" />
      <HStack spacing={6} align="flex-start" mt={4}>
        <VStack spacing={3} align="flex-start">
          <Skeleton width="89px" height="20px" />
          <Skeleton width="91px" height="20px" />
          <Skeleton width="39px" height="20px" />
        </VStack>
        <VStack spacing={3} align="flex-start">
          <Skeleton width="180px" height="20px" />
          <Skeleton width="59px" height="20px" />
          <Skeleton width="140px" height="20px" />
        </VStack>
      </HStack>
    </Box>
  );
}
