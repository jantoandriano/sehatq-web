import React from "react";
import QRCode from "qrcode.react";

import { VStack, Box, Text, Divider, Skeleton } from "../../user-interfaces";

export interface MyHealthServiceAppointmentInfoCardMobileProps {
  bookingId: string;
  packageName: string;
  procedureName: string;
  createdAt: string;
  scheduleDate: string;
  scheduleTime: string;
  hcfName: string;
  price: string;
}

export function MyHealthServiceAppointmentInfoCardMobile({
  bookingId,
  packageName,
  procedureName,
  createdAt,
  scheduleDate,
  scheduleTime,
  hcfName,
  price,
}: MyHealthServiceAppointmentInfoCardMobileProps) {
  return (
    <>
      <VStack
        background="white"
        borderRadius="10px"
        boxShadow="base"
        px={2.5}
        pb={4}
        pt={2}
        mb={4}
        alignItems="flex-start"
        spacing={2}
        w="100%"
      >
        <Text fontSize="sm" fontWeight="semibold" fontFamily="poppins" px={1.5}>
          Informasi Pemeriksaan
        </Text>
        <Divider borderColor="veryLightPink" />
        <VStack alignItems="flex-start" spacing={3} w="100%" px={1.5}>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={0.5}>
              {packageName}
            </Text>
            <Text fontSize="xxs" color="brownGrey.500">
              {procedureName}
            </Text>
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xxs" mb={0.5}>
              Tanggal Booking
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {createdAt}
            </Text>
          </Box>
          <Box>
            <Text color="brownGrey.500" fontSize="xxs" mb={0.5}>
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
      </VStack>
      <Box
        background="white"
        borderRadius="10px"
        boxShadow="base"
        px={6}
        pb={6}
        pt={5}
        textAlign="center"
        mb={4}
        w="100%"
      >
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
    </>
  );
}

export function MyHealthServiceAppointmentInfoCardSkeletonMobile() {
  return (
    <>
      <VStack
        background="white"
        borderRadius="10px"
        boxShadow="base"
        px={2.5}
        pb={4}
        pt={2}
        mb={4}
        alignItems="flex-start"
        spacing={2}
        w="100%"
      >
        <Box px={1.5}>
          <Skeleton width="165px" height="21px" />
        </Box>
        <Divider borderColor="veryLightPink" />
        <VStack alignItems="flex-start" spacing={3} w="100%" px={1.5}>
          <Box>
            <Skeleton width="171px" height="21px" mb={0.5} />
            <Skeleton width="71px" height="15px" />
          </Box>
          <Box>
            <Skeleton width="80px" height="15px" mb={0.5} />
            <Skeleton width="95px" height="21px" />
          </Box>
          <Box>
            <Skeleton width="95px" height="15px" mb={0.5} />
            <Skeleton width="100px" height="20px" mb={0.5} />
            <Skeleton width="125px" height="20px" />
          </Box>
          <Skeleton width="100%" height="62px" />
        </VStack>
      </VStack>
      <Box
        background="white"
        borderRadius="10px"
        boxShadow="base"
        px={6}
        pb={6}
        pt={5}
        textAlign="center"
        mb={4}
        w="100%"
      >
        <Box maxW="260px" marginLeft="auto" marginRight="auto" mb={4}>
          <Skeleton width="100%" height="20px" mb={0.5} />
          <Skeleton width="60%" height="20px" mr="auto" ml="auto" />
        </Box>
        <Skeleton width="180px" height="180px" mr="auto" ml="auto" />
      </Box>
    </>
  );
}
