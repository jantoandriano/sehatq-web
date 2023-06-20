import React from "react";
import { useAssets } from "@sehatq/utils";

import {
  Button,
  Text,
  VStack,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "../../user-interfaces";
import { Fallback } from "../general";

export type EndConsultationPopupDesktopProps = {
  consultationId: string;
  isOpen: boolean;
  isSuccess: boolean;
  isUpdating: boolean;
  onClose: () => void;
  goToRatingForm: () => void;
  goToTelemedLanding: () => void;
  closeConsultationChat: () => void;
  showPrescriptionButton: boolean;
  isLoading: boolean;
  onClickPrescriptionDetail: () => void;
};

export function EndConsultationPopupDesktop(
  props: EndConsultationPopupDesktopProps
) {
  const {
    isOpen,
    isSuccess,
    isUpdating,
    onClose,
    goToRatingForm,
    goToTelemedLanding,
    closeConsultationChat,
    showPrescriptionButton,
    isLoading,
    onClickPrescriptionDetail,
  } = props;

  const ASSETS = useAssets([
    "ILLUSTRATION_END_CHAT_CONFIRMATION",
    "CHAT_ENDED",
  ]);

  return (
    <>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={isSuccess ? goToTelemedLanding : onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl" width="632px">
          <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
          <ModalBody padding={6}>
            <VStack spacing={5} width="full">
              <Fallback
                image={{
                  src: !isSuccess
                    ? ASSETS.ILLUSTRATION_END_CHAT_CONFIRMATION
                    : ASSETS.CHAT_ENDED,
                  width: 395,
                  height: 395,
                }}
                layout="vertical"
                title={
                  !isSuccess ? "Yakin Akhiri Chat?" : "Chat Dokter Selesai"
                }
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="md"
                    fontFamily="openSans"
                    textAlign="center"
                    {...(isSuccess && {
                      width: "564px",
                    })}
                  >
                    {!isSuccess
                      ? "Setelah mengakhiri chat, kamu tidak bisa mengajukan pertanyaan lagi"
                      : "Terima kasih sudah menggunakan layanan chat dokter"}
                  </Text>
                }
              />
              {!isSuccess ? (
                <VStack spacing={2} width="full">
                  <Button
                    isFullWidth
                    variant="solid"
                    fontWeight="semibold"
                    colorScheme="main"
                    onClick={onClose}
                    borderRadius="base"
                    size="md"
                    isLoading={isUpdating}
                  >
                    Tetap Lanjutkan Chat
                  </Button>
                  <Button
                    isFullWidth
                    variant="outline"
                    fontWeight="semibold"
                    color="sea.500"
                    borderColor="white"
                    size="md"
                    onClick={closeConsultationChat}
                    isLoading={isUpdating}
                  >
                    Akhiri Chat
                  </Button>
                </VStack>
              ) : (
                <HStack spacing={2} width="100%">
                  {showPrescriptionButton ? (
                    <Button
                      isFullWidth
                      variant="solid"
                      fontWeight="semibold"
                      colorScheme="main"
                      onClick={onClickPrescriptionDetail}
                      isLoading={isLoading}
                      borderRadius="base"
                      size="md"
                    >
                      Tebus Resep
                    </Button>
                  ) : null}
                  <Button
                    isFullWidth
                    variant="outline"
                    fontWeight="semibold"
                    color="sea.500"
                    onClick={goToRatingForm}
                    borderColor="main.500"
                    borderRadius="base"
                    size="md"
                  >
                    Beri Rating
                  </Button>
                </HStack>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
