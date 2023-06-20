import React from "react";
import {
  Button,
  ChevronRightIcon,
  DocumentCheckIcon,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "../../user-interfaces";

export type ConsultationDisclaimerDesktopProps = {
  isOpen: boolean;
  onCloseDisclaimer: () => void;
  isFullWidth?: boolean;
};
export function ConsultationDisclaimerDesktop(
  props: ConsultationDisclaimerDesktopProps
) {
  return (
    <>
      <Button
        width={props.isFullWidth ? "full" : "max-content"}
        rightIcon={<ChevronRightIcon color="brownGrey.500" />}
        variant="solid"
        colorScheme="gray"
        background="gray.500"
        justifyContent="space-between"
        borderRadius="lg"
        onClick={props.onCloseDisclaimer}
      >
        <HStack>
          <DocumentCheckIcon />
          <Text fontSize="sm" color="charcoalGrey" fontWeight="semibold">
            Baca Disclaimer
          </Text>
        </HStack>
      </Button>
      <Modal isOpen={props.isOpen} onClose={props.onCloseDisclaimer} size="2xl">
        <ModalOverlay />
        <ModalContent p={6}>
          <ModalHeader
            fontSize="lg"
            color="charcoalGrey"
            fontFamily="poppins"
            fontWeight="semibold"
            textAlign="center"
          >
            Disclaimer
          </ModalHeader>
          <ModalBody p="5" as="form">
            <VStack spacing={4}>
              <Text fontSize="sm" color="charcoalGrey">
                1. Chat Dokter SehatQ adalah alternatif untuk mendapatkan
                tinjauan dokter atas kondisi medis yang dialami. Untuk diagnosa
                lebih akurat, silakan kunjungi fasilitas kesehatan dan melakukan
                konsultasi langsung dengan dokter.
              </Text>
              <Text fontSize="sm" color="charcoalGrey">
                2. SehatQ berkomitmen untuk menjamin keamanan data dan privasi
                pasien. Tim dokter kami menggunakan rekam medis pasien terbatas
                untuk kepentingan konsultasi dan tinjauan kesehatan.
              </Text>
              <Text fontSize="sm" color="charcoalGrey">
                3. Pengguna yang melakukan chat dengan dokter di aplikasi SehatQ
                harus berusia 18 tahun ke atas atau didampingi orangtua/wali
                yang sah.
              </Text>
            </VStack>
            <ModalFooter justifyContent="center">
              <Button
                mt={8}
                variant="solid"
                colorScheme="main"
                width="425px"
                height="50px"
                borderRadius="base"
                onClick={props.onCloseDisclaimer}
                fontSize="md"
                fontWeight="semibold"
                boxShadow="2xl"
              >
                Tutup
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
