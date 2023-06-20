import React from "react";
import { GridBlock, GridBlockItem } from "@sehatq/components";
import { CountdownTimer, ModalConfirmationExit } from "../payment";
import { type CreditCardProps } from "./credit-card-types";
import { ModalCVVInfo } from "./modal-cvvinfo";
import { CreditCardForm } from "./credit-card-form";
import { SummaryOrder } from "./summary-order";

export function CreditCardDesktop(props: CreditCardProps) {
  const { data, form } = props;

  return (
    <>
      <CountdownTimer isMobile={false} setStatePayment={form.setStatePayment} />
      <GridBlock mt="5" isReverse>
        <GridBlockItem>
          <CreditCardForm isMobile={false} {...form} />
        </GridBlockItem>
        <GridBlockItem>
          <SummaryOrder isMobile={false} summaryDetail={data} />
        </GridBlockItem>
      </GridBlock>

      <ModalConfirmationExit
        isMobile={false}
        isOpen={form.isOpen}
        onClose={form.onClose}
        onConfrim={form.onConfirm}
      />

      <ModalCVVInfo
        isMobile={false}
        isOpen={form.openCVVInfo}
        onClose={form.onToogleCvvInfo}
      />
    </>
  );
}
