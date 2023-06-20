import React from "react";
import { CreditCardFormDesktop } from "./credit-card-form-desktop";
import { CreditCardFormMobile } from "./credit-card-form-mobile";
import { type CreditCardFormProps } from "./credit-card-types";

export function CreditCardForm(props: CreditCardFormProps) {
  if (props.isMobile) {
    return <CreditCardFormMobile {...props} />;
  }

  return <CreditCardFormDesktop {...props} />;
}
