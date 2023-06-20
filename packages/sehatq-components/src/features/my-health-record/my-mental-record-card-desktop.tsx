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

export interface MyMentalRecordCardDesktopProps {
  createdAt: string;
  diagnosisName: string;
  description: string;
  showConfirmationDelete: (mentalId: number) => void;
  userId: string;
  mentalId: number;
}

export function MyMentalRecordCardDesktop(
  props: MyMentalRecordCardDesktopProps
) {
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
      <Flex align="center" py={2.5} px={7}>
        <MentalHealthIcon boxSize="24px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="sm"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Kesehatan Mental
        </Text>
        <Text fontSize="sm" color="brownGrey.500">
          {createdAt}
        </Text>
        <IconButton
          ml={3}
          variant="fit"
          icon={<TrashIcon boxSize="20px" />}
          aria-label="trashIcon"
          onClick={() => showConfirmationDelete(mentalId)}
        />
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        px={7}
        pt={2.5}
        pb={4}
        borderTop="0.5px solid"
        borderColor="veryLightPink"
      >
        <VStack spacing={1} flex={1} align="flex-start">
          <Text fontWeight="semibold" fontSize="md" fontFamily="poppins">
            {diagnosisName}
          </Text>
          <Text fontSize="sm">{description}</Text>
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

export function MyMentalRecordCardSkeletonDesktop() {
  return (
    <Box boxShadow="base" borderRadius="xl" background="white">
      <Flex align="center" py={2.5} px={7}>
        <MentalHealthIcon boxSize="24px" />
        <Text
          ml={2}
          flex="1"
          color="sea.500"
          fontSize="sm"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Kesehatan Mental
        </Text>
        <Skeleton width="157px" height="21px" />
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        px={7}
        pt={2.5}
        pb={4}
        borderTop="0.5px solid"
        borderColor="veryLightPink"
      >
        <VStack spacing={1} flex={1} align="flex-start">
          <Skeleton width="150px" height="24px" />
          <Skeleton width="267px" height="20px" />
        </VStack>
        <Skeleton width="90px" height="26px" />
      </Flex>
    </Box>
  );
}
