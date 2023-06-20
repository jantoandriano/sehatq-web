import React from "react";
import { Circle } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  HStack,
  VStack,
  Box,
  BookingTelemedIcon,
  ConsultationTelemedIcon,
  Button,
  CircleIcon,
  ButtonProps,
} from "../../user-interfaces";

export type StartConsultationDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  onStartConsultation: () => void;
  stateCheckedValue: string;
  onChooseConsultation: (value: string) => void;
  onSubmitConsultationCheckout: () => void;
  canBook: boolean;
  isLoading: boolean;
  buttonProps?: ButtonProps;
};

export function StartConsultationDesktop(props: StartConsultationDesktopProps) {
  const {
    isOpen,
    onClose,
    stateCheckedValue,
    onChooseConsultation,
    onSubmitConsultationCheckout,
    onStartConsultation,
    isLoading,
    buttonProps,
    canBook,
  } = props;

  return (
    <>
      <Button
        fontSize="sm"
        fontWeight="semibold"
        fontFamily="openSans"
        width="120px"
        borderRadius="base"
        onClick={onStartConsultation}
        {...buttonProps}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="lg" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="md"
            textAlign="center"
            borderBottom="solid 0.5px"
            borderBottomColor="veryLightPink"
          >
            Pilih Konsultasi
          </ModalHeader>
          <ModalCloseButton border="none" color="main.500" size="md" />
          <ModalBody p="5">
            <VStack spacing={5}>
              {canBook ? (
                <HStack
                  spacing={4}
                  p={4}
                  justify="space-between"
                  borderRadius="xl"
                  boxShadow="base"
                  _hover={{
                    cursor: "pointer",
                  }}
                  {...(stateCheckedValue === "booking" && {
                    border: "solid 1px",
                    borderColor: "main.500",
                    background: "iceBlue.500",
                  })}
                  width="full"
                  onClick={() =>
                    isLoading ? null : onChooseConsultation("booking")
                  }
                >
                  <HStack spacing={4}>
                    <BookingTelemedIcon boxSize="28px" />
                    <Box>
                      <Text
                        fontFamily="poppins"
                        fontWeight="semibold"
                        fontSize="sm"
                        lineHeight="6"
                      >
                        Pilih Jadwal Lain
                      </Text>
                      <Text fontSize="xs">
                        Buat jadwal konsultasi untuk nanti
                      </Text>
                    </Box>
                  </HStack>
                  {stateCheckedValue === "booking" ? (
                    <CircleIcon boxSize="16px" />
                  ) : (
                    <Circle size="16px" background="veryLightPink" />
                  )}
                </HStack>
              ) : (
                <HStack
                  spacing={4}
                  p={4}
                  justify="space-between"
                  borderRadius="xl"
                  _hover={{
                    cursor: "not-allowed",
                  }}
                  width="full"
                  background="veryLightPink"
                >
                  <HStack spacing={4}>
                    <BookingTelemedIcon boxSize="28px" />
                    <Box>
                      <Text
                        fontFamily="poppins"
                        fontWeight="semibold"
                        fontSize="sm"
                        lineHeight="6"
                      >
                        Pilih Jadwal Lain
                      </Text>
                      <Text fontSize="xs">
                        Buat jadwal konsultasi untuk nanti
                      </Text>
                    </Box>
                  </HStack>
                  <Circle size="16px" background="veryLightPink" />
                </HStack>
              )}
              <HStack
                p={4}
                justify="space-between"
                borderRadius="xl"
                boxShadow="base"
                width="full"
                _hover={{
                  cursor: "pointer",
                }}
                {...(stateCheckedValue === "walkin" && {
                  border: "solid 1px",
                  borderColor: "main.500",
                  background: "iceBlue.500",
                })}
                onClick={() =>
                  isLoading ? null : onChooseConsultation("walkin")
                }
              >
                <HStack spacing={4}>
                  <ConsultationTelemedIcon boxSize="28px" />
                  <Box>
                    <Text
                      fontFamily="poppins"
                      fontWeight="semibold"
                      fontSize="sm"
                      lineHeight="6"
                    >
                      Konsultasi Sekarang
                    </Text>
                    <Text fontSize="xs">Mulai konsultasi sekarang juga</Text>
                  </Box>
                </HStack>
                {stateCheckedValue === "walkin" ? (
                  <CircleIcon boxSize="16px" />
                ) : (
                  <Circle size="16px" background="veryLightPink" />
                )}
              </HStack>
            </VStack>
            <Button
              colorScheme="main"
              variant="solid"
              size="md"
              borderRadius="base"
              w="full"
              mt={8}
              isLoading={isLoading}
              onClick={onSubmitConsultationCheckout}
              {...(!stateCheckedValue && {
                disabled: true,
              })}
            >
              Lanjutkan
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
