import React from "react";
import { useNavigation, formatDate, parseToDate } from "@sehatq/utils";

import {
  LinkBox,
  Box,
  LinkOverlay,
  IconButton,
  DeleteIcon,
  Flex,
  Text,
  HStack,
  Drawer,
  VStack,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
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
  isLoadingDelete: boolean;
  onOpen: () => void;
  onClose: () => void;
  confirmDelete: () => void;
};

export function HealthToolScoreCardMobile(props: Props) {
  const {
    descriptionColor,
    title,
    description,
    createdAt,
    healthToolName,
    healthToolSlug,
    healthToolScoreId,
    isLoadingDelete,
    userId,
    isOpen,
    onOpen,
    onClose,
    confirmDelete,
  } = props;
  const { Navigate } = useNavigation();

  return (
    <React.Fragment>
      <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent py="4" px="6" borderTopRadius="lg">
          <DrawerBody pt={4} px="0" textAlign="center">
            <VStack spacing={4}>
              <VStack>
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  lineHeight={10}
                  fontFamily="poppins"
                >
                  Hapus Catatan Kesehatan?
                </Text>
                <Text
                  maxWidth="190px"
                  textAlign="center"
                  fontWeight="normal"
                  fontSize="sm"
                  lineHeight="7"
                >
                  Catatan yang sudah dihapus tidak dapat dikembalikan
                </Text>
              </VStack>
              <VStack w="full" spacing={1}>
                <Button
                  w="full"
                  variant="unstyled"
                  fontSize="md"
                  fontWeight="semibold"
                  fontFamily="poppins"
                  bgColor="main.500"
                  borderRadius="md"
                  color="white"
                  isLoading={isLoadingDelete}
                  onClick={confirmDelete}
                >
                  Ya, Hapus
                </Button>
                <Button
                  w="full"
                  variant="unstyled"
                  fontSize="md"
                  fontWeight="semibold"
                  fontFamily="poppins"
                  bgColor="white"
                  borderRadius="md"
                  color="sea.500"
                  isLoading={isLoadingDelete}
                  onClick={onClose}
                >
                  Batal
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
          <DrawerCloseButton right="0px" left="5px" />
        </DrawerContent>
      </Drawer>
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
            fontSize="xs"
            fontWeight="semibold"
            lineHeight={6}
            width="calc(100% - 130px)"
            noOfLines={1}
          >
            {healthToolName}
          </Text>
          <Flex gap={2}>
            <Text color="brownGrey.500" fontSize="xxs" lineHeight={6}>
              {formatDate(parseToDate(createdAt, "iso"), "d MMM yyyy, HH:mm")}
            </Text>
            <IconButton
              variant="fit"
              aria-label="delete"
              color="brownGrey.500"
              icon={<DeleteIcon boxSize="12px" />}
              onClick={onOpen}
              position="relative"
            />
          </Flex>
        </HStack>
        <LinkBox>
          <HStack py={3} px={5} justifyContent="space-between">
            <Box width="calc(100% - 100px)">
              <Text
                fontSize="sm"
                fontFamily="poppins"
                fontWeight="semibold"
                color={`#${descriptionColor}`}
                mb={2}
                noOfLines={1}
              >
                {title}
              </Text>
              <Content isMobile noOfLines={2}>
                {description}
              </Content>
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
                whiteSpace="nowrap"
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
