import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Box,
  Button,
  DrawerBody,
  RadioGroup,
  RadioGroupProps,
  TickIcon,
  Stack,
  Textarea,
  StackDivider,
} from "../../user-interfaces";

export type MyAppointmentCancelationMobileProps = {
  children?: React.ReactNode;
  cancelationReasonsOptions: RadioGroupProps["options"];
  onChangeOptionReason: RadioGroupProps["onChange"];
  selectedReason: string;
  selectedOptionReason: string;
  onSubmitOptionReason: React.FormEventHandler<HTMLDivElement>;
  onOpenReasonOptions: () => void;
  isOpenReasonOptions: boolean;
  onCloseReasonOptions: () => void;
  isOpenAlertCancelation: boolean;
  onConfirmAlertCancelation: () => void;
  onChangeOtherOption: React.ChangeEventHandler<HTMLTextAreaElement>;
  isLoadingAlertCancelation: boolean;
  onAbortAlertCancelation: () => void;
  isButtonFullWidth?: boolean;
};

export function MyAppointmentCancelationMobile(
  props: MyAppointmentCancelationMobileProps
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
      <Drawer
        isOpen={isOpenReasonOptions}
        onClose={onCloseReasonOptions}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent px="4" py="6">
          <DrawerHeader
            fontFamily="poppins"
            fontWeight="semibold"
            p="0"
            fontSize="md"
          >
            Pilih Alasan Pembatalan
          </DrawerHeader>
          <DrawerBody px="0" pt="2.5" as="form" onSubmit={onSubmitOptionReason}>
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
              <Button type="submit" mt="3">
                Batalkan Booking
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isOpenAlertCancelation}
        placement="bottom"
        onClose={onAbortAlertCancelation}
      >
        <DrawerOverlay>
          <DrawerContent alignItems="center" py="3">
            <DrawerHeader
              textAlign="center"
              fontSize="md"
              fontWeight="semibold"
              px="0"
              py="8"
            >
              Anda yakin ingin membatalkan janji
            </DrawerHeader>
            <Stack px="4" w="100%">
              <Button
                colorScheme="main"
                onClick={onConfirmAlertCancelation}
                w="100%"
                isLoading={isLoadingAlertCancelation}
              >
                Ya
              </Button>
              <Button
                isLoading={isLoadingAlertCancelation}
                variant="ghost"
                colorScheme="sea"
                ml={3}
                onClick={onAbortAlertCancelation}
                w="100%"
              >
                Tidak
              </Button>
            </Stack>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
