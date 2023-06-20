import { FocusableElement } from "@chakra-ui/utils";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  Button,
  ModalBody,
  RadioGroup,
  RadioGroupProps,
  TickIcon,
  Stack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Textarea,
  StackDivider,
} from "../../user-interfaces";

export type MyAppointmentCancelationDesktopProps = {
  children?: React.ReactNode;
  cancelationReasonsOptions: RadioGroupProps["options"];
  onChangeOptionReason: RadioGroupProps["onChange"];
  selectedReason: string;
  selectedOptionReason: string;
  onSubmitOptionReason: React.FormEventHandler<HTMLDivElement>;
  onOpenReasonOptions: () => void;
  isOpenReasonOptions: boolean;
  onCloseReasonOptions: () => void;
  alertCancelationRef: React.MutableRefObject<FocusableElement | undefined>;
  isOpenAlertCancelation: boolean;
  onConfirmAlertCancelation: () => void;
  onChangeOtherOption: React.ChangeEventHandler<HTMLTextAreaElement>;
  isLoadingAlertCancelation: boolean;
  onAbortAlertCancelation: () => void;
  isButtonFullWidth?: boolean;
};

export function MyAppointmentCancelationDesktop(
  props: MyAppointmentCancelationDesktopProps
) {
  const {
    children = (
      <Button
        variant="outline"
        colorScheme="brownGrey"
        size="sm"
        fontSize="xs"
        width="90px"
      >
        Batalkan
      </Button>
    ),
    selectedReason,
    selectedOptionReason,
    cancelationReasonsOptions,
    onChangeOptionReason,
    onSubmitOptionReason,
    isOpenReasonOptions,
    onOpenReasonOptions,
    onCloseReasonOptions,
    alertCancelationRef,
    isOpenAlertCancelation,
    onConfirmAlertCancelation,
    onChangeOtherOption,
    isLoadingAlertCancelation,
    onAbortAlertCancelation,
    isButtonFullWidth,
  } = props;
  return (
    <>
      <Box
        onClick={onOpenReasonOptions}
        {...(isButtonFullWidth ? { w: "100%" } : null)}
      >
        {children}
      </Box>
      <Modal isOpen={isOpenReasonOptions} onClose={onCloseReasonOptions}>
        <ModalOverlay />
        <ModalContent px="5" py="6" as="form" onSubmit={onSubmitOptionReason}>
          <ModalHeader fontFamily="poppins" fontWeight="semibold" p="0">
            Pilih Alasan Pembatalan
          </ModalHeader>
          <ModalBody px="0" pt="6">
            <Stack spacing="5">
              <RadioGroup
                spacing="3"
                defaultValue={selectedOptionReason}
                options={cancelationReasonsOptions}
                name="cancelation-reasons"
                onChange={onChangeOptionReason}
                iconPosition="right"
                IconFill={TickIcon}
                direction="column"
                divider={<StackDivider borderColor="veryLightPink" />}
              />
              {selectedOptionReason === "Lainnya" ? (
                <Textarea
                  value={selectedReason}
                  onChange={onChangeOtherOption}
                  borderRadius="xl"
                  placeholder="Masukkan alasan"
                  borderColor="veryLightPink"
                  autoFocus={false}
                  fontSize="sm"
                  _placeholder={{ color: "brownGrey.500" }}
                  _hover={{ borderColor: "main.500" }}
                  _focus={{ borderColor: "main.500" }}
                  resize="none"
                  h="96px"
                />
              ) : null}
              <Button type="submit">Batalkan Booking</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpenAlertCancelation}
        leastDestructiveRef={
          alertCancelationRef as React.MutableRefObject<FocusableElement>
        }
        isCentered
        onClose={onAbortAlertCancelation}
      >
        <AlertDialogOverlay>
          <AlertDialogContent alignItems="center" py="3">
            <AlertDialogHeader
              textAlign="center"
              fontSize="md"
              fontWeight="semibold"
              w="187px"
              px="0"
              py="8"
            >
              Anda yakin ingin membatalkan janji
            </AlertDialogHeader>
            <AlertDialogFooter justifyContent="center" py="0" pb="3" w="100%">
              <Button
                variant="outline"
                onClick={onConfirmAlertCancelation}
                w="100%"
                isLoading={isLoadingAlertCancelation}
              >
                Ya
              </Button>
              <Button
                isLoading={isLoadingAlertCancelation}
                colorScheme="main"
                ml={3}
                onClick={onAbortAlertCancelation}
                w="100%"
              >
                Tidak
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
