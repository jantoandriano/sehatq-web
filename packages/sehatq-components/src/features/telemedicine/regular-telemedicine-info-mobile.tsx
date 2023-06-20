import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  LinkBox,
  LinkOverlay,
  Flex,
  ChevronRightIcon,
  useImage,
} from "../../user-interfaces";

export type RegularTelemedicineInfoMobileProps = {
  allowFreeChat: boolean;
  isOpenTelemedicineInfo: boolean;
  onCloseTelemedicineInfo: () => void;
};

export function RegularTelemedicineInfoMobile(
  props: RegularTelemedicineInfoMobileProps
) {
  const { onCloseTelemedicineInfo, allowFreeChat, isOpenTelemedicineInfo } =
    props;
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets([
    "KONSUL_01_CHAT_5000",
    "KONSUL_01_CHAT_GRATIS",
    "KONSUL_02_DOKTER_PENGALAMAN",
    "KONSUL_03_CUKUP_DENGAN_CHAT",
    "KONSUL_04_CARI_DOKTER_LAIN",
  ]);

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
          <DrawerHeader
            py={3}
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
          >
            Konsultasi Dokter Umum
          </DrawerHeader>
          <DrawerBody px={4} pb={4}>
            <VStack spacing={6} align="flex-start">
              <HStack spacing={2} align="flex-start">
                <Image
                  src={
                    allowFreeChat
                      ? ASSETS.KONSUL_01_CHAT_GRATIS
                      : ASSETS.KONSUL_01_CHAT_5000
                  }
                  alt="chat gratis"
                  height={60}
                  width={60}
                  layout="fixed"
                  priority
                />
                <VStack spacing={1} align="flex-start">
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    fontFamily="poppins"
                    color="charcoalGrey"
                  >
                    {allowFreeChat
                      ? "Chat Dokter Gratis"
                      : "Chat Dokter Cuma Rp5.000"}
                  </Text>
                  <Text lineHeight="4" fontSize="xs">
                    {allowFreeChat
                      ? "Konsultasi dengan dokter mudah dan cepat. No worries. Free!"
                      : "Dengan tarif terjangkau, kamu bisa memperoleh konsultasi medis yang optimal."}
                  </Text>
                </VStack>
              </HStack>
              <HStack spacing={2} align="flex-start">
                <Image
                  src={ASSETS.KONSUL_02_DOKTER_PENGALAMAN}
                  alt="chat gratis"
                  height={60}
                  width={60}
                  layout="fixed"
                  priority
                />
                <VStack spacing={1} align="flex-start">
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    fontFamily="poppins"
                    color="charcoalGrey"
                  >
                    Dokter Berpengalaman
                  </Text>
                  <Text lineHeight="4" fontSize="xs">
                    SehatQ menghadirkan dokter umum unggulan untuk membantumu.
                  </Text>
                </VStack>
              </HStack>
              <HStack spacing={2} align="flex-start">
                <Image
                  src={ASSETS.KONSUL_03_CUKUP_DENGAN_CHAT}
                  alt="chat gratis"
                  height={60}
                  width={60}
                  layout="fixed"
                  priority
                />
                <VStack spacing={1} align="flex-start">
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    fontFamily="poppins"
                    color="charcoalGrey"
                  >
                    Cukup dengan Chat
                  </Text>
                  <Text lineHeight="4" fontSize="xs">
                    Hanya lewat chat, dokter akan memberikan rekomendasi sesuai
                    kondisimu.
                  </Text>
                </VStack>
              </HStack>
              <LinkBox
                width="full"
                color="charcoalGrey"
                justifyContent="space-between"
                _hover={{
                  border: "solid 1px",
                  borderColor: "main.500",
                  background: "iceBlue.500",
                  borderRadius: "xl",
                }}
              >
                <Flex justify="space-between" align="center">
                  <HStack spacing={2}>
                    <Image
                      src={ASSETS.KONSUL_04_CARI_DOKTER_LAIN}
                      alt="cari dokter lain"
                      height={60}
                      width={60}
                      layout="fixed"
                      priority
                    />
                    <VStack spacing={1} align="flex-start">
                      <Navigate name="TELEMED_HCPS" query={{ slugs: ["umum"] }}>
                        <LinkOverlay
                          fontFamily="poppins"
                          fontWeight="semibold"
                          fontSize="sm"
                        >
                          Pilih Dokter Umum Sendiri
                        </LinkOverlay>
                      </Navigate>
                      <Text fontSize="xs" lineHeight="4">
                        Kamu bisa chat dengan dokter pilihanmu
                      </Text>
                    </VStack>
                  </HStack>
                  <ChevronRightIcon boxSize={6} color="main.500" />
                </Flex>
              </LinkBox>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
