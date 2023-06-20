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

export type ConsultationTimeUpDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  onTryToRegister: () => void;
  onClickFinish?: () => void;
};

export function ConsultationTimeUpDesktop(
  props: ConsultationTimeUpDesktopProps
) {
  const { isOpen, onClose, onTryToRegister, onClickFinish } = props;

  const ASSETS = useAssets(["ILLUSTRATION_TIMES_UP"]);
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
                  src: ASSETS.ILLUSTRATION_TIMES_UP,
                  width: 304,
                  height: 330,
                }}
                layout="vertical"
                title="Waktu Konsultasi Sudah Habis"
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="md"
                    fontFamily="openSans"
                    textAlign="center"
                    width="full"
                  >
                    Selain ikuti anjuran dokter, jika ada rekomendasi resep,
                    jangan lupa tebus resepmu, ya
                  </Text>
                }
              />
              <Button
                isFullWidth
                variant="solid"
                fontWeight="semibold"
                colorScheme="main"
                onClick={onClickFinish ?? onTryToRegister}
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
