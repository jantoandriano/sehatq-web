import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";

import {
  Text,
  VStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "../../user-interfaces";
import { Fallback } from "../general";

export type RegularTelemedicineClosedPopupDesktopProps = {
  isOpenTelemedicineInfo: boolean;
  onCloseTelemedicineInfo: () => void;
  operationHours: string[];
};

export function RegularTelemedicineClosedPopupDesktop(
  props: RegularTelemedicineClosedPopupDesktopProps
) {
  const { isOpenTelemedicineInfo, onCloseTelemedicineInfo, operationHours } =
    props;
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ILLUSTRATION_TELEMED_DOC_REST"]);
  return (
    <>
      <Modal
        size="lg"
        isOpen={isOpenTelemedicineInfo}
        onClose={onCloseTelemedicineInfo}
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalBody padding={6}>
            <VStack spacing={6} width="full">
              <Fallback
                isFullWidth
                image={{
                  src: ASSETS.ILLUSTRATION_TELEMED_DOC_REST,
                  width: 264,
                  height: 264,
                }}
                layout="vertical"
                title="Dokternya Istirahat Dulu, Ya"
                description={
                  <Text
                    color="charcoalGrey"
                    fontSize="lg"
                    fontFamily="openSans"
                    textAlign="center"
                    width="440px"
                    lineHeight="8"
                  >
                    Layanan Chat Dokter selalu siap melayanimu setiap hari
                    Senin-Minggu pukul{" "}
                    <Text as="span" color="sea.500" fontWeight="semibold">
                      {operationHours.join(" - ")} WIB
                    </Text>
                  </Text>
                }
              />
              <Navigate name="HOME">
                <Link
                  variant="solid"
                  size="md"
                  colorScheme="main"
                  width="full"
                  borderRadius="base"
                >
                  Kembali
                </Link>
              </Navigate>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
