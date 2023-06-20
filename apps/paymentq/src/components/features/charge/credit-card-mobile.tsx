import React from "react";
import {
  ArrowBackIcon,
  QuestionOutlineIcon,
  Text,
  Box,
  Spacer,
  Flex,
  Link,
  ChevronDownIcon,
  Button,
  Image,
} from "@sehatq/components";
import { generatePriceDisplay } from "@sehatq/utils";
import { ASSETS } from "@sehatq/constants";
import { CountdownTimer, ModalConfirmationExit } from "../payment";
import { type CreditCardProps } from "./credit-card-types";
import { ModalCVVInfo } from "./modal-cvvinfo";
import { CreditCardForm } from "./credit-card-form";
import { SummaryOrder } from "./summary-order";
import DrawerSummaryDetail from "./drawer-summary-detail";
import TermsConditions from "./terms-conditions";

export function CreditCardMobile(props: CreditCardProps) {
  const { data, form } = props;

  return (
    <>
      <Box mt="4" mx="4" mb="2">
        <Flex flexDir="row" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <ArrowBackIcon onClick={form.onArrowBack} color="main.500" />
            <Text ml="3" fontSize="md" fontWeight="600">
              Pembayaran
            </Text>
          </Box>
          <Spacer />
          <Link href="https://toko.sehatq.com/help">
            <QuestionOutlineIcon color="main.500" />
          </Link>
        </Flex>
      </Box>

      <CountdownTimer isMobile setStatePayment={form.setStatePayment} />

      <Box margin="4">
        <CreditCardForm isMobile {...form} />
        <TermsConditions isMobile />
        <SummaryOrder isMobile summaryDetail={data} />
        <Box height={100} />
      </Box>

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
              {generatePriceDisplay(Number(props.data.grandTotal))}
              <Box as="span">
                <ChevronDownIcon
                  color="#A7A7A7"
                  w={6}
                  h={8}
                  onClick={props.onOpenModal}
                />
              </Box>
            </Text>
          </Box>
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
            fontSize="sm"
            isLoading={form.isLoading3ds}
            onClick={form.onSubmit}
            bgColor="squash.500"
            _hover={{ bgColor: "none" }}
          >
            Bayar
          </Button>
        </Flex>
      </Box>

      <DrawerSummaryDetail
        isMobile
        summaryDetail={data}
        isOpenModal={props.isOpenModal}
        onOpenModal={props.onOpenModal}
      />

      <ModalConfirmationExit
        isMobile
        isOpen={form.isOpen}
        onClose={form.onClose}
        onConfrim={form.onConfirm}
      />

      <ModalCVVInfo
        isMobile
        isOpen={form.openCVVInfo}
        onClose={form.onToogleCvvInfo}
      />
    </>
  );
}
