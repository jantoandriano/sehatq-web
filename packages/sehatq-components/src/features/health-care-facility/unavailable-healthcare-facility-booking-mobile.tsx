import { useAssets } from "@sehatq/utils";
import React from "react";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useImage,
  VStack,
} from "../../user-interfaces";

interface Props {
  isOpen: boolean;
  toggleModalUnavaialable: () => void;
}

export function UnavailableHealthCareFacilityBookingInfoMobile({
  isOpen,
  toggleModalUnavaialable,
}: Props) {
  const ASSETS = useAssets(["UNAVAILABLE_AT_THE_MOMENT"]);
  const Image = useImage();
  return (
    <>
      <Button
        onClick={toggleModalUnavaialable}
        variant="outline"
        color="sea.500"
        borderColor="main.500"
        fontSize="sm"
        isFullWidth
      >
        Layanan Belum Tersedia
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={toggleModalUnavaialable}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalBody position="relative">
          <ModalContent position="absolute" bottom={0} margin={0}>
            <VStack
              bg="white"
              w="full"
              borderTopRadius="xl"
              py={4}
              px={2}
              spacing={8}
              position="relative"
            >
              <Divider
                w="40px"
                h="2px"
                bg="#D8D8D8"
                position="absolute"
                top={4}
              />
              <Image
                src={ASSETS.UNAVAILABLE_AT_THE_MOMENT}
                layout="responsive"
                alt="Booking not available at the moment"
                width={1}
                height={1.1}
                wrapperProps={{
                  width: "165px",
                }}
              />
              <VStack>
                <Text fontFamily="Poppins" fontWeight="semibold">
                  Layanan Belum Tersedia Saat Ini
                </Text>
                <Text fontSize="sm" textAlign="center" pb={4}>
                  Kamu bisa hubungi faskes ini untuk <br /> info lebih lanjut.
                </Text>
                <Button
                  as="a"
                  href="https://wa.me/6281288588167"
                  variant="outline"
                  color="sea.500"
                  borderColor="main.500"
                  fontSize="sm"
                  isFullWidth
                >
                  Hubungi CS SehatQ
                </Button>
              </VStack>
            </VStack>
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
}
