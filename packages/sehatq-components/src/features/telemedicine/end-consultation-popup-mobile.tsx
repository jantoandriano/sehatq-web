import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Text,
  VStack,
  Flex,
  Box,
} from "../../user-interfaces";
import { Fallback } from "../general";

export type EndConsultationPopupMobileProps = {
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

export function EndConsultationPopupMobile(
  props: EndConsultationPopupMobileProps
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
      <Drawer
        placement="bottom"
        onClose={isSuccess ? goToTelemedLanding : onClose}
        isOpen={isOpen}
        trapFocus={false}
        {...(isSuccess && {
          size: "full",
        })}
      >
        <DrawerOverlay />
        <DrawerContent
          {...(!isSuccess && {
            borderTopRadius: "lg",
          })}
        >
          <DrawerBody px={6} pt={4} pb={6}>
            <Flex direction="column" height="full" justify="center">
              <Box flex={1} height="full" justify="center">
                <Fallback
                  image={{
                    src: !isSuccess
                      ? ASSETS.ILLUSTRATION_END_CHAT_CONFIRMATION
                      : ASSETS.CHAT_ENDED,
                    width: 276,
                    height: 276,
                  }}
                  layout="vertical"
                  title={
                    !isSuccess ? (
                      "Yakin Akhiri Chat?"
                    ) : (
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        fontFamily="poppins"
                        mt="45px"
                      >
                        Chat Dokter Selesai
                      </Text>
                    )
                  }
                  description={
                    <Text
                      color="charcoalGrey"
                      fontSize="sm"
                      fontFamily="openSans"
                      textAlign="center"
                      width="269px"
                    >
                      {!isSuccess
                        ? "Setelah mengakhiri chat, kamu tidak bisa mengajukan pertanyaan lagi"
                        : "Terima kasih sudah menggunakan layanan chat dokter"}
                    </Text>
                  }
                  isMobile
                />
              </Box>
              <VStack spacing={3} width="full" mt={6}>
                {!isSuccess ? (
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
                ) : showPrescriptionButton ? (
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
                  borderColor={!isSuccess ? "white" : "main.500"}
                  size="md"
                  onClick={!isSuccess ? closeConsultationChat : goToRatingForm}
                  isLoading={isUpdating}
                >
                  {!isSuccess ? "Akhiri Chat" : "Beri Rating"}
                </Button>
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
