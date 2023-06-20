import React from "react";
import {
  OrderDetailDesktop,
  OrderDetailDesktopSkeleton,
} from "./order-detail-desktop";
import {
  OrderDetailMobile,
  OrderDetailMobileSkeleton,
} from "./order-detail-mobile";

type OrderDetailType = {
  coNumber: string;
  paymentTimeout: string;
  paymentType: string;
  grandTotal: string;
  vaNumbers: string;
  currency: string;
};

type OrderDetailProps = {
  data: OrderDetailType;
  isLoading: boolean;
  error: string;
  isEWallet?: boolean;
  isMobile?: boolean;
};
export type OrderDetailSkeletonProps = {
  isMobile?: boolean;
};

export function OrderDetail(props: OrderDetailProps) {
  if (props.isMobile) {
    return <OrderDetailMobile {...props} />;
  }
  return <OrderDetailDesktop {...props} />;
}

export function OrderDetailSkeleton(props: OrderDetailSkeletonProps) {
  if (props.isMobile) {
    return <OrderDetailMobileSkeleton />;
  }
  return <OrderDetailDesktopSkeleton />;
}
