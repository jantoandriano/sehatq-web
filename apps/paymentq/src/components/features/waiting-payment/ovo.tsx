import React from "react";
import { useGetHourMinSec } from "@components/hooks/useGetHourMinSec";
import { OvoPageMobile } from "./ovo-mobile";
import { OvoPageDesktop } from "./ovo-desktop";
import { DetailType } from "./waiting-payment-types";
import { trackingObjProps } from "./e-wallet";

export type OvoPageProps = {
  orderDetail: DetailType;
  isMobile?: boolean;
  onConfirmPayment: (param?: boolean) => void;
  onCheckOrder: () => void;
  expired?: boolean;
  onBack?: () => void;
  serverTime: string;
  status: string;
  trackingObj: trackingObjProps;
  onClickBack: () => void;
};

export function OvoPage(props: OvoPageProps) {
  const { orderDetail } = props;

  const time = useGetHourMinSec(props.serverTime, orderDetail.paymentTimeout);

  const newProps = {
    ...props,
    expired: time.expired,
  };

  if (props.isMobile) {
    return <OvoPageMobile {...newProps} />;
  }

  return <OvoPageDesktop {...newProps} />;
}
