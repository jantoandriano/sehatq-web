import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  VStack,
  Link,
} from "../../user-interfaces";
import { Fallback } from "../general";

export type RegularTelemedicineClosedPopupMobileProps = {
  isOpenTelemedicineInfo: boolean;
  onCloseTelemedicineInfo: () => void;
  operationHours: string[];
};

export function RegularTelemedicineClosedPopupMobile(
  props: RegularTelemedicineClosedPopupMobileProps
) {
  const { onCloseTelemedicineInfo, isOpenTelemedicineInfo, operationHours } =
    props;
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["ILLUSTRATION_TELEMED_DOC_REST"]);

  return (
    <>
      <Drawer
        placement="bottom"
        onClose={onCloseTelemedicineInfo}
        isOpen={isOpenTelemedicineInfo}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerBody px={4} py={4}>
            <VStack spacing={6}>
              <Fallback
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
                    fontSize="sm"
                    fontFamily="openSans"
                    textAlign="center"
                  >
                    Layanan Chat Dokter selalu siap melayanimu setiap hari
                    Senin-Minggu pukul{" "}
                    <Text as="span" color="sea.500" fontWeight="semibold">
                      {operationHours.join(" - ")} WIB
                    </Text>
                  </Text>
                }
                isMobile
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
