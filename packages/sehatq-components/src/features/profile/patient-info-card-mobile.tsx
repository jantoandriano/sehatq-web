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

export interface PatientInfoCardMobileProps {
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

export function PatientInfoCardMobile({
  bookingId,
  createdAt,
  status,
  patientName,
  patientDob,
  patientAddress,
  patientPhone,
}: PatientInfoCardMobileProps) {
  return (
    <VStack background="white" borderRadius="10px" boxShadow="base" w="100%">
      <Flex
        px={4}
        py={2}
        borderBottom="0.5px solid"
        borderColor="veryLightPink"
        w="100%"
        justify="space-between"
      >
        <Text color="sea.500" fontSize="xs">
          Booking ID: {bookingId}
        </Text>
        <Flex align="center">
          <Text color="brownGrey.500" fontSize="xxs">
            {createdAt}
          </Text>
          {status?.id !== "all" ? (
            <Badge
              px="2.5"
              variant="solid"
              colorScheme={status?.color}
              fontSize="xxs"
              ml="2.5"
              textTransform="capitalize"
            >
              {status?.label}
            </Badge>
          ) : null}
        </Flex>
      </Flex>
      <VStack px={4} pt={1} pb={5} align="flex-start" spacing={3} width="100%">
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
          Informasi Pasien
        </Text>
        <Divider borderColor="veryLightPink" />
        <Box>
          <Text color="brownGrey.500" fontSize="xxs">
            Nama Pasien
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {patientName}
          </Text>
        </Box>
        <Box>
          <Text color="brownGrey.500" fontSize="xxs">
            Tanggal Lahir
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {patientDob}
          </Text>
        </Box>
        <Box>
          <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
            Alamat
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {patientAddress ?? "-"}
          </Text>
        </Box>
        <Box>
          <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
            No. Telepon
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {patientPhone}
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
}

export function PatientInfoCardSkeletonMobile() {
  return (
    <VStack background="white" borderRadius="10px" boxShadow="base" w="100%">
      <Flex
        px={4}
        py={2}
        borderBottom="0.5px solid"
        borderColor="veryLightPink"
        w="100%"
        justify="space-between"
      >
        <Skeleton width="119px" height="17px" />
        <Flex align="center">
          <Skeleton width="64px" height="14px" />
          <Skeleton width="58px" height="18px" ml="2.5" />
        </Flex>
      </Flex>
      <VStack px={4} pt={1} pb={5} align="flex-start" spacing={3} width="100%">
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins">
          Informasi Pasien
        </Text>
        <Divider borderColor="veryLightPink" />
        <Box>
          <Text color="brownGrey.500" fontSize="xxs">
            Nama Pasien
          </Text>
          <Skeleton width="84px" height="19px" />
        </Box>
        <Box>
          <Text color="brownGrey.500" fontSize="xxs">
            Tanggal Lahir
          </Text>
          <Skeleton width="127px" height="19px" />
        </Box>
        <Box>
          <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
            Alamat
          </Text>
          <Skeleton width="290px" height="70px" />
        </Box>
        <Box>
          <Text color="brownGrey.500" fontSize="xxs" lineHeight="3">
            No. Telepon
          </Text>
          <Skeleton width="88px" height="19px" />
        </Box>
      </VStack>
    </VStack>
  );
}
