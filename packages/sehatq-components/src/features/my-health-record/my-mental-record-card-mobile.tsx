import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  MentalHealthIcon,
  TrashIcon,
  IconButton,
  Flex,
  Text,
  Link,
  VStack,
  Skeleton,
} from "../../user-interfaces";

export interface MyMentalRecordCardMobileProps {
  createdAt: string;
  diagnosisName: string;
  description: string;
  showConfirmationDelete: (mentalId: number) => void;
  userId: string;
  mentalId: number;
}

export function MyMentalRecordCardMobile(props: MyMentalRecordCardMobileProps) {
  const {
    createdAt,
    diagnosisName,
    description,
    showConfirmationDelete,
    userId,
    mentalId,
  } = props;
  const { Navigate } = useNavigation();
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Flex align="center" py={2.5} px={3.5}>
        <MentalHealthIcon boxSize="20px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="xs"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Kesehatan Mental
        </Text>
        <Text fontSize="xxs" color="brownGrey.500">
          {createdAt}
        </Text>
        <IconButton
          ml={3}
          variant="fit"
          icon={<TrashIcon boxSize="14px" />}
          aria-label="trashIcon"
          onClick={() => showConfirmationDelete(mentalId)}
        />
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        px={4}
        py={2.5}
        pb={4}
        borderTop="0.5px solid"
        borderColor="veryLightPink"
      >
        <VStack spacing={1} flex={1} align="flex-start">
          <Text fontWeight="semibold" fontSize="sm" fontFamily="poppins">
            {diagnosisName}
          </Text>
          <Text fontSize="xs">{description}</Text>
        </VStack>
        <Navigate name="MY_MENTAL_RECORD" query={{ userId, mentalId }}>
          <Link
            fontSize="xs"
            colorScheme="sea"
            variant="outline"
            height="26px"
            border="solid 1px"
            borderColor="main.500"
          >
            Lihat Detail
          </Link>
        </Navigate>
      </Flex>
    </Box>
  );
}

export function MyMentalRecordCardSkeletonMobile() {
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Flex align="center" py={2.5} px={3.5}>
        <MentalHealthIcon boxSize="20px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="xs"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Kesehatan Mental
        </Text>
        <Skeleton width="94px" height="14px" />
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        px={4}
        py={2.5}
        pb={4}
        borderTop="0.5px solid"
        borderColor="veryLightPink"
      >
        <VStack spacing={1} flex={1} align="flex-start">
          <Skeleton width="140px" height="20px" />
          <Skeleton width="180px" height="16px" />
          <Skeleton width="150px" height="16px" />
        </VStack>
        <Skeleton width="90px" height="20px" />
      </Flex>
    </Box>
  );
}
