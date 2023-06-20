import React from "react";
import { useToast } from "@sehatq/components";
import { trackMobile } from "src/utils/payment";
import { PaymentGuidanceMobile } from "./payment-guidance-mobile";
import { PaymentGuidanceDesktop } from "./payment-guidance-desktop";
import { useGetPaymentGuidance } from "./payment-guidance-queries";
import { DetailType } from "./waiting-payment-types";
import { type trackingObjProps } from "./e-wallet";

export type PaymentGuidanceProps = {
  isEWallet?: boolean;
  isMobile?: boolean;
  orderDetail: DetailType;
  trackingObj: trackingObjProps;
};

type PaymentGuidanceData = {
  id: string;
  title: string;
  description: string;
};

export type PaymentGuidanceDesktopSkeletonProps = {
  isMobile?: boolean;
};

export function PaymentGuidance(props: PaymentGuidanceProps) {
  const {
    dataPaymentGuidance,
    isLoadingPaymentGuidance,
    errorPaymentGuidance,
  } = useGetPaymentGuidance({
    page: "1",
    perPage: "20",
    status: "active",
    paymentMethodId: String(props.orderDetail.paymentMethodId) || "",
  });
  const toast = useToast();

  const onClickPay = (deepLinkUrl: string) => {
    const showToast = (message: string) => {
      toast({
        message: message,
        status: "netral",
      });
    };

    props.trackingObj.state = "redirect-to-3rd-party";
    props.trackingObj.message = "will be redirect to 3rd party page";
    props.trackingObj.link = deepLinkUrl;
    trackMobile(props.trackingObj, showToast);

    window.location.href = deepLinkUrl;
  };

  const newProps = {
    data: dataPaymentGuidance as PaymentGuidanceData[],
    isLoading: isLoadingPaymentGuidance as boolean,
    error: errorPaymentGuidance as string | null,
    qrCodeUrl: props.orderDetail?.qrCodeUrl as string,
    paymentName: props.orderDetail.paymentType as string,
    deepLinkUrl: props.orderDetail?.deepLinkUrl as string,
    paymentMethodId: String(props.orderDetail.paymentMethodId),
    onClickPay,
    ...props,
  };

  if (props.isMobile) {
    return <PaymentGuidanceMobile {...newProps} />;
  }

  return <PaymentGuidanceDesktop {...newProps} />;
}
