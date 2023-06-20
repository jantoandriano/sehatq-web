import React from "react";
import {
  Text,
  useImage,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Container,
  VStack,
  Button,
  Image as ChakraImage,
  ChevronDownIcon,
  Flex,
} from "@sehatq/components";
import { ASSETS } from "@sehatq/constants";
import { generatePriceDisplay } from "@sehatq/utils";
import { CountdownTimer, ModalConfirmationExit } from "../payment";
import { SummaryOrder } from "./summary-order";
import DrawerSummaryDetail from "./drawer-summary-detail";
import { OvoFormChargeMobileProps } from "./ovo-type";

export function OvoFormChargeMobile(props: OvoFormChargeMobileProps) {
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

  const Image = useImage();

  return (
    <>
      <CountdownTimer isMobile setStatePayment={setStatePayment} />
      <Container paddingTop="4" boxShadow="base" bgColor="white" height="100vh">
        <VStack spacing="4">
          <Text>Anda melakukan pembayaran melalui</Text>
          <Image
            src="https://static.sehatq.com/tokoq/img/ovo.png?v=5"
            width={78}
            height={24}
            alt="icon"
          />
        </VStack>

        <FormControl marginTop="4" isInvalid={Boolean(phoneNumberError)}>
          <FormLabel fontSize="sm">No Telepon</FormLabel>
          <Input
            border="1px solid"
            borderRadius="base"
            fontSize="sm"
            background="white"
            placeholder="Silahkan masukan no telepon"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
            type="number"
          />
          <FormErrorMessage fontSize="xxs" fontStyle="italic">
            {phoneNumberError}
          </FormErrorMessage>
        </FormControl>

        <SummaryOrder summaryDetail={props.summaryOrders} isMobile />

        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bgColor="white"
          borderTopRadius="lg"
          boxShadow="md"
          p={5}
        >
          <Flex alignItems="center">
            <Box flexGrow={1}>
              <Text color="brownGrey.500" fontSize="sm">
                Total Tagihan
              </Text>
              <Text fontWeight="bold" color="sea.500">
                {generatePriceDisplay(Number(props.summaryOrders.grandTotal))}
                <Box as="span">
                  <ChevronDownIcon
                    color="#A7A7A7"
                    w={6}
                    h={8}
                    onClick={props.onOpenOrderSummary}
                  />
                </Box>
              </Text>
            </Box>
            <Button
              isLoading={isLoadingPurchase}
              onClick={onPurchase}
              flexGrow={1}
              bgColor="squash.500"
              _hover={{ bgColor: "none" }}
              isDisabled={statePayment.isExpired || !!phoneNumberError}
            >
              <Box mr={1}>
                <ChakraImage
                  src={ASSETS.SECURE_ICON}
                  alt="secure"
                  w="25px"
                  h="25px"
                  align="center"
                />
              </Box>
              Bayar
            </Button>
          </Flex>
        </Box>
      </Container>

      <DrawerSummaryDetail
        isMobile={false}
        summaryDetail={props.summaryOrders}
        isOpenModal={props.isOpenModalOrder}
        onOpenModal={props.onOpenOrderSummary}
      />

      <ModalConfirmationExit
        isMobile
        isOpen={isOpen}
        onClose={onClose}
        onConfrim={onConfirm}
      />
    </>
  );
}
