import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Spinner } from "@sehatq/components";
import { useContextCheckLimit } from "src/contexts/check-limit";
import { useContextSelectedPayment } from "src/contexts/selected-payment";
import { ENV, PAYMENT_STATUS } from "src/constants";
import { trackMobile } from "src/utils/payment";
import { useGetPaymentCheckoutVerify } from "../payment";
import {
  GetLastTransactionCache,
  useGetLastTransaction,
  PaymentCheckoutVerifyCache,
} from "../payment/payment-queries";
import { ChargePageCreditCard } from "./credit-card";
import { ChargePageOvo } from "./ovo";

type ChargePageContainerProps = {
  isMobile: boolean;
};

function selectLastTransaction(data: GetLastTransactionCache) {
  return {
    accountNumber: data.data.data.accountNumber,
  };
}

export function ChargePageContainer(props: ChargePageContainerProps) {
  const router = useRouter();
  const { token } = router.query as { token: string };
  const checkLimitCtx = useContextCheckLimit();
  const selectedPaymentCtx = useContextSelectedPayment();
  const paymentId = getPaymentId();
  const [stateBackButtonBrowser, setBackButtonBrowser] = useState(false);

  const trackingObj = {
    eventType: "purchase",
    state: "",
    status: "redirect",
    message: "",
    coNumber: "",
    link: "",
  };

  const { data: verifyToken }: any = useGetPaymentCheckoutVerify(
    { token },
    {
      onSuccess,
    }
  );

  const { data: ovoLastPhoneNumber } = useGetLastTransaction(
    {
      uuid: verifyToken?.data.data.orderLog.user.uuid as string,
      paymentMethodId: paymentId,
    },
    {
      select: selectLastTransaction,
      enabled: !!verifyToken?.data.data.orderLog.user.uuid,
    }
  );

  useEffect(() => {
    if (window) {
      if (
        window.performance.getEntriesByType("navigation")[0].type ===
          "navigate" &&
        window?.location?.hash === "#charge"
      ) {
        history.pushState({}, "", "");
      }

      window.onpopstate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBackButtonBrowser((prev) => !prev);
      };
    }
  }, []);

  useEffect(() => {
    if (paymentId === 0 && checkLimitCtx?.stateCheckLimit.name === "") {
      trackingObj.state = "didn’t-choose-payment-method";
      trackingObj.message = "will be redirect to payment page";
      trackingObj.link = `${ENV.PAYMENTQ_DOMAIN}/v1/payment?token=${token}`;
      trackMobile(trackingObj);
      window.history.back();
      router.replace(`/v1/payment?token=${token}`);
    }
  }, [selectedPaymentCtx]);

  function getPaymentId() {
    return selectedPaymentCtx?.selectedPayment.length > 1
      ? selectedPaymentCtx?.selectedPayment[1].id
      : selectedPaymentCtx?.selectedPayment[0].id;
  }

  const failedAndCancelHandler = (
    backURL: string,
    status: string,
    coNumber?: string
  ) => {
    const callbackURL = backURL || ENV.HOME_URL;
    trackingObj.state =
      status === PAYMENT_STATUS.CANCELED ? "cancel" : "failed";
    trackingObj.message = backURL
      ? "will be redirect to back url"
      : "will be redirect to home url";
    trackingObj.link = callbackURL;
    trackingObj.coNumber = coNumber || "";
    trackMobile(trackingObj);
    window.location.href = callbackURL;
  };

  function onSuccess(res: PaymentCheckoutVerifyCache) {
    const {
      data: { data },
    } = res;

    trackingObj.coNumber = data.coNumber;

    if (
      data.selectPayment &&
      (data.status === PAYMENT_STATUS.FAILED ||
        data.status === PAYMENT_STATUS.CANCELED)
    ) {
      failedAndCancelHandler(data.orderLog.backURL, data.status);
    }

    if (data.selectPayment && data.status === PAYMENT_STATUS.PAID) {
      trackingObj.state = "success";
      trackingObj.message = "will be redirect to thank you page";
      trackingObj.link = `${data.orderLog.callbackURL}?coNumber=${data.coNumber}&status=success`;
      trackMobile(trackingObj);
      window.location.href = `${data.orderLog.callbackURL}?coNumber=${data.coNumber}&status=success`;
    }
  }

  function onCloseModalBackBrowser() {
    history.pushState({}, "", "");
    setBackButtonBrowser((prev) => !prev);
  }

  const crediCardProps = {
    onCloseModalBackBrowser,
    stateBackButtonBrowser,
    verifyToken,
    isMobile: props.isMobile,
    trackingObj,
    failedAndCancelHandler,
    setBackButtonBrowser,
  };

  const ovoFormProps = {
    onCloseModalBackBrowser,
    stateBackButtonBrowser,
    isMobile: props.isMobile,
    verifyToken,
    ovoLastPhoneNumber: ovoLastPhoneNumber?.accountNumber || "",
    trackingObj,
    failedAndCancelHandler,
    setBackButtonBrowser,
  };

  const isLoadingPage =
    paymentId === 0 && checkLimitCtx?.stateCheckLimit.name === "";

  const isCreditCard = Number(paymentId) === 5;
  const isOvo = Number(paymentId) === 8;

  if (isLoadingPage) {
    return (
      <Box mt="10" display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  if (props.isMobile) {
    return (
      <>
        {isCreditCard ? <ChargePageCreditCard {...crediCardProps} /> : null}
        {isOvo ? <ChargePageOvo {...ovoFormProps} /> : null}
      </>
    );
  }
  return (
    <>
      {isCreditCard ? <ChargePageCreditCard {...crediCardProps} /> : null}
      {isOvo ? <ChargePageOvo {...ovoFormProps} /> : null}
    </>
  );
}
