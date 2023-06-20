import React, { useEffect } from "react";
import { useToast } from "@sehatq/components";
import { trackMobile } from "src/utils/payment";
import { EWalletDesktop } from "./e-wallet-desktop";
import { EWalletMobile } from "./e-wallet-mobile";
import { DetailType } from "./waiting-payment-types";

export type trackingObjProps = {
  eventType: string;
  state: string;
  status: string;
  message: string;
  coNumber: string;
  link: string;
};

export type EWalletProps = {
  orderDetail: DetailType;
  isMobile?: boolean;
  onConfirmPayment: (param?: boolean) => void;
  onCheckOrder: () => void;
  serverTime: string;
  status: string;
  trackingObj: trackingObjProps;
  onClickBack: () => void;
};

export function EWallet(props: EWalletProps) {
  const { orderDetail, isMobile, trackingObj } = props;
  const toast = useToast();

  /** effect to check isMobile, deepLinkUrl
   *
   * if  status unpaid redirect to deepLinkUrl
   */
  useEffect(() => {
    if (isMobile && orderDetail.deepLinkUrl && props.status === "unpaid") {
      if (sessionStorage.getItem("deepLinkFlag")) {
        return;
      }
      const showToast = (message: string) => {
        toast({
          message: message,
          status: "netral",
        });
      };

      trackingObj.state = "redirect-to-3rd-party";
      trackingObj.message = "will be redirect to 3rd party page";
      trackingObj.link = orderDetail.deepLinkUrl;
      trackMobile(trackingObj, showToast);

      window.location.href = orderDetail.deepLinkUrl;
      sessionStorage.setItem("deepLinkFlag", "1");
    }
  }, []);

  if (props.isMobile) {
    return <EWalletMobile {...props} />;
  }

  return <EWalletDesktop {...props} />;
}
