import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Text,
  Button,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "../../user-interfaces";
import { Fallback } from "../general";

export type CancelPrescriptionMobileProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isLoading: boolean;
  onHandleCancelPrescription: () => void;
};

export function CancelPrescriptionMobile(props: CancelPrescriptionMobileProps) {
  const { onOpen, isOpen, onClose, isLoading, onHandleCancelPrescription } =
    props;
  const ASSETS = useAssets(["CANCEL_PRESCRIPTION"]);
  return (
    <>
      <Button
        variant="fit"
        fontSize="xs"
        lineHeight="5"
        color="sea.500"
        fontWeight="semibold"
        onClick={onOpen}
      >
        Akhiri Tanpa Tebus Resep
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        trapFocus={false}
      >
        <DrawerOverlay>
          <DrawerContent borderTopRadius="lg">
            <DrawerBody px={4} py={5}>
              <VStack spacing={3}>
                <Fallback
                  image={{
                    src: ASSETS.CANCEL_PRESCRIPTION,
                    width: 200,
                    height: 200,
                  }}
                  layout="vertical"
                  title="Yakin Akhiri Tanpa Tebus Obat?"
                  description={
                    <Text
                      color="charcoalGrey"
                      fontSize="sm"
                      fontFamily="openSans"
                      textAlign="center"
                      width="100%"
                    >
                      Dengan mengakhiri tanpa tebus obat, kamu perlu
                      berkonsultasi lagi dengan dokter untuk mendapatkan resep.
                    </Text>
                  }
                  isMobile
                />
                <Button
                  variant="solid"
                  colorScheme="main"
                  fontSize="md"
                  fontWeight="semibold"
                  width="full"
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
                  size="md"
                  onClick={onHandleCancelPrescription}
                  isLoading={isLoading}
                >
                  Akhiri Tanpa Tebus Obat
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
