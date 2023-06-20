import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { calculateGrandTotal } from "@utils";
import {
  CashlessPaymentDesktop,
  CashlessPaymentSkeletonDesktop,
} from "./cashless-payment-desktop";
import {
  CashlessPaymentMobile,
  CashlessPaymentSkeletonMobile,
} from "./cashless-payment-mobile";
import {
  useGetPaymentMethodList,
  PaymentMethodListCache,
  useGetPaymentCheckoutVerify,
} from "./payment-queries";
import { PaymentCheckLimitBody } from "./payment-model";
import { type StateSelectPaymentType } from "./payment";

export type CashlessPaymentProps = {
  isMobile: boolean;
  statePaymentSelect: StateSelectPaymentType[];
  setStatePaymentSelect: Dispatch<SetStateAction<StateSelectPaymentType[]>>;
  fetchLimit: (
    value: StateSelectPaymentType,
    body: PaymentCheckLimitBody,
    updatePayment: (value: StateSelectPaymentType) => void
  ) => void;
  isFetchingCheckoutVerify: boolean;
};
export type CashlessPaymentSkeletonProps = { isMobile: boolean };
export type ItemCashless = {
  slug: string;
  name: string;
  options: {
    id: number;
    name: string;
    slugProvider: string;
    adminFee: number;
    imageUrl: string;
    disable: boolean;
    disabledReason: string;
    description: string;
  }[];
};

function selectPayment(paymentList: PaymentMethodListCache) {
  return paymentList.data.data.map((payment) => ({
    ...payment,
    options: payment.options.map((option) => ({
      id: option.id,
      name: option.name,
      slugProvider: option.slugProvider,
      adminFee: option.adminFee,
      imageUrl: option.imageUrl,
      disable: option.disable,
      disabledReason: option.disabledReason,
      description: option.description,
    })),
  }));
}

export function CashlessPayment(props: CashlessPaymentProps) {
  const {
    isMobile,
    statePaymentSelect,
    setStatePaymentSelect,
    fetchLimit,
    isFetchingCheckoutVerify,
  } = props;
  const router = useRouter();
  const { token } = router.query as { token: string };
  const { data } = useGetPaymentCheckoutVerify({
    token,
  });
  const grandTotal = calculateGrandTotal({
    totalDeliveryFee: data?.data.data.orderLog.totalDeliveryFee ?? 0,
    voucherValue: data?.data.data.orderLog.voucherValue ?? 0,
    totalShippingInsurance:
      data?.data.data.orderLog.totalShippingInsurance ?? 0,
    totalDonation: data?.data.data.orderLog.totalDonation ?? 0,
    voucherType: data?.data.data.orderLog.voucherType ?? "",
    totalProductInsurance: data?.data.data.orderLog.totalProductInsurance ?? 0,
    totalSellingAmount: data?.data.data.orderLog.totalSellingAmount ?? 0,
    adminFee: [],
  });
  const query = {
    page: "",
    perPage: "",
    orderBy: "",
    sort: "",
    domain: data?.data.data.orderLog.domain ?? "",
    productType: data?.data.data.orderLog.productType ?? "",
    orderAmount: grandTotal.toString(),
    coNumber: data?.data.data.coNumber ?? "",
    status: "active",
    slug: "split-bill",
  };
  const { data: payments = [], isFetching } = useGetPaymentMethodList(query, {
    select: selectPayment,
  });

  function updatePayment(value: StateSelectPaymentType) {
    setStatePaymentSelect((prev) => {
      const temp: StateSelectPaymentType[] = prev.filter(
        (item) => item.slug === "split-bill"
      );
      return temp[0]?.id === value.id ? [] : [value];
    });
  }

  function onSelected(value: StateSelectPaymentType) {
    if (!value.disable) {
      const body = {
        coNumber: data?.data.data.coNumber || "",
        planManagerCode: value.slugProvider || "",
        userServiceUserId: 1,
      };
      fetchLimit(value, body, updatePayment);
    }
  }

  if (isFetching || isFetchingCheckoutVerify) {
    return <CashlessPaymentSkeleton isMobile={isMobile} />;
  }
  if (payments.length === 0) {
    return null;
  }

  const newProps = {
    statePaymentSelect,
    onSelected,
    cashless: payments ?? [],
  };

  if (isMobile) {
    return <CashlessPaymentMobile {...newProps} />;
  }
  return <CashlessPaymentDesktop {...newProps} />;
}

export function CashlessPaymentSkeleton(props: CashlessPaymentSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <CashlessPaymentSkeletonMobile />;
  }
  return <CashlessPaymentSkeletonDesktop />;
}
