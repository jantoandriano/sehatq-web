import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Fallback,
  Text,
  VStack,
} from "@sehatq/components";

import { useUpdateConsultation } from "./consultation-queries";

export type EndConsultationPopupProps = {
  consultationId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function EndConsultationPopup(props: EndConsultationPopupProps) {
  const { consultationId, isOpen, onClose, onSuccess } = props;

  const { mutate: updateConsultation, isLoading: isUpdating } =
    useUpdateConsultation();

  function closeConsultationChat() {
    updateConsultation(
      {
        consultationId,
        status: "closed",
      },
      {
        onSuccess,
      }
    );
  }

  const ASSETS = useAssets(["ILLUSTRATION_END_CHAT_CONFIRMATION"]);

  return (
    <>
      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerBody px={6} pt={4} pb={6}>
            <VStack spacing={7} height="full">
              <Fallback
                image={{
                  src: ASSETS.ILLUSTRATION_END_CHAT_CONFIRMATION,
                  width: 276,
                  height: 276,
                }}
                layout="vertical"
                title="Yakin Akhiri Konsultasi?"
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="sm"
                    fontFamily="openSans"
                    textAlign="center"
                  >
                    Setelah sesi chat dokter selesai, kamu tidak bisa mengajukan
                    pertanyaan lagi
                  </Text>
                }
                isMobile
              />
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
                  Batal
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
                  Akhiri Konsultasi
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
