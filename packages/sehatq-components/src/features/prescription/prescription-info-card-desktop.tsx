import React from "react";
import { formatDate, parseToDate, useNavigation } from "@sehatq/utils";
import {
  Flex,
  VStack,
  HStack,
  Text,
  Skeleton,
  ChatActivityIcon,
  WarningIcon,
  Divider,
  Button,
  SehatqPrescriptionIcon,
  Link,
  Box,
} from "../../user-interfaces";
import {
  PRESCRIPTION_STATUS,
  PrescriptionStatusCode,
} from "./prescription-constant";
import { PrescriptionActions } from "./prescription-actions";
import { PrescriptionRecommendationPopup } from "./prescription-recommendation-popup";
import { PrescriptionImagesPopup } from "./prescription-images-popup";

export type PrescriptionInfoCardDesktopProps = {
  prescription?: {
    number: string;
    status: PrescriptionStatusCode;
    createdAt: string;
    expiredAt: string | null;
    source: {
      id: string;
      name: string;
    };
    rejectionReason: string | null;
    onlineFlow: boolean;
  };
};

export function PrescriptionInfoCardDesktop(
  props: PrescriptionInfoCardDesktopProps
) {
  const { prescription } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      {prescription && (
        <VStack
          spacing={4}
          background="white"
          boxShadow="base"
          borderRadius="xl"
          px={8}
          pt={4}
          pb={5}
          align="flex-start"
          width="full"
        >
          <Flex align="center" width="full" justify="space-between">
            {prescription.source.id === "user_upload" ? (
              <Text
                color="sea.500"
                fontWeight="semibold"
                fontSize="xs"
                lineHeight="3"
              >
                <SehatqPrescriptionIcon boxSize="16px" mr={2} />
                {prescription.source.name}
              </Text>
            ) : (
              <Text
                color="sea.500"
                fontWeight="semibold"
                fontSize="xs"
                lineHeight="3"
              >
                <ChatActivityIcon boxSize="16px" mr={2} />
                {prescription.source.name}
              </Text>
            )}
            <Text
              fontSize="xs"
              lineHeight="3"
              color="sea.500"
              fontWeight="semibold"
            >
              {`#${prescription.number}`}
            </Text>
          </Flex>
          <Divider border="solid 0.5px" borderColor="veryLightPink" />
          <Flex justify="space-between" width="full">
            <VStack spacing={4} align="flex-start">
              <VStack spacing={1} align="flex-start">
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Tanggal Terbit
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="5"
                  color="charcoalGrey"
                  fontWeight="semibold"
                >
                  {formatDate(
                    parseToDate(prescription.createdAt, "iso"),
                    "d MMM yyyy"
                  )}
                </Text>
              </VStack>
              <VStack spacing={1} align="flex-start">
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Tanggal Kedaluwarsa
                </Text>
                <Text
                  fontSize="sm"
                  lineHeight="5"
                  color={
                    prescription.status === "expired"
                      ? PRESCRIPTION_STATUS[prescription.status].color
                      : "charcoalGrey"
                  }
                  fontWeight="semibold"
                >
                  {prescription.expiredAt
                    ? formatDate(
                        parseToDate(prescription.expiredAt, "iso"),
                        "d MMM yyyy"
                      )
                    : "-"}
                </Text>
              </VStack>
            </VStack>
            {(prescription.status === "created" ||
              prescription.status === "requested" ||
              prescription.status === "approved" ||
              (prescription.status === "purchased" &&
                prescription.onlineFlow)) && (
              <Box>
                <HStack
                  spacing={3}
                  background="iceBlue.500"
                  borderRadius="base"
                  width="296px"
                  align="flex-start"
                  p={3}
                >
                  <WarningIcon
                    bgColor="sea.500"
                    color="white"
                    borderRadius="full"
                    border="5px solid"
                    borderColor="sea.500"
                    boxSize="24px"
                  />
                  <VStack align="flex-start">
                    <Text fontSize="xs" lineHeight="5">
                      {PRESCRIPTION_STATUS[prescription.status].notes}
                    </Text>
                    {prescription.status !== "purchased" && (
                      <Navigate name="TNC">
                        <Link
                          as="span"
                          color="sea.500"
                          fontSize="xs"
                          lineHeight="3"
                          fontWeight="semibold"
                          display="inline"
                        >
                          Syarat & Ketentuan SehatQ
                        </Link>
                      </Navigate>
                    )}
                  </VStack>
                </HStack>
              </Box>
            )}
            {prescription.status === "rejected" && (
              <Box>
                <VStack
                  spacing={1}
                  align="flex-start"
                  borderRadius="base"
                  background="gray.500"
                  width="296px"
                  p={3}
                >
                  <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                    Alasan Ditolak
                  </Text>
                  <Text fontSize="sm" lineHeight="5" color="charcoalGrey">
                    {prescription.rejectionReason}
                  </Text>
                </VStack>
              </Box>
            )}
          </Flex>
          {prescription.source.id === "teleconsultation" &&
          PRESCRIPTION_STATUS[prescription.status].flag !== "cancelled" ? (
            <PrescriptionRecommendationPopup
              prescriptionNo={prescription.number}
              status={prescription.status}
              source={prescription.source.id}
            />
          ) : prescription.source.id === "user_upload" ? (
            <PrescriptionImagesPopup prescriptionNo={prescription.number} />
          ) : null}
          <PrescriptionActions prescriptionNo={prescription.number} />
        </VStack>
      )}
    </>
  );
}

export function PrescriptionInfoCardSkeletonDesktop() {
  return (
    <VStack
      spacing={4}
      background="white"
      boxShadow="base"
      borderRadius="xl"
      px={8}
      pt={4}
      pb={5}
      align="flex-start"
      width="full"
    >
      <Flex align="center" width="full">
        <ChatActivityIcon boxSize="16px" />
        <Skeleton width="90px" height="16px" ml={3} />
        <Skeleton width="147px" height="16px" />
      </Flex>
      <Divider border="solid 0.5px" borderColor="veryLightPink" />
      <Flex justify="space-between" width="full">
        <VStack spacing={4} align="flex-start">
          <VStack spacing={1} align="flex-start">
            <Skeleton width="80px" height="16px" />
            <Skeleton width="80px" height="20px" />
          </VStack>
          <VStack spacing={1} align="flex-start">
            <Skeleton width="80px" height="16px" />
            <Skeleton width="80px" height="20px" />
          </VStack>
        </VStack>
        <HStack
          spacing={3}
          background="iceBlue.500"
          borderRadius="base"
          width="296px"
          align="flex-start"
          p={3}
        >
          <Skeleton width="272px" height="64px" />
        </HStack>
      </Flex>
      <Flex
        justify="space-between"
        boxShadow="base"
        borderRadius="xl"
        px={6}
        py={4}
        width="full"
      >
        <HStack spacing={3}>
          <Skeleton width="176px" height="40px" />
        </HStack>
        <HStack spacing={5}>
          <Skeleton width="90px" height="18px" />
        </HStack>
      </Flex>
      <Button
        variant="solid"
        colorScheme="main"
        size="md"
        width="full"
        isLoading
      >
        Lanjut Tebus Resep
      </Button>
    </VStack>
  );
}
