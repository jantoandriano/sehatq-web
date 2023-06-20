import React from "react";
import {
  Button,
  ChevronRightIcon,
  DocumentCheckIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
} from "../../user-interfaces";

export type ConsultationDisclaimerMobileProps = {
  isOpen: boolean;
  onCloseDisclaimer: () => void;
  isFullWidth?: boolean;
};

export function ConsultationDisclaimerMobile(
  props: ConsultationDisclaimerMobileProps
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
          <Text fontSize="xs" color="charcoalGrey" fontWeight="semibold">
            Baca Disclaimer
          </Text>
        </HStack>
      </Button>
      <Drawer
        placement="bottom"
        isOpen={props.isOpen}
        onClose={props.onCloseDisclaimer}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerHeader
            mt={6}
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
            color="charcoalGrey"
          >
            Disclaimer
          </DrawerHeader>
          <DrawerBody px={6} pb={10}>
            <Flex width="full" align="flex-start" direction="column">
              <Text fontSize="xs" color="charcoalGrey" fontWeight="semibold">
                Chat Dokter SehatQ adalah alternatif untuk mendapatkan tinjauan
                dokter atas kondisi medis yang dialami. Untuk diagnosa pasti,
                silakan kunjungi fasilitas kesehatan dan melakukan konsultasi
                langsung dengan dokter.
              </Text>
              <Text
                fontSize="xs"
                color="charcoalGrey"
                fontWeight="semibold"
                mt={3}
              >
                SehatQ berkomitmen untuk menjamin keamanan data dan privasi
                pasien. Tim dokter kami menggunakan rekam medis pasien terbatas
                untuk kepentingan konsultasi dan tinjauan kesehatan Pengguna
                yang melakukan chat dengan dokter di aplikasi SehatQ harus
                berusia 18 tahun ke atas atau didampingi orangtua/wali yang sah.
              </Text>
              <Button
                mt={6}
                variant="outline"
                colorScheme="sea"
                width="full"
                onClick={props.onCloseDisclaimer}
                fontSize="sm"
                fontWeight="semibold"
                borderRadius="base"
              >
                Tutup
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
