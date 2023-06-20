import React, { Dispatch, SetStateAction } from "react";
import { Box, GridBlock, GridBlockItem, VStack } from "@sehatq/components";
import {
  PaymentMethod,
  CashlessPayment,
  OrderDetail,
  CountdownTimer,
  ModalConfirmationExit,
  ModalInfo,
} from "@components";
import { PaymentCheckLimitBody } from "./payment-model";
import {
  type PaymentCheckLimitType,
  type ModalCheckLimitType,
} from "./payment-type";
import { type StateSelectPaymentType, type StatePaymentType } from "./payment";
import { generateModalInfo } from "./payment-helpers";
import { ctxObjProps } from "./payment-context";

export type PaymentProps = {
  statePayment: StatePaymentType;
  setStatePayment: Dispatch<SetStateAction<StatePaymentType>>;
  modalCheckLimit: ModalCheckLimitType;
  paymentCheckLimit: PaymentCheckLimitType;
  isOpenModalInfo: boolean;
  setIsOpenModalInfo: Dispatch<SetStateAction<boolean>>;
  statePaymentSelect: StateSelectPaymentType[];
  paymentCashlessData: StateSelectPaymentType;
  setStatePaymentSelect: Dispatch<SetStateAction<StateSelectPaymentType[]>>;
  fetchLimit: (
    value: StateSelectPaymentType,
    body: PaymentCheckLimitBody,
    updatePayment: (value: StateSelectPaymentType) => void
  ) => void;
  setContextObj: Dispatch<SetStateAction<ctxObjProps>>;
  isFetchingCheckoutVerify: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onArrowBack: () => void;
};

export function PaymentDesktop(props: PaymentProps) {
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
  } = props;

  return (
    <>
      <CountdownTimer isMobile={false} setStatePayment={setStatePayment} />
      <GridBlock my={6} isReverse>
        <GridBlockItem>
          <VStack w="full" spacing={4}>
            <CashlessPayment
              isMobile={false}
              statePaymentSelect={statePaymentSelect}
              setStatePaymentSelect={setStatePaymentSelect}
              fetchLimit={fetchLimit}
              isFetchingCheckoutVerify={isFetchingCheckoutVerify}
            />
            <PaymentMethod
              isMobile={false}
              statePaymentSelect={statePaymentSelect}
              paymentCheckLimit={paymentCheckLimit}
              setStatePaymentSelect={setStatePaymentSelect}
              setContextObj={setContextObj}
              isFetchingCheckoutVerify={isFetchingCheckoutVerify}
            />
          </VStack>
        </GridBlockItem>
        <GridBlockItem>
          <Box position="sticky" top={0}>
            <OrderDetail
              isMobile={false}
              statePaymentSelect={statePaymentSelect}
              statePayment={statePayment}
              paymentCheckLimit={paymentCheckLimit}
            />
          </Box>
        </GridBlockItem>
      </GridBlock>

      <ModalConfirmationExit
        isMobile={false}
        isOpen={isOpen}
        onClose={onClose}
        onConfrim={onConfirm}
      />

      <ModalInfo
        isMobile={false}
        isOpenModalInfo={isOpenModalInfo}
        modalData={generateModalInfo(modalCheckLimit)}
        onConfrim={() => setIsOpenModalInfo(false)}
      />
    </>
  );
}
