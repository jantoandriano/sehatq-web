import React from "react";
import {
  Text,
  Image,
  VStack,
  Box,
  Stack,
  StackDivider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  GridBlock,
  GridBlockItem,
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";
import { CountdownTimer, ModalConfirmationExit } from "../payment";
import { SummaryOrder } from "./summary-order";
import { OvoFormChargeDesktopProps } from "./ovo-type";

export function OvoFormChargeDesktop(props: OvoFormChargeDesktopProps) {
  const {
    phoneNumber,
    onChangePhoneNumber,
    onPurchase,
    isLoadingPurchase,
    statePayment,
    setStatePayment,
    phoneNumberError,
    isOpen,
    onClose,
    onConfirm,
  } = props;
  return (
    <>
      <CountdownTimer isMobile={false} setStatePayment={setStatePayment} />
      <GridBlock my={6} isReverse>
        <GridBlockItem>
          <Box bgColor="main.100" width="full" borderRadius="md" padding="4">
            <VStack spacing="4">
              <Text>Anda melakukan pembayaran melalui</Text>

              <Image
                src="https://static.sehatq.com/tokoq/img/ovo.png?v=5"
                width="78px"
                height="23px"
                alt="icon"
              />
            </VStack>

            <VStack
              divider={<StackDivider borderColor="veryLightPink" />}
              spacing="4"
              align="stretch"
              bgColor="white"
              borderRadius="md"
              padding="2"
              marginTop="6"
            >
              <Box>
                <Text fontWeight="bold">Informasi Pembayaran OVO</Text>
              </Box>
              <Box>
                <FormControl isInvalid={Boolean(phoneNumberError)}>
                  <FormLabel fontSize="sm">No Telepon</FormLabel>
                  <Input
                    border="1px solid"
                    borderRadius="base"
                    fontSize="sm"
                    background="white"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                    type="number"
                    placeholder="Silahkan masukan no telepon"
                  />
                  <FormErrorMessage fontSize="xxs" fontStyle="italic">
                    {phoneNumberError}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </VStack>

            <Stack align="center" mt="4">
              <Button
                leftIcon={
                  <Box mr={1}>
                    <Image
                      src={ASSETS.SECURE_ICON}
                      alt="secure"
                      w="25px"
                      h="25px"
                      align="center"
                    />
                  </Box>
                }
                onClick={onPurchase}
                isLoading={isLoadingPurchase}
                isDisabled={statePayment.isExpired || !!phoneNumberError}
                fontSize="md"
                height="40px"
                bgColor="squash.500"
                _hover={{ bgColor: "none" }}
              >
                Bayar Dengan Ovo
              </Button>
            </Stack>
          </Box>
        </GridBlockItem>
        <GridBlockItem>
          <SummaryOrder summaryDetail={props.summaryOrders} />
        </GridBlockItem>
      </GridBlock>

      <ModalConfirmationExit
        isMobile={false}
        isOpen={isOpen}
        onClose={onClose}
        onConfrim={onConfirm}
      />
    </>
  );
}
