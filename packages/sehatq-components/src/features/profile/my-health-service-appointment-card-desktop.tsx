import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  HealthServiceIcon,
  Badge,
  Flex,
  Spacer,
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

export interface MyHealthServiceAppointmentCardDesktopProps {
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

export function MyHealthServiceAppointmentCardDesktop(
  props: MyHealthServiceAppointmentCardDesktopProps
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
      <Flex align="center" py={3} px={7}>
        <HealthServiceIcon boxSize="20px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="sm"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Layanan Pemeriksaan
        </Text>
        <Text fontSize="sm" color="brownGrey.500">
          {bookCreateDate}
        </Text>
        <Badge
          textTransform="capitalize"
          variant="solid"
          colorScheme={HEALTH_SERVICE_STATUS[statusCode]["statusColor"]}
          ml={2.5}
          px={3}
        >
          {HEALTH_SERVICE_STATUS[statusCode]["statusLabel"]}
        </Badge>
      </Flex>
      <Flex
        px={7}
        pt={3}
        pb={5}
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="veryLightPink"
      >
        <Box flex="1">
          <VStack align="flex-start" spacing={0.5}>
            <Text color="brownGrey.500" fontSize="xs">
              {bookDate}
            </Text>
            <Navigate
              name="MY_HEALTH_SERVICE"
              query={{ bookingId: id, userId }}
            >
              <Link color="sea.500" fontSize="xs">
                Booking ID: {bookId}
              </Link>
            </Navigate>
            <Text fontFamily="poppins" fontWeight="semibold">
              {serviceName}
            </Text>
            <Text color="brownGrey.500" fontSize="xs">
              {serviceType}
            </Text>
            <Text fontSize="sm">
              Mulai dari{" "}
              <Text d="inline" color="sea.500" fontWeight="bold">
                {servicePrice}
              </Text>
            </Text>
          </VStack>
          <Box
            py={2}
            px={4}
            mt={2}
            background="iceBlue.500"
            borderRadius="4px"
            w="100%"
            maxW="320px"
          >
            <Text color="brownGrey.500" fontSize="sm">
              Nama Pasien
            </Text>
            <Text fontFamily="poppins" fontWeight="semibold">
              {patientName}
            </Text>
          </Box>
        </Box>
        <Flex
          width="32%"
          direction="column"
          borderColor="veryLightPink"
          borderLeftWidth="1px"
          borderLeftStyle="solid"
          pl={8}
          pt={4}
          pb={8}
        >
          <Text fontWeight="semibold" fontSize="sm">
            {bookHcfName}
          </Text>
          <Text fontSize="sm">{bookTime}</Text>
          <Spacer />
          <VStack maxW="120px">
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
      </Flex>
    </Box>
  );
}

export function MyHealthServiceAppointmentCardSkeletonDesktop() {
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Flex align="center" py={3} px={7}>
        <SkeletonCircle size="20px" />
        <Box flex="1">
          <Skeleton width="150px" height="19px" ml={2} />
        </Box>
        <Skeleton width="85px" height="21px" />
        <Skeleton width="64px" height="22px" ml={9} />
      </Flex>
      <Flex
        px={7}
        pt={3}
        pb={5}
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="veryLightPink"
      >
        <Box flex="1">
          <VStack align="flex-start" spacing={0.5}>
            <Skeleton width="105px" height="18px" />
            <Skeleton width="120px" height="18px" />
            <Skeleton width="286px" height="24px" />
            <Skeleton width="100px" height="18px" />
            <Skeleton width="150px" height="21px" />
          </VStack>
          <Skeleton width="320px" height="61px" mt={2} />
        </Box>
        <Flex
          width="32%"
          direction="column"
          borderColor="veryLightPink"
          borderLeftWidth="1px"
          borderLeftStyle="solid"
          pl={8}
          pt={4}
          pb={8}
        >
          <Skeleton width="150px" height="21px" mb={0.5} />
          <Skeleton width="100px" height="21px" />
          <Spacer />
          <VStack maxW="120px">
            <Skeleton width="100%" height="26px" />
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
