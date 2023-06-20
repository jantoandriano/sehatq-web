import React from "react";
import { useNavigation } from "@sehatq/utils";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  Text,
  VStack,
  HStack,
  LinkBox,
  LinkOverlay,
  Box,
  Button,
  BookingTelemedIcon,
  ConsultationTelemedIcon,
  ChevronRightIcon,
  ButtonProps,
} from "../../user-interfaces";

export type StartConsultationMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  onStartConsultation: () => void;
  doctorSlug: string;
  isLoading: boolean;
  canBook: boolean;
  onSubmitConsultationCheckout: () => void;
  buttonProps?: ButtonProps;
};

export function StartConsultationMobile(props: StartConsultationMobileProps) {
  const { Navigate } = useNavigation();
  const {
    isOpen,
    onClose,
    onStartConsultation,
    doctorSlug,
    isLoading,
    onSubmitConsultationCheckout,
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

      <Drawer
        placement="bottom"
        isOpen={isOpen}
        onClose={onClose}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="lg">
          <DrawerHeader
            pt={6}
            pb={2}
            px={4}
            fontSize="md"
            fontFamily="poppins"
            fontWeight="semibold"
            color="charcoalGrey"
          >
            Pilih Konsultasi
          </DrawerHeader>
          <DrawerBody px={4} pb={6}>
            <VStack spacing={3} align="flex-start">
              {canBook ? (
                <LinkBox
                  p={4}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="full"
                  borderRadius="xl"
                  boxShadow="base"
                  _hover={{
                    border: "solid 1px",
                    borderColor: "main.500",
                    background: "iceBlue.500",
                  }}
                >
                  <HStack spacing={4}>
                    <BookingTelemedIcon boxSize="28px" />
                    <Box textAlign="start">
                      <Navigate
                        name="TELEMED_HCP_SCHEDULES"
                        query={{ slug: doctorSlug }}
                      >
                        <LinkOverlay
                          fontFamily="poppins"
                          fontWeight="semibold"
                          fontSize="sm"
                          lineHeight="6"
                        >
                          Pilih Jadwal Lain
                        </LinkOverlay>
                      </Navigate>
                      <Text fontSize="xs">
                        Buat jadwal konsultasi untuk nanti
                      </Text>
                    </Box>
                  </HStack>
                  <ChevronRightIcon boxSize={6} color="sea.500" />
                </LinkBox>
              ) : (
                <Box
                  p={4}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="full"
                  borderRadius="xl"
                  background="gray.500"
                >
                  <HStack spacing={4}>
                    <BookingTelemedIcon boxSize="28px" />
                    <Box textAlign="start">
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
                  <ChevronRightIcon boxSize={6} color="sea.500" />
                </Box>
              )}

              <HStack
                role="button"
                tabindex="0"
                spacing={4}
                p={4}
                justify="space-between"
                borderRadius="xl"
                boxShadow="base"
                width="full"
                _active={{
                  border: "solid 1px",
                  borderColor: "main.500",
                  background: "iceBlue.500",
                  cursor: "pointer",
                }}
                onClick={isLoading ? undefined : onSubmitConsultationCheckout}
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
                    <Text fontSize="xs">
                      {isLoading
                        ? "Sedang membuat konsultasi"
                        : "Mulai konsultasi sekarang juga"}
                    </Text>
                  </Box>
                </HStack>
                <ChevronRightIcon boxSize={6} color="sea.500" />
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
