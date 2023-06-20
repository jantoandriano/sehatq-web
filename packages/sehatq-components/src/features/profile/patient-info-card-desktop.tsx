import React from "react";

import {
  VStack,
  Box,
  Flex,
  Text,
  Badge,
  Divider,
  BadgeProps,
  Skeleton,
} from "../../user-interfaces";

export interface PatientInfoCardDesktopProps {
  bookingId: string;
  createdAt: string;
  status: {
    id: string;
    label: string;
    color: BadgeProps["colorScheme"];
  };
  patientName: string;
  patientDob: string;
  patientAddress: string | null;
  patientPhone: string;
}

export function PatientInfoCardDesktop({
  bookingId,
  createdAt,
  status,
  patientName,
  patientDob,
  patientAddress,
  patientPhone,
}: PatientInfoCardDesktopProps) {
  return (
    <VStack background="white" borderRadius="10px" boxShadow="base" w="100%">
      <Flex
        px={7}
        py={3}
        borderBottom="0.5px solid"
        borderColor="veryLightPink"
        w="100%"
        justify="space-between"
      >
        <Text color="sea.500" fontSize="sm">
          Booking ID: {bookingId}
        </Text>
        <Flex>
          <Text color="brownGrey.500" fontSize="sm">
            {createdAt}
          </Text>
          {status?.id !== "all" ? (
            <Badge
              px="2.5"
              variant="solid"
              colorScheme={status?.color}
              fontSize="xs"
              ml="2.5"
              textTransform="capitalize"
            >
              {status?.label}
            </Badge>
          ) : null}
        </Flex>
      </Flex>
      <VStack px={7} pt={1} pb={7} align="flex-start" spacing={3} width="100%">
        <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
          Informasi Pasien
        </Text>
        <Divider borderColor="veryLightPink" />
        <Flex w="100%">
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Nama Pasien
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {patientName}
            </Text>
          </Box>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Tanggal Lahir
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {patientDob}
            </Text>
          </Box>
        </Flex>
        <Flex w="100%">
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs" lineHeight="3">
              Alamat
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {patientAddress ?? "-"}
            </Text>
          </Box>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs" lineHeight="3">
              No. Telepon
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {patientPhone}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </VStack>
  );
}

export function PatientInfoCardSkeletonDesktop() {
  return (
    <VStack background="white" borderRadius="10px" boxShadow="base" w="100%">
      <Flex
        px={7}
        py={3}
        borderBottom="0.5px solid"
        borderColor="veryLightPink"
        w="100%"
        justify="space-between"
      >
        <Skeleton width="138px" height="19px" />
        <Flex>
          <Skeleton width="89px" height="19px" />
          <Skeleton width="68px" height="19px" ml="2.5" />
        </Flex>
      </Flex>
      <VStack px={7} pt={1} pb={7} align="flex-start" spacing={3} width="100%">
        <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
          Informasi Pasien
        </Text>
        <Divider borderColor="veryLightPink" />
        <Flex w="100%">
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Nama Pasien
            </Text>
            <Skeleton width="80px" height="19px" />
          </Box>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs">
              Tanggal Lahir
            </Text>
            <Skeleton width="127px" height="19px" />
          </Box>
        </Flex>
        <Flex w="100%">
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs" lineHeight="3">
              Alamat
            </Text>
            <Skeleton width="304px" height="50px" />
          </Box>
          <Box flex={1}>
            <Text color="brownGrey.500" fontSize="xs" lineHeight="3">
              No. Telepon
            </Text>
            <Skeleton width="89px" height="19px" />
          </Box>
        </Flex>
      </VStack>
    </VStack>
  );
}
