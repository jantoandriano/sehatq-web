import React from "react";
import {
  PaymentGuidanceMobile,
  PaymentGuidanceMobileSkeleton,
} from "./payment-guidance-mobile";
import {
  PaymentGuidanceDesktop,
  PaymentGuidanceDesktopSkeleton,
} from "./payment-guidance-desktop";

type PaymentGuidanceData = {
  id: string;
  title: string;
  description: string;
};

export type PaymentGuidanceProps = {
  isLoading: boolean;
  error: string;
  data: PaymentGuidanceData[];
  isEWallet?: boolean;
  isMobile?: boolean;
};

export type PaymentGuidanceDesktopSkeletonProps = {
  isMobile?: boolean;
};

export function PaymentGuidance(props: PaymentGuidanceProps) {
  if (props.isMobile) {
    return <PaymentGuidanceMobile {...props} />;
  }

  return <PaymentGuidanceDesktop {...props} />;
}

export function PaymentGuidanceSkeleton(
  props: PaymentGuidanceDesktopSkeletonProps
) {
  if (props.isMobile) {
    return <PaymentGuidanceMobileSkeleton />;
  }

  return <PaymentGuidanceDesktopSkeleton />;
}
