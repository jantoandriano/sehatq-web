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
} from "../../user-interfaces";
import { Fallback } from "../general";

export type DoctorEndChatConsultationMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickFinish?: () => void;
};

export function DoctorEndChatConsultationMobile(
  props: DoctorEndChatConsultationMobileProps
) {
  const { isOpen, onClose, onClickFinish } = props;

  const ASSETS = useAssets(["DOCTOR_END_CHAT"]);
  return (
    <>
      <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerBody px={4} pt={4} pb={6}>
            <VStack spacing={7} height="full">
              <Fallback
                image={{
                  src: ASSETS.DOCTOR_END_CHAT,
                  width: 264,
                  height: 264,
                }}
                layout="vertical"
                title="Dokter telah mengakhiri"
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="sm"
                    fontFamily="openSans"
                    textAlign="center"
                    width="full"
                  >
                    Setelah mengakhiri chat, kamu tidak bisa mengajukan
                    pertanyaan lagi
                  </Text>
                }
                isFullWidth
                isMobile
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
