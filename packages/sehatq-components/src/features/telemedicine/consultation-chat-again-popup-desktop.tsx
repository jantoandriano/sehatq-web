import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";

import {
  Button,
  Text,
  VStack,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  HStack,
  Link,
  useImage,
} from "../../user-interfaces";

export type ConsultationChatAgainPopupDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ConsultationChatAgainPopupDesktop(
  props: ConsultationChatAgainPopupDesktopProps
) {
  const { isOpen, onClose } = props;

  const ASSETS = useAssets(["ERROR_ICON"]);
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose} trapFocus={false}>
        <ModalOverlay />
        <ModalContent borderRadius="xl" width="632px">
          <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
          <ModalHeader
            fontFamily="poppins"
            paddingBottom={0}
            paddingTop={9}
            textAlign="center"
          >
            Chat Dokter Lagi
          </ModalHeader>
          <ModalBody px={6} py={4}>
            <VStack spacing={5} width="full">
              <Text fontSize="md">
                Kamu sebelumnya menggunakan layanan chat dokter regular
              </Text>
              <HStack
                mt={4}
                spacing={2}
                background="squash.50"
                borderRadius="xl"
                p={3}
                align="flex-start"
              >
                <Image
                  src={ASSETS.ERROR_ICON}
                  alt="warning"
                  width={24}
                  height={24}
                  layout="fixed"
                  priority={true}
                />
                <Text color="#a65c00" fontSize="sm">
                  Chat Lagi memungkinkan kamu berkonsultasi dengan dokter yang
                  berbeda
                </Text>
              </HStack>
              <VStack spacing={2} width="full">
                <Navigate name="TELEMED_GENERAL_CHAT_FORM">
                  <Link variant="solid" colorScheme="main" width="full">
                    Chat Lagi
                  </Link>
                </Navigate>
                <Button
                  isFullWidth
                  variant="fit"
                  fontWeight="semibold"
                  color="sea.500"
                  size="md"
                  onClick={onClose}
                >
                  Batal
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
