import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Text,
  VStack,
  HStack,
  Link,
  useImage,
} from "../../user-interfaces";

export type ConsultationChatAgainPopupMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ConsultationChatAgainPopupMobile(
  props: ConsultationChatAgainPopupMobileProps
) {
  const { isOpen, onClose } = props;

  const ASSETS = useAssets(["ERROR_ICON"]);
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <>
      <Drawer
        placement="bottom"
        isOpen={isOpen}
        onClose={onClose}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerHeader
            fontFamily="poppins"
            paddingBottom={0}
            paddingTop={6}
            fontSize="md"
            textAlign="center"
          >
            Chat Dokter Lagi
          </DrawerHeader>
          <DrawerBody px={4} pb={4} pt={2}>
            <VStack spacing={4}>
              <Text fontSize="sm" textAlign="center">
                Kamu sebelumnya menggunakan layanan chat dokter regular
              </Text>
              <HStack
                mt={4}
                spacing={2}
                background="squash.50"
                borderRadius="xl"
                p={3}
              >
                <Image
                  src={ASSETS.ERROR_ICON}
                  alt="warning"
                  width={24}
                  height={24}
                  layout="fixed"
                  priority={true}
                />
                <Text color="#a65c00" fontSize="xs">
                  Chat Lagi memungkinkan kamu berkonsultasi dengan dokter yang
                  berbeda
                </Text>
              </HStack>
              <VStack spacing={2} width="full">
                <Navigate name="TELEMED_GENERAL_CHAT_FORM">
                  <Link
                    variant="solid"
                    fontSize="sm"
                    colorScheme="main"
                    width="full"
                    height="38px"
                  >
                    Chat Lagi
                  </Link>
                </Navigate>
                <Button
                  isFullWidth
                  variant="fit"
                  fontWeight="semibold"
                  color="sea.500"
                  height="38px"
                  fontSize="sm"
                  onClick={onClose}
                >
                  Batal
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
