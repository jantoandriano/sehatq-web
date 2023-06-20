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
  HStack,
  Skeleton,
  Badge,
} from "../../user-interfaces";
import { PrescriptionStatusCode, PRESCRIPTION_STATUS } from "../prescription";

export type MyPrescriptionCardMobileProps = {
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

export function MyPrescriptionCardMobile(props: MyPrescriptionCardMobileProps) {
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
    <Box width="100%" bgColor="white" borderRadius="xl" boxShadow="base">
      <Flex
        alignItems="center"
        borderBottom="0.5px solid"
        borderBottomColor="veryLightPink"
        paddingX="4"
        paddingY="3"
        justifyContent="space-between"
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
            {formatDate(parseToDate(updatedAt, "iso"), "dd MMM, HH.mm")}
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
      <Flex justifyContent="center" paddingX="4" paddingY="3">
        <VStack flex={1} spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Tanggal Terbit
          </Text>
          <Text color="charcoalGrey" fontSize="sm" lineHeight="3">
            {formatDate(parseToDate(createdAt, "iso"), "dd MMMM yyyy")}
          </Text>
        </VStack>
        <VStack flex={1} spacing={2} align="flex-start">
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
      </Flex>
      <Flex
        alignItems="center"
        borderTop="0.5px solid"
        borderTopColor="veryLightPink"
        paddingX="4"
        paddingTop="3"
        paddingBottom="4"
        justifyContent="space-between"
      >
        <HStack spacing={2}>
          <Text color="brownGrey.500" fontSize="xs">
            Total Obat
          </Text>
          <Text color="sea.500" fontWeight="bold" fontSize="sm">
            {numberOfDrug}
          </Text>
        </HStack>
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

export function MyPrescriptionCardSkeletonMobile() {
  return (
    <Box width="100%" bgColor="white" borderRadius="xl" boxShadow="base">
      <Flex
        alignItems="center"
        borderBottom="0.5px solid"
        borderBottomColor="veryLightPink"
        paddingX="4"
        paddingY="3"
        justifyContent="space-between"
      >
        <Skeleton width="96px" height="16px" />
        <Flex alignItems="center">
          <Skeleton width="63px" height="14px" marginRight="2.5" />
          <Skeleton width="59px" height="18px" />
        </Flex>
      </Flex>
      <Flex justifyContent="center" paddingX="4" paddingY="3">
        <VStack flex={1} spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Tanggal Terbit
          </Text>
          <Skeleton width="102px" height="16px" />
        </VStack>
        <VStack flex={1} spacing={2} align="flex-start">
          <Text color="brownGrey.500" fontSize="xs">
            Pasien
          </Text>
          <Skeleton width="115px" height="16px" />
        </VStack>
      </Flex>
      <Flex
        alignItems="center"
        borderTop="0.5px solid"
        borderTopColor="veryLightPink"
        paddingX="4"
        paddingTop="3"
        paddingBottom="4"
        justifyContent="space-between"
      >
        <HStack spacing={2}>
          <Text color="brownGrey.500" fontSize="xs">
            Total Obat
          </Text>
          <Skeleton width="20px" height="16px" />
        </HStack>
        <Skeleton width="107px" height="28px" />
      </Flex>
    </Box>
  );
}
