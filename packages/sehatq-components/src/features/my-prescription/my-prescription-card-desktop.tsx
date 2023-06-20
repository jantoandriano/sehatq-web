import React from "react";
import { useNavigation, formatDate, parseToDate } from "@sehatq/utils";
import {
  Box,
  Flex,
  Link,
  SehatqPrescriptionIcon,
  ChatActivityIcon,
  Text,
  VStack,
  Skeleton,
  Badge,
} from "../../user-interfaces";
import { PrescriptionStatusCode, PRESCRIPTION_STATUS } from "../prescription";

export type MyPrescriptionCardDesktopProps = {
  number: string;
  source: {
    id: "user_upload" | "teleconsultation";
    name: string;
  };
  updatedAt: string;
  createdAt: string;
  patientName: string;
  numberOfDrug: number;
  status: PrescriptionStatusCode;
};

export function MyPrescriptionCardDesktop(
  props: MyPrescriptionCardDesktopProps
) {
  const {
    number,
    source,
    updatedAt,
    createdAt,
    patientName,
    numberOfDrug,
    status,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <Box width="100%" bgColor="white" borderRadius="xl" boxShadow="base" px={4}>
      <Flex
        alignItems="center"
        borderBottom="0.5px solid"
        borderBottomColor="veryLightPink"
        justifyContent="space-between"
        py={3}
      >
        {source.id === "user_upload" ? (
          <Text color="sea.500" fontWeight="semibold" fontSize="xs">
            <SehatqPrescriptionIcon boxSize="16px" marginRight="2" />
            {source.name}
          </Text>
        ) : (
          <Text color="sea.500" fontWeight="semibold" fontSize="xs">
            <ChatActivityIcon boxSize="16px" marginRight="2" />
            {source.name}
          </Text>
        )}
        <Flex alignItems="center">
          <Text marginRight="2.5" fontSize="xxs" color="brownGrey.500">
            {updatedAt &&
              formatDate(parseToDate(updatedAt, "iso"), "dd MMM yyyy, HH.mm")}
          </Text>
          <Badge
            textTransform="capitalize"
            variant="solid"
            bgColor={PRESCRIPTION_STATUS[status].color}
            color="white"
            fontSize="xxs"
            px={2}
          >
            {PRESCRIPTION_STATUS[status].name}
          </Badge>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        borderTop="0.5px solid"
        borderTopColor="veryLightPink"
        justifyContent="space-between"
        pt={3}
        pb={4}
      >
        <VStack spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Tanggal Upload
          </Text>
          <Text color="charcoalGrey" fontSize="sm" lineHeight="3">
            {createdAt &&
              formatDate(parseToDate(createdAt, "iso"), "dd MMMM yyyy")}
          </Text>
        </VStack>
        <VStack spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Pasien
          </Text>
          <Text
            color="charcoalGrey"
            fontFamily="poppins"
            fontWeight="bold"
            fontSize="sm"
            noOfLines={1}
            lineHeight="3"
          >
            {patientName}
          </Text>
        </VStack>
        <VStack spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Total Obat
          </Text>
          <Text color="sea.500" fontWeight="bold" fontSize="sm" lineHeight="3">
            {numberOfDrug}
          </Text>
        </VStack>
        <Navigate name="PRESCRIPTION" query={{ prescriptionNo: number }}>
          <Link
            variant="outline"
            color="sea.500"
            borderColor="main.500"
            fontSize="xs"
            height="28px"
            borderRadius="base"
          >
            Lihat Detail
          </Link>
        </Navigate>
      </Flex>
    </Box>
  );
}

export function MyPrescriptionCardSkeletonDesktop() {
  return (
    <Box width="100%" bgColor="white" borderRadius="xl" boxShadow="base" px={4}>
      <Flex
        alignItems="center"
        borderBottom="0.5px solid"
        borderBottomColor="veryLightPink"
        justifyContent="space-between"
        py={3}
      >
        <Skeleton width="96px" height="16px" />
        <Flex alignItems="center">
          <Skeleton width="85px" height="14px" marginRight="2.5" />
          <Skeleton width="71px" height="18px" />
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        borderTop="0.5px solid"
        borderTopColor="veryLightPink"
        justifyContent="space-between"
        pt={3}
        pb={4}
      >
        <VStack spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Tanggal Upload
          </Text>
          <Skeleton width="102px" height="16px" />
        </VStack>
        <VStack spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Pasien
          </Text>
          <Skeleton width="156px" height="16px" />
        </VStack>
        <VStack spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Total Obat
          </Text>
          <Skeleton width="20px" height="16px" />
        </VStack>
        <Skeleton width="107px" height="28px" />
      </Flex>
    </Box>
  );
}
