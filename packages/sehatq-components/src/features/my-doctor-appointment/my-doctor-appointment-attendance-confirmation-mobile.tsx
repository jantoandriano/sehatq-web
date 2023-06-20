import React from "react";
import {
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  HStack,
  ModalHeader,
  ModalCloseButton,
  Button,
} from "../../user-interfaces";

export type MyDoctorAppointmentAttendanceConfirmationMobileProps = {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitAttendanceConfirmation: (value: string) => void;
  onSuccessSubmit: () => void;
};

export function MyDoctorAppointmentAttendanceConfirmationMobile(
  props: MyDoctorAppointmentAttendanceConfirmationMobileProps
) {
  const { isOpen, onClose, onSubmitAttendanceConfirmation } = props;
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent pt={5} pb={7} px={4} borderRadius="lg">
        <ModalHeader
          fontSize="sm"
          fontFamily="poppins"
          fontWeight="semibold"
          p="0"
        >
          Konfirmasikan Kehadiranmu
        </ModalHeader>
        <ModalCloseButton
          h="16px"
          w="16px"
          top="6"
          color="brownGrey.500"
          autoFocus={false}
        />
        <DrawerBody p="0">
          <Text mt={2} fontSize="sm">
            Klik &apos;Hadir&apos; jika kamu sudah berkonsultasi dengan dokter
            sesuai jadwal booking di SehatQ
          </Text>
          <HStack pt={4} spacing={5} width="100%">
            <Button
              colorScheme="main"
              fontSize="sm"
              variant="outline"
              width="100%"
              height="36px"
              onClick={() => onSubmitAttendanceConfirmation("not attended")}
            >
              Tidak Hadir
            </Button>
            <Button
              justifyContent="center"
              variant="solid"
              colorScheme="main"
              fontSize="sm"
              fontWeight="semibold"
              width="100%"
              height="36px"
              onClick={() => onSubmitAttendanceConfirmation("attended")}
            >
              Hadir
            </Button>
          </HStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
