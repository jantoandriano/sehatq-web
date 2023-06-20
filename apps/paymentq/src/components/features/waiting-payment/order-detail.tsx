import React, { useEffect } from "react";
import { useClipboard, useToast } from "@sehatq/components";
import { OrderDetailDesktop } from "./order-detail-desktop";
import { OrderDetailMobile } from "./order-detail-mobile";
import { DetailType } from "./waiting-payment-types";

type OrderDetailProps = {
  data: DetailType;
  isLoading: boolean | undefined;
  error: string | undefined;
  isEWallet?: boolean;
  isMobile?: boolean;
  serverTime: string;
};

export function OrderDetail(props: OrderDetailProps) {
  const { isMobile, data } = props;
  const { hasCopied, onCopy } = useClipboard(data.vaNumbers);
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        message: "Nomor virtual account berhasil di copy",
        status: "success",
      });
    }
  }, [toast, hasCopied, isMobile]);

  if (isMobile) {
    return <OrderDetailMobile {...props} onCopy={onCopy} />;
  }
  return <OrderDetailDesktop {...props} onCopy={onCopy} />;
}
