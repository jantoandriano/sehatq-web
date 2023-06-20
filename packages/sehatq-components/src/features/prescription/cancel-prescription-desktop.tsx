import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Button,
  VStack,
} from "../../user-interfaces";
import { Fallback } from "../general";

export type CancelPrescriptionDesktopProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isLoading: boolean;
  onHandleCancelPrescription: () => void;
};

export function CancelPrescriptionDesktop(
  props: CancelPrescriptionDesktopProps
) {
  const { onOpen, isOpen, onClose, isLoading, onHandleCancelPrescription } =
    props;
  const ASSETS = useAssets(["CANCEL_PRESCRIPTION"]);
  return (
    <>
      <Button
        variant="fit"
        fontSize="sm"
        lineHeight="5"
        color="sea.500"
        fontWeight="semibold"
        onClick={onOpen}
      >
        Akhiri Tanpa Tebus Resep
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton boxSize={4} top="3" color="charcoalGrey" />
          <ModalBody padding={5}>
            <VStack spacing={4} width="full">
              <Fallback
                isFullWidth
                image={{
                  src: ASSETS.CANCEL_PRESCRIPTION,
                  width: 210,
                  height: 210,
                }}
                layout="vertical"
                title={
                  <Text fontSize="md">Yakin Akhiri Tanpa Tebus Obat?</Text>
                }
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="sm"
                    fontFamily="openSans"
                    textAlign="center"
                    width="full"
                  >
                    Dengan mengakhiri tanpa tebus obat, kamu perlu berkonsultasi
                    lagi dengan dokter untuk mendapatkan resep.
                  </Text>
                }
              />
              <Button
                isFullWidth
                variant="solid"
                colorScheme="main"
                fontSize="sm"
                fontWeight="semibold"
                height="38px"
                borderRadius="base"
                onClick={onClose}
              >
                Lanjut Tebus Resep
              </Button>
              <Button
                isFullWidth
                variant="outline"
                fontWeight="semibold"
                color="sea.500"
                borderColor="main.500"
                size="sm"
                height="38px"
                onClick={onHandleCancelPrescription}
                isLoading={isLoading}
              >
                Akhiri Tanpa Tebus Obat
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
