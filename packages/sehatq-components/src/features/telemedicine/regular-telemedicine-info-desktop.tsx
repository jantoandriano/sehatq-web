import React from "react";
import { useAssets } from "@sehatq/utils";
import { Text, HStack, VStack, useImage } from "../../user-interfaces";

export type RegularTelemedicineInfoDesktopProps = {
  allowFreeChat: boolean;
};

export function RegularTelemedicineInfoDesktop(
  props: RegularTelemedicineInfoDesktopProps
) {
  const { allowFreeChat } = props;
  const Image = useImage();
  const ASSETS = useAssets([
    "KONSUL_01_CHAT_5000",
    "KONSUL_01_CHAT_GRATIS",
    "KONSUL_02_DOKTER_PENGALAMAN",
    "KONSUL_03_CUKUP_DENGAN_CHAT",
  ]);

  return (
    <>
      <HStack spacing={6} justify="center">
        <HStack
          p={4}
          spacing={2}
          align="flex-start"
          boxShadow="base"
          borderRadius="base"
          background="white"
        >
          <Image
            src={
              allowFreeChat
                ? ASSETS.KONSUL_01_CHAT_GRATIS
                : ASSETS.KONSUL_01_CHAT_5000
            }
            alt="chat gratis"
            height={48}
            width={48}
            layout="fixed"
            priority
          />
          <VStack spacing={1} align="flex-start">
            <Text
              fontSize="md"
              fontWeight="semibold"
              fontFamily="poppins"
              color="charcoalGrey"
              lineHeight="7"
            >
              {allowFreeChat
                ? "Chat Dokter Gratis"
                : "Chat Dokter Cuma Rp5.000"}
            </Text>
            <Text lineHeight="4" fontSize="xs" width="233px">
              {allowFreeChat
                ? "Konsultasi dengan dokter mudah dan cepat. No worries. Free!"
                : "Dapatkan konsultasi medis yang optimal dengan tarif terjangkau."}
            </Text>
          </VStack>
        </HStack>
        <HStack
          p={4}
          spacing={2}
          align="flex-start"
          boxShadow="base"
          borderRadius="base"
          background="white"
        >
          <Image
            src={ASSETS.KONSUL_02_DOKTER_PENGALAMAN}
            alt="chat gratis"
            height={48}
            width={48}
            layout="fixed"
            priority
          />
          <VStack spacing={1} align="flex-start">
            <Text
              fontSize="md"
              fontWeight="semibold"
              fontFamily="poppins"
              color="charcoalGrey"
              lineHeight="7"
            >
              Dokter Berpengalaman
            </Text>
            <Text lineHeight="4" fontSize="xs" width="233px">
              SehatQ menghadirkan dokter umum unggulan untuk membantumu.
            </Text>
          </VStack>
        </HStack>
        <HStack
          p={4}
          spacing={2}
          align="flex-start"
          boxShadow="base"
          borderRadius="base"
          background="white"
        >
          <Image
            src={ASSETS.KONSUL_03_CUKUP_DENGAN_CHAT}
            alt="chat gratis"
            height={48}
            width={48}
            layout="fixed"
            priority
          />
          <VStack spacing={1} align="flex-start">
            <Text
              fontSize="md"
              fontWeight="semibold"
              fontFamily="poppins"
              color="charcoalGrey"
              lineHeight="7"
            >
              Cukup dengan Chat
            </Text>
            <Text lineHeight="4" fontSize="xs" width="233px">
              Hanya lewat chat, dokter memberikan rekomendasi sesuai kondisimu.
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </>
  );
}
