import { useNavigation, formatDate, parseToDate } from "@sehatq/utils";

import React from "react";
import {
  LinkBox,
  Box,
  LinkOverlay,
  IconButton,
  DeleteIcon,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
  ModalBody,
  VStack,
  Button,
} from "../../user-interfaces";
import { Content } from "../layout";

type Props = {
  title: string;
  description: string;
  descriptionColor: string;
  healthToolSlug: string;
  healthToolName: string;
  healthToolScoreId: number;
  createdAt: string;
  userId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  confirmDelete: () => void;
  isLoadingDelete: boolean;
};

export function HealthToolScoreCardDesktop(props: Props) {
  const {
    descriptionColor,
    title,
    description,
    createdAt,
    healthToolName,
    healthToolSlug,
    healthToolScoreId,
    userId,
    isOpen,
    onOpen,
    onClose,
    confirmDelete,
    isLoadingDelete,
  } = props;
  const { Navigate } = useNavigation();

  return (
    <React.Fragment>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="none">
          <ModalBody paddingX={8} pt={8} pb={4}>
            <VStack rowGap={3}>
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight={10}
                fontFamily="poppins"
              >
                Hapus Catatan Kesehatan?
              </Text>
              <Text
                maxWidth="305px"
                textAlign="center"
                fontWeight="normal"
                fontSize="lg"
                lineHeight="7"
              >
                Catatan yang sudah dihapus tidak dapat dikembalikan
              </Text>
              <VStack w="full" rowGap={1}>
                <Button
                  w="full"
                  variant="unstyled"
                  fontSize="md"
                  fontWeight="semibold"
                  fontFamily="poppins"
                  bgColor="main.500"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="white"
                  isLoading={isLoadingDelete}
                  onClick={confirmDelete}
                >
                  Hapus
                </Button>
                <Button
                  w="full"
                  variant="unstyled"
                  fontSize="md"
                  fontWeight="semibold"
                  fontFamily="poppins"
                  bgColor="white"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  isLoading={isLoadingDelete}
                  color="sea.500"
                  onClick={onClose}
                >
                  Batal
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box w="full" bgColor="white" borderRadius="lg" boxShadow="lg">
        <HStack
          justifyContent="space-between"
          px={5}
          py={3}
          borderBottomColor="veryLightPink"
          borderBottomWidth="0.5px"
        >
          <Text
            color="sea.500"
            fontSize="sm"
            fontWeight="semibold"
            lineHeight={6}
            width="calc(100% - 160px)"
            noOfLines={1}
          >
            {healthToolName}
          </Text>
          <Flex gap={2}>
            <Text color="brownGrey.500" fontSize="sm" lineHeight={6}>
              {formatDate(parseToDate(createdAt, "iso"), "d MMM yyyy, HH:mm")}
            </Text>
            <IconButton
              variant="fit"
              aria-label="delete"
              color="brownGrey.500"
              icon={<DeleteIcon boxSize="20px" />}
              onClick={onOpen}
              position="relative"
            />
          </Flex>
        </HStack>
        <LinkBox position="relative" zIndex={0}>
          <HStack py={3} px={5} justifyContent="space-between">
            <Box width="calc(100% - 100px)">
              <Text
                fontSize="md"
                fontFamily="poppins"
                fontWeight="semibold"
                color={`#${descriptionColor}`}
                mb={2}
                noOfLines={1}
              >
                {title}
              </Text>
              <Content noOfLines={2}>{description}</Content>
            </Box>
            <Navigate
              name="PROFILE_HEALTHRECORD_DETAIL_SCORE"
              query={{
                slug: healthToolSlug,
                userId,
                scoreId: healthToolScoreId,
              }}
            >
              <LinkOverlay
                borderWidth="1px"
                borderColor="main.500"
                borderRadius="md"
                py={1}
                px={2}
                fontSize="xs"
                color="sea.500"
                fontWeight="semibold"
                textAlign="center"
                ml={2}
              >
                Lihat Detail
              </LinkOverlay>
            </Navigate>
          </HStack>
        </LinkBox>
      </Box>
    </React.Fragment>
  );
}
