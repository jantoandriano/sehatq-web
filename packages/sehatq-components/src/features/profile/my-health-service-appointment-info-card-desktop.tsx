import React from "react";
import QRCode from "qrcode.react";

import {
  Flex,
  VStack,
  Box,
  Text,
  Divider,
  Skeleton,
} from "../../user-interfaces";

export interface MyHealthServiceAppointmentInfoCardDesktopProps {
  bookingId: string;
  packageName: string;
  procedureName: string;
  createdAt: string;
  scheduleDate: string;
  scheduleTime: string;
  hcfName: string;
  price: string;
}

export function MyHealthServiceAppointmentInfoCardDesktop({
  bookingId,
  packageName,
  procedureName,
  createdAt,
  scheduleDate,
  scheduleTime,
  hcfName,
  price,
}: MyHealthServiceAppointmentInfoCardDesktopProps) {
  return (
    <VStack
      background="white"
      borderRadius="10px"
      boxShadow="base"
      px={6}
      pb={6}
      pt={3}
      alignItems="flex-start"
      spacing={3}
      w="100%"
    >
      <Text fontSize="md" fontWeight="semibold" fontFamily="poppins">
        Informasi Pemeriksaan
      </Text>
      <Divider borderColor="veryLightPink" />
      <Flex w="100%">
        <VStack alignItems="flex-start" w="260px" spacing={3}>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={0.5}>
              {packageName}
            </Text>
            <Text fontSize="xs" color="brownGrey.500">
              {procedureName}
            </Text>
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xs" mb={0.5}>
              Tanggal Booking
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {createdAt}
            </Text>
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xs" mb={0.5}>
              Tanggal Kedatangan
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {scheduleDate}
              <br />
              Pukul {scheduleTime}
            </Text>
          </Box>
          <Box
            background="iceBlue.500"
            w="100%"
            borderRadius="4px"
            pt={2}
            px={5}
            pb={3}
          >
            <Text fontSize="sm" fontWeight="semibold">
              {hcfName}
            </Text>
            <Text fontSize="sm">
              Mulai dari{" "}
              <Text as="span" fontSize="sm" color="sea.500" fontWeight="bold">
                {price}
              </Text>
            </Text>
          </Box>
        </VStack>
        <Box textAlign="center" flex={1}>
          <Text
            fontSize="sm"
            maxW="260px"
            marginLeft="auto"
            marginRight="auto"
            mb={4}
          >
            Gunakan QR berikut untuk proses pendaftaran di faskes
          </Text>
          <QRCode
            value={bookingId}
            level="M"
            size={180}
            style={{ marginRight: "auto", marginLeft: "auto" }}
          />
        </Box>
      </Flex>
    </VStack>
  );
}

export function MyHealthServiceAppointmentInfoCardSkeletonDesktop() {
  return (
    <VStack
      background="white"
      borderRadius="10px"
      boxShadow="base"
      px={6}
      pb={6}
      pt={3}
      alignItems="flex-start"
      spacing={3}
      w="100%"
    >
      <Skeleton width="190px" height="24px" />
      <Divider borderColor="veryLightPink" />
      <Flex w="100%">
        <VStack alignItems="flex-start" w="260px" spacing={3}>
          <Box>
            <Skeleton width="175px" height="21px" mb={0.5} />
            <Skeleton width="75px" height="18px" />
          </Box>
          <Box>
            <Skeleton width="95px" height="18px" mb={0.5} />
            <Skeleton width="100px" height="21px" />
          </Box>
          <Box>
            <Skeleton width="125px" height="18px" mb={0.5} />
            <Skeleton width="100px" height="20px" mb={0.5} />
            <Skeleton width="125px" height="20px" />
          </Box>
          <Skeleton width="100%" height="62px" />
        </VStack>
        <Box textAlign="center" flex={1}>
          <Box maxW="260px" marginLeft="auto" marginRight="auto" mb={4}>
            <Skeleton width="100%" height="20px" mb={0.5} />
            <Skeleton width="60%" height="20px" mr="auto" ml="auto" />
          </Box>
          <Skeleton width="180px" height="180px" mr="auto" ml="auto" />
        </Box>
      </Flex>
    </VStack>
  );
}
