import React from "react";
import { Box, VStack } from "@sehatq/components";
import {
  PaymentMethod,
  CashlessPayment,
  OrderDetail,
  CountdownTimer,
  PaymentQHeader,
  ModalConfirmationExit,
  ModalInfo,
} from "@components";
import { generateModalInfo } from "./payment-helpers";
import { PaymentProps } from "./payment-desktop";

export function PaymentMobile(props: PaymentProps) {
  const {
    statePayment,
    setStatePayment,
    modalCheckLimit,
    paymentCheckLimit,
    isOpenModalInfo,
    setIsOpenModalInfo,
    statePaymentSelect,
    setStatePaymentSelect,
    fetchLimit,
    setContextObj,
    isFetchingCheckoutVerify,
    isOpen,
    onClose,
    onConfirm,
    onArrowBack,
  } = props;

  return (
    <Box>
      <PaymentQHeader variant="text" text="Pembayaran" onBack={onArrowBack} />
      <CountdownTimer isMobile setStatePayment={setStatePayment} />
      <VStack w="full" spacing={5} mt={5} px={5}>
        <CashlessPayment
          isMobile
          statePaymentSelect={statePaymentSelect}
          setStatePaymentSelect={setStatePaymentSelect}
          fetchLimit={fetchLimit}
          isFetchingCheckoutVerify={isFetchingCheckoutVerify}
        />
        <PaymentMethod
          isMobile
          statePaymentSelect={statePaymentSelect}
          paymentCheckLimit={paymentCheckLimit}
          setStatePaymentSelect={setStatePaymentSelect}
          setContextObj={setContextObj}
          isFetchingCheckoutVerify={isFetchingCheckoutVerify}
        />
        <Box mt={0} pb={24} w="full">
          <OrderDetail
            isMobile
            statePaymentSelect={statePaymentSelect}
            statePayment={statePayment}
            paymentCheckLimit={paymentCheckLimit}
          />
        </Box>
      </VStack>

      <ModalConfirmationExit
        isMobile
        isOpen={isOpen}
        onClose={onClose}
        onConfrim={onConfirm}
      />

      <ModalInfo
        isMobile
        isOpenModalInfo={isOpenModalInfo}
        modalData={generateModalInfo(modalCheckLimit)}
        onConfrim={() => setIsOpenModalInfo(false)}
      />
    </Box>
  );
}
