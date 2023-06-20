import React from "react";
import { formatDate, parseToDate, useNavigation } from "@sehatq/utils";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Skeleton,
  WarningIcon,
  Link,
} from "../../user-interfaces";
import {
  PRESCRIPTION_STATUS,
  PrescriptionStatusCode,
} from "./prescription-constant";
import { PrescriptionRecommendationPopup } from "./prescription-recommendation-popup";
import { PrescriptionImagesPopup } from "./prescription-images-popup";

export type PrescriptionInfoCardMobileProps = {
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

export function PrescriptionInfoCardMobile(
  props: PrescriptionInfoCardMobileProps
) {
  const { prescription } = props;
  const { Navigate } = useNavigation();
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
            fontSize="md"
            color="charcoalGrey"
            lineHeight="5"
            fontFamily="poppins"
            fontWeight="semibold"
          >
            Detail Resep
          </Text>
          <VStack spacing={3} align="flex-start" pt={4}>
            <VStack
              spacing={1}
              align="flex-start"
              background="gray.500"
              borderRadius="base"
              p={3}
              width="full"
            >
              <Flex justify="space-between" width="full" align="center">
                <Text fontSize="xs" lineHeight="3">
                  No. Resep
                </Text>
                <Text
                  fontSize="xs"
                  lineHeight="5"
                  fontWeight="semibold"
                  color="sea.500"
                >
                  {`#${prescription.number}`}
                </Text>
              </Flex>
              <Flex justify="space-between" width="full" align="center">
                <Text fontSize="xs" lineHeight="3" color="charcoalGrey">
                  Dari
                </Text>
                <Text fontSize="xs" lineHeight="5" color="charcoalGrey">
                  {prescription.source.name}
                </Text>
              </Flex>
            </VStack>
            <Flex width="full">
              <VStack spacing={1} align="flex-start" flex={1}>
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
              <VStack spacing={1} align="flex-start" flex={1}>
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
            </Flex>
            {prescription.source.id === "teleconsultation" &&
            PRESCRIPTION_STATUS[prescription.status].flag !== "cancelled" ? (
              <PrescriptionRecommendationPopup
                isMobile
                prescriptionNo={prescription.number}
                status={prescription.status}
                source={prescription.source.id}
              />
            ) : prescription.source.id === "user_upload" ? (
              <PrescriptionImagesPopup
                isMobile
                prescriptionNo={prescription.number}
              />
            ) : null}
            {(prescription.status === "created" ||
              prescription.status === "requested" ||
              prescription.status === "approved" ||
              (prescription.status === "purchased" &&
                prescription.onlineFlow)) && (
              <HStack
                spacing={3}
                background="iceBlue.500"
                borderRadius="base"
                width="full"
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
            )}
            {prescription.status === "rejected" && (
              <VStack
                spacing={1}
                align="flex-start"
                borderRadius="base"
                background="gray.500"
                width="full"
                p={3}
              >
                <Text fontSize="xs" lineHeight="3" color="brownGrey.500">
                  Alasan Ditolak
                </Text>
                <Text fontSize="sm" lineHeight="5" color="charcoalGrey">
                  {prescription.rejectionReason}
                </Text>
              </VStack>
            )}
          </VStack>
        </Box>
      )}
    </>
  );
}

export function PrescriptionInfoCardSkeletonMobile() {
  return (
    <Box
      background="white"
      boxShadow="base"
      borderRadius="xl"
      p={4}
      width="full"
    >
      <Text
        fontSize="md"
        color="charcoalGrey"
        lineHeight="5"
        fontFamily="poppins"
        fontWeight="semibold"
      >
        Detail Resep
      </Text>
      <VStack spacing={3} align="flex-start" pt={4}>
        <VStack
          spacing={1}
          align="flex-start"
          background="gray.500"
          borderRadius="base"
          p={3}
          width="full"
        >
          <Flex justify="space-between" width="full" align="center">
            <Skeleton width="57px" height="16px" />
            <Skeleton width="139px" height="20px" />
          </Flex>
          <Flex justify="space-between" width="full" align="center">
            <Skeleton width="24px" height="16px" />
            <Skeleton width="69px" height="20px" />
          </Flex>
        </VStack>
        <Flex width="full">
          <VStack spacing={1} align="flex-start" flex={1}>
            <Skeleton width="80px" height="16px" />
            <Skeleton width="80px" height="20px" />
          </VStack>
          <VStack spacing={1} align="flex-start" flex={1}>
            <Skeleton width="80px" height="16px" />
            <Skeleton width="80px" height="20px" />
          </VStack>
        </Flex>
        <Flex
          border="solid 0.5px"
          borderColor="veryLightPink"
          borderRadius="base"
          width="full"
          height="40px"
          align="center"
          justify="center"
        >
          <Skeleton width="260px" height="20px" />
        </Flex>
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
      </VStack>
    </Box>
  );
}
