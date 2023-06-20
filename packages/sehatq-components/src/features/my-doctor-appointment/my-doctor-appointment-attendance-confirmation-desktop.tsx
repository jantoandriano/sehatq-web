import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  HStack,
  Button,
  Divider,
} from "../../user-interfaces";

export type MyDoctorAppointmentAttendanceConfirmationDesktopProps = {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitAttendanceConfirmation: (value: string) => void;
  onSuccessSubmit: () => void;
};

export function MyDoctorAppointmentAttendanceConfirmationDesktop(
  props: MyDoctorAppointmentAttendanceConfirmationDesktopProps
) {
  const { isOpen, onClose, onSubmitAttendanceConfirmation } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent w="600px">
        <ModalHeader
          pl={10}
          pr={5}
          py={4}
          fontSize="lg"
          fontFamily="poppins"
          fontWeight="semibold"
        >
          Konfirmasikan Kehadiranmu
        </ModalHeader>
        <ModalCloseButton
          h="16px"
          w="16px"
          top="5"
          color="brownGrey.500"
          autoFocus={false}
        />
        <Divider borderColor="veryLightPink" border="solid 0.5px" />
        <ModalBody pt={2} px={10} pb={7}>
          <Text mt={2.5} fontSize="md">
            Klik &apos;Hadir&apos; jika kamu sudah berkonsultasi dengan dokter
            sesuai jadwal booking di SehatQ
          </Text>
          <HStack mt={7} spacing={5} width="100%">
            <Button
              colorScheme="main"
              size="md"
              fontSize="md"
              variant="outline"
              width="100%"
              onClick={() => onSubmitAttendanceConfirmation("not attended")}
            >
              Tidak Hadir
            </Button>
            <Button
              justifyContent="center"
              variant="solid"
              colorScheme="main"
              size="md"
              fontSize="md"
              fontWeight="semibold"
              width="100%"
              onClick={() => onSubmitAttendanceConfirmation("attended")}
            >
              Hadir
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
