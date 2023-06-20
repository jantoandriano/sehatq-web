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

export type PrescriptionStatusCardDesktopProps = {
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

export function PrescriptionStatusCardDesktop(
  props: PrescriptionStatusCardDesktopProps
) {
  const { prescription } = props;
  return (
    <>
      {prescription && (
        <Flex
          align="center"
          background="white"
          justify="space-between"
          flexWrap="unset"
          boxShadow="base"
          borderRadius="xl"
          pr={6}
          py={4}
          width="full"
        >
          <VStack spacing="1" align="flex-start">
            <Text fontSize="xs" color="brownGrey.500" lineHeight="3" ml={4}>
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
          <VStack spacing={2}>
            <Flex
              background={prescription.backgroundColor}
              align="center"
              justify="center"
              border="0.5px solid"
              borderColor={prescription.borderColor}
              borderRadius="base"
              width="434px"
              height="40px"
            >
              <Text fontSize="xs" lineHeight="3" color="charcoalGrey">
                {prescription.activityStatus}
              </Text>
            </Flex>
            {prescription.status === "requested" && (
              <Text fontSize="xs" lineHeight="3" color="charcoalGrey">
                Waktu operasional jam 06:00 - 23:00
              </Text>
            )}
          </VStack>
          <PrescriptionStatusLogPopup prescriptionNo={prescription.number} />
        </Flex>
      )}
    </>
  );
}

export function PrescriptionStatusCardSkeletonDesktop() {
  return (
    <Flex
      align="center"
      background="white"
      justify="space-between"
      flexWrap="unset"
      boxShadow="base"
      borderRadius="xl"
      pr={6}
      pl={4}
      py={4}
      width="full"
    >
      <VStack spacing="1" align="flex-start">
        <Skeleton width="72px" height="16px" />
        <Skeleton width="77px" height="20px" />
      </VStack>
      <Flex
        background="veryLightPink"
        align="center"
        justify="center"
        border="0.5px solid"
        borderColor="brownGrey.100"
        borderRadius="base"
        width="434px"
        height="40px"
      >
        <Skeleton width="243px" height="16px" />
      </Flex>
      <Skeleton width="69px" height="20px" />
    </Flex>
  );
}
