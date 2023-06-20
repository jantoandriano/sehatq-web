import React from "react";
import { useAssets } from "@sehatq/utils";

import {
  Button,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "../../user-interfaces";
import { Fallback } from "../general";

export type DoctorEndChatConsultationDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickFinish?: () => void;
};

export function DoctorEndChatConsultationDesktop(
  props: DoctorEndChatConsultationDesktopProps
) {
  const { isOpen, onClose, onClickFinish } = props;

  const ASSETS = useAssets(["DOCTOR_END_CHAT"]);
  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="xl" width="632px">
          <ModalCloseButton h={6} w={6} top="3" color="brownGrey.500" />
          <ModalBody padding={6}>
            <VStack spacing={5} width="full">
              <Fallback
                isFullWidth
                image={{
                  src: ASSETS.DOCTOR_END_CHAT,
                  width: 304,
                  height: 330,
                }}
                layout="vertical"
                title="Dokter telah mengakhiri"
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="md"
                    fontFamily="openSans"
                    textAlign="center"
                    width="full"
                  >
                    Setelah mengakhiri chat, kamu tidak bisa mengajukan
                    pertanyaan lagi
                  </Text>
                }
              />
              <Button
                isFullWidth
                variant="solid"
                fontWeight="semibold"
                colorScheme="main"
                onClick={onClickFinish}
                borderRadius="base"
                size="md"
              >
                Selesai
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
