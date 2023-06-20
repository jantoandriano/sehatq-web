import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { parseToDate } from "@sehatq/utils";
import { ENV } from "@constants";
import { trackMobile } from "src/utils/payment";
import {
  useGetPaymentCheckoutVerify,
  PaymentCheckoutVerifyCache,
} from "./payment-queries";
import { CountdownTimerDesktop } from "./countdown-timer-desktop";
import { CountdownTimerMobile } from "./countdown-timer-mobile";
import { type StatePaymentType } from "./payment";

export type CountdownTimerProps = {
  isMobile: boolean;
  setStatePayment: Dispatch<SetStateAction<StatePaymentType>>;
};
export type SetTimerParam = { hours: number; minutes: number; seconds: number };
type StateType = {
  visible: boolean;
  title: string;
  status: "" | "expired" | "invalid-url";
};

function selectPaymentCheckout(paymentCheckout: PaymentCheckoutVerifyCache) {
  return paymentCheckout.data;
}

export function CountdownTimer(props: CountdownTimerProps) {
  const { isMobile, setStatePayment } = props;
  const router = useRouter();
  const { token } = router.query as { token: string };
  const [stateModal, setStateModal] = useState<StateType>({
    visible: false,
    title: "",
    status: "",
  });

  const { data } = useGetPaymentCheckoutVerify(
    {
      token,
    },
    {
      select: selectPaymentCheckout,
      onError: (data) => {
        if (data.status === 400) {
          setStateModal({
            visible: true,
            status: "invalid-url",
            title: "The payment link is no longer valid",
          });
        } else if (data.status === 406) {
          setStateModal({
            visible: true,
            status: "expired",
            title: "The payment link has expired",
          });
        }
      },
    }
  );
  const [currentCount, setCurrentCount] = useState(0);

  function setTimer({ hours, minutes, seconds }: SetTimerParam) {
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const server = parseToDate(
      data?.data.serverTime ?? "",
      "yyyy-MM-dd HH:mm:ss"
    ).getTime();
    const expired = parseToDate(
      data?.data.orderLog.paymentCheckoutExpired ?? "",
      "yyyy-MM-dd HH:mm:ss"
    ).getTime();
    const startCount = expired - server;
    setCurrentCount(startCount > 0 ? +startCount : 0);
  }, [data?.data.orderLog.paymentCheckoutExpired, data?.data.serverTime]);

  useEffect(() => {
    const timerInterval = setInterval(function () {
      if (currentCount > 0) {
        setCurrentCount(currentCount - 1000);
      } else {
        if (data?.data.orderLog.paymentCheckoutExpired) {
          setStateModal({
            visible: true,
            status: "expired",
            title: `The payment link has expired`,
          });
        }
        setCurrentCount(0);
        setStatePayment((prev) => ({ ...prev, isExpired: true }));
        clearTimeout(timerInterval);
      }
    }, 1000);

    return () => {
      clearTimeout(timerInterval);
    };
  }, [
    currentCount,
    data?.data.orderLog.paymentCheckoutExpired,
    setStatePayment,
  ]);

  function onToogleModal() {
    const objData = {
      eventType: "on-load-checkout-payment",
      state: stateModal.status,
      status: "redirect",
      message: "will be redirect to SehatQ Home Page",
      coNumber: "",
      link: ENV.HOME_URL,
    };
    trackMobile(objData);
    setStateModal((prev) => ({ ...prev, visible: !prev.visible }));
    window.location.href = ENV.HOME_URL;
  }

  const newProps = {
    ...setTimer({
      hours: Math.floor(
        (currentCount % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((currentCount % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((currentCount % (1000 * 60)) / 1000),
    }),
    stateModal,
    onToogleModal,
  };

  if (isMobile) return <CountdownTimerMobile {...newProps} />;
  return <CountdownTimerDesktop {...newProps} />;
}
