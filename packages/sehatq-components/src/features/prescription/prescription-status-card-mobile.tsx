import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Skeleton,
} from "../../user-interfaces";
import {
  PRESCRIPTION_STATUS,
  PrescriptionStatusCode,
  PrescriptionStatusColor,
  PrescriptionStatusBackgroundColor,
  PrescriptionStatusBorderColor,
} from "./prescription-constant";
import { PrescriptionStatusLogPopup } from "./prescription-status-log-popup";

export type PrescriptionStatusCardMobileProps = {
  prescription?: {
    number: string;
    status: PrescriptionStatusCode;
    label: string;
    color: PrescriptionStatusColor;
    backgroundColor: PrescriptionStatusBackgroundColor;
    borderColor: PrescriptionStatusBorderColor;
    activityStatus: string;
  };
};

export function PrescriptionStatusCardMobile(
  props: PrescriptionStatusCardMobileProps
) {
  const { prescription } = props;
  return (
    <>
      {prescription && (
        <VStack
          spacing={2}
          align="flex-start"
          background="white"
          boxShadow="base"
          borderRadius="xl"
          py={3}
          width="full"
        >
          <Flex justify="space-between" align="center" width="full" pr={4}>
            <VStack spacing="1" align="flex-start">
              <Text fontSize="xs" color="brownGrey.500" lineHeight="3" ml={3.5}>
                Status Resep
              </Text>
              <HStack spacing={3}>
                <Box
                  width={1}
                  height={4}
                  borderTopRightRadius="sm"
                  borderBottomRightRadius="sm"
                  background={prescription.color}
                />
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  lineHeight="5"
                  color="charcoalGrey"
                >
                  {PRESCRIPTION_STATUS[prescription.status].name}
                </Text>
              </HStack>
            </VStack>
            <PrescriptionStatusLogPopup
              isMobile
              prescriptionNo={prescription.number}
            />
          </Flex>
          <VStack spacing={2} align="flex-start" px={3.5} width="full">
            <Text
              py={3}
              background={prescription.backgroundColor}
              fontSize="xs"
              lineHeight="3"
              height="40px"
              width="full"
              border="0.5px solid"
              borderColor={prescription.borderColor}
              borderRadius="base"
              textAlign="center"
            >
              {prescription.activityStatus}
            </Text>
            {prescription.status === "requested" && (
              <Text
                py={3}
                background="gray.500"
                fontSize="xs"
                lineHeight="3"
                height="40px"
                width="full"
                borderRadius="base"
                textAlign="center"
              >
                Waktu operasional jam 06:00 - 23:00
              </Text>
            )}
          </VStack>
        </VStack>
      )}
    </>
  );
}

export function PrescriptionStatusCardSkeletonMobile() {
  return (
    <VStack
      spacing={2}
      align="flex-start"
      background="white"
      boxShadow="base"
      borderRadius="xl"
      p={3.5}
      width="full"
    >
      <Flex justify="space-between" align="center" width="full">
        <VStack spacing="1" align="flex-start">
          <Skeleton width="72px" height="16px" />
          <Skeleton width="77px" height="20px" />
        </VStack>
        <Skeleton width="69px" height="20px" />
      </Flex>
      <Box width="full">
        <Skeleton width="298px" height="40px" />
      </Box>
    </VStack>
  );
}
