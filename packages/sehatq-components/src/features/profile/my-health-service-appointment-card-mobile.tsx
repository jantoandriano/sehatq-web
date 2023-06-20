import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  HealthServiceIcon,
  Badge,
  Flex,
  Text,
  Button,
  VStack,
  SkeletonCircle,
  Skeleton,
  Link,
} from "../../user-interfaces";
import {
  HEALTH_SERVICE_STATUS,
  HealthServiceStatusCode,
} from "./health-service-appointment-constants";
import {
  MyAppointmentCancelationProps,
  MyAppointmentCancelation,
} from "./my-appointment-cancelation";

export interface MyHealthServiceAppointmentCardMobileProps {
  id: number;
  bookCreateDate: string;
  statusCode: HealthServiceStatusCode;
  bookDate: string;
  bookId: string;
  serviceName: string;
  serviceType: string;
  serviceTypeSlug: string;
  servicePrice: string;
  patientName: string;
  bookHcfName: string;
  bookHcfSlug: string;
  bookTime: string;
  mutateCancelationReason?: MyAppointmentCancelationProps["mutateCancelationReason"];
  onSuccessCancelationReason: () => void;
  userId?: string;
}

export function MyHealthServiceAppointmentCardMobile(
  props: MyHealthServiceAppointmentCardMobileProps
) {
  const {
    id,
    bookCreateDate,
    statusCode,
    bookDate,
    bookId,
    serviceName,
    serviceType,
    serviceTypeSlug,
    servicePrice,
    patientName,
    bookHcfName,
    bookHcfSlug,
    bookTime,
    mutateCancelationReason,
    onSuccessCancelationReason,
    userId,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <Box
      boxShadow="base"
      borderRadius="xl"
      background="white"
      position="relative"
    >
      <Flex align="center" py={2} px={4}>
        <HealthServiceIcon boxSize="16px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="xs"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Layanan Pemeriksaan
        </Text>
        <Text fontSize="xxs" color="brownGrey.500">
          {bookCreateDate}
        </Text>
        <Badge
          textTransform="capitalize"
          variant="solid"
          size="sm"
          colorScheme={HEALTH_SERVICE_STATUS[statusCode]["statusColor"]}
          ml={2}
          px={3}
        >
          {HEALTH_SERVICE_STATUS[statusCode]["statusLabel"]}
        </Badge>
      </Flex>
      <Box
        px={4}
        pt={3}
        pb={4}
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="veryLightPink"
      >
        <VStack align="flex-start" spacing={0.5}>
          <Navigate name="MY_HEALTH_SERVICE" query={{ bookingId: id, userId }}>
            <Link color="sea.500" fontSize="xs">
              Booking ID: {bookId}
            </Link>
          </Navigate>
          <Text fontFamily="poppins" fontWeight="semibold" fontSize="sm">
            {serviceName}
          </Text>
          <Text color="brownGrey.500" fontSize="xxs">
            {serviceType}
          </Text>
          <Text fontSize="xs">
            Mulai dari{" "}
            <Text d="inline" color="sea.500" fontWeight="bold">
              {servicePrice}
            </Text>
          </Text>
        </VStack>
        <Box
          py={2}
          px={3}
          my={3}
          background="iceBlue.500"
          borderRadius="4px"
          w="100%"
          maxW="320px"
        >
          <Text color="brownGrey.500" fontSize="xxs">
            Nama Pasien
          </Text>
          <Text fontFamily="poppins" fontWeight="semibold" fontSize="sm">
            {patientName}
          </Text>
        </Box>
        <Flex>
          <Box flex="1">
            <Text fontWeight="semibold" fontSize="xs">
              {bookHcfName}
            </Text>
            <Text fontSize="xs">
              {bookDate}, {bookTime}
            </Text>
          </Box>
          <VStack maxW="120px" spacing="1">
            {statusCode === "done" || statusCode === "attended" ? (
              <Navigate name="EXTERNAL_REVIEW_HEALTH_SERVICE">
                <Link
                  fontSize="xs"
                  colorScheme="main"
                  variant="solid"
                  height="26px"
                  borderRadius="4px"
                  w="100%"
                  p={0}
                >
                  Beri Nilai
                </Link>
              </Navigate>
            ) : null}
            {statusCode === "not-attended" ||
            statusCode === "transfer" ||
            statusCode === "cancelled" ||
            statusCode === "attended" ||
            statusCode === "done" ||
            statusCode === "cancelled-by-hcf" ? (
              <Navigate
                name="HEALTH_SERVICE"
                query={{ hcfSlug: bookHcfSlug, procedure: serviceTypeSlug }}
              >
                <Link
                  fontSize="xs"
                  colorScheme="sea"
                  variant="outline"
                  height="26px"
                  borderRadius="4px"
                  w="100%"
                  p={0}
                >
                  Booking Lagi
                </Link>
              </Navigate>
            ) : null}
            {mutateCancelationReason &&
            (statusCode === "new" ||
              statusCode === "confirmed" ||
              statusCode === "pending") ? (
              <MyAppointmentCancelation
                bookingId={`${id}`}
                mutateCancelationReason={mutateCancelationReason}
                onSuccessCancelationReason={onSuccessCancelationReason}
                isMobile={true}
              >
                <Button
                  fontSize="xs"
                  colorScheme="brownGrey"
                  variant="outline"
                  height="26px"
                  borderRadius="4px"
                  w="120px"
                  px={2}
                >
                  Batalkan
                </Button>
              </MyAppointmentCancelation>
            ) : null}
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}

export function MyHealthServiceAppointmentCardSkeletonMobile() {
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Flex align="center" py={2} px={4}>
        <SkeletonCircle size="16px" />
        <Box flex="1">
          <Skeleton width="130px" height="16px" ml={2} />
        </Box>
        <Skeleton width="60px" height="15px" />
        <Skeleton width="57px" height="19px" ml={2} />
      </Flex>
      <Box
        px={4}
        pt={3}
        pb={4}
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="veryLightPink"
      >
        <VStack align="flex-start" spacing={0.5}>
          <Skeleton width="120px" height="18px" />
          <Skeleton width="250px" height="21px" />
          <Skeleton width="80px" height="15px" />
          <Skeleton width="120px" height="18px" />
        </VStack>
        <Skeleton width="100%" height="52px" mt={2} mb={2} />
        <Flex>
          <Box flex="1">
            <Skeleton width="100px" height="18px" mb={0.5} />
            <Skeleton width="200px" height="18px" />
          </Box>
          <VStack spacing="1">
            <Skeleton width="120px" height="26px" />
            <Skeleton width="120px" height="26px" />
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}
