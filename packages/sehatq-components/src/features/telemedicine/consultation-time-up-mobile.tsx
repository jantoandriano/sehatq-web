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

export type ConsultationTimeUpMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  onTryToRegister: () => void;
  onClickFinish?: () => void;
};

export function ConsultationTimeUpMobile(props: ConsultationTimeUpMobileProps) {
  const { isOpen, onClose, onTryToRegister, onClickFinish } = props;

  const ASSETS = useAssets(["ILLUSTRATION_TIMES_OUT"]);
  return (
    <>
      <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerBody px={4} pt={4} pb={6}>
            <VStack spacing={7} height="full">
              <Fallback
                image={{
                  src: ASSETS.ILLUSTRATION_TIMES_OUT,
                  width: 264,
                  height: 264,
                }}
                layout="vertical"
                title="Waktu Konsultasi Sudah Habis"
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="sm"
                    fontFamily="openSans"
                    textAlign="center"
                    width="full"
                  >
                    Selain ikuti anjuran dokter, jika ada rekomendasi resep,
                    jangan lupa tebus resepmu, ya
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
                onClick={onClickFinish ?? onTryToRegister}
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
