import React, { useState } from "react";
import { CreditCardMobile } from "./credit-card-mobile";
import { CreditCardDesktop } from "./credit-card-desktop";

export type CreditCardPageProps = {
  isMobile: boolean;
};

export function CreditCardPage(props: CreditCardPageProps) {
  const [showCVV, seShowCVV] = useState<boolean>(false);
  const [expiredCard, setExpiredCard] = useState<string>("");

  function onShowCVV() {
    seShowCVV(!showCVV);
  }

  function onExpiredDate(value: string) {
    setExpiredCard(value);
  }

  function onSubmitCrediCard() {
    console.log("expiredCard", expiredCard);
  }

  function onChange(value: string) {
    console.log(value);
  }

  const newProps = {
    showCVV,
    onShowCVV,
    onExpiredDate,
    onSubmitCrediCard,
    onChange,
  };

  if (props.isMobile) {
    return <CreditCardMobile {...newProps} />;
  }

  return <CreditCardDesktop {...newProps} />;
}
