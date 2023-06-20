import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { calculateGrandTotal } from "@utils";
import { calcAdminFee } from "src/utils/payment";
import {
  PaymentMethodDesktop,
  PaymentMethodSkeletonDesktop,
} from "./payment-method-desktop";
import {
  PaymentMethodMobile,
  PaymentMethodSkeletonMobile,
} from "./payment-method-mobile";
import {
  useGetPaymentMethodList,
  PaymentMethodListCache,
  useGetPaymentCheckoutVerify,
} from "./payment-queries";
import { type StateSelectPaymentType } from "./payment";
import { ctxObjProps } from "./payment-context";
import { type PaymentCheckLimitType } from "./payment-type";

export type PaymentMethodProps = {
  isMobile: boolean;
  statePaymentSelect: StateSelectPaymentType[];
  paymentCheckLimit: PaymentCheckLimitType;
  setStatePaymentSelect: Dispatch<SetStateAction<StateSelectPaymentType[]>>;
  setContextObj: Dispatch<SetStateAction<ctxObjProps>>;
  isFetchingCheckoutVerify: boolean;
};
export type PaymentMethodSkeletonProps = { isMobile: boolean };
export type ItemPayments = {
  slug: string;
  name: string;
  options: {
    id: number;
    name: string;
    adminFee: number;
    imageUrl: string;
    disable: boolean;
    disabledReason: string;
  }[];
};

function selectPayment(paymentList: PaymentMethodListCache) {
  return paymentList.data.data.map((payment) => ({
    ...payment,
    options: payment.options.map((option) => ({
      id: option.id,
      name: option.name,
      adminFee: option.adminFee,
      imageUrl: option.imageUrl,
      disable: option.disable,
      disabledReason: option.disabledReason,
    })),
  }));
}

export const typePayment = "split-bill";

export function PaymentMethod(props: PaymentMethodProps) {
  const {
    isMobile,
    statePaymentSelect,
    paymentCheckLimit,
    setStatePaymentSelect,
    setContextObj,
    isFetchingCheckoutVerify,
  } = props;
  const router = useRouter();
  const { token } = router.query as { token: string };
  const [stateModal, setStateModal] = useState({
    isVisible: false,
    title: "",
  });

  const { data } = useGetPaymentCheckoutVerify({
    token,
  });

  /** calculate grand total
   * - use for show grandTotal at summary section
   */
  const grandTotal = calculateGrandTotal({
    totalDeliveryFee: data?.data.data.orderLog.totalDeliveryFee ?? 0,
    voucherValue: data?.data.data.orderLog.voucherValue ?? 0,
    totalShippingInsurance:
      data?.data.data.orderLog.totalShippingInsurance ?? 0,
    totalDonation: data?.data.data.orderLog.totalDonation ?? 0,
    voucherType: data?.data.data.orderLog.voucherType ?? "",
    totalProductInsurance: data?.data.data.orderLog.totalProductInsurance ?? 0,
    totalSellingAmount: data?.data.data.orderLog.totalSellingAmount ?? 0,
    adminFee: statePaymentSelect.map((item) => item.adminFee),
    coveredValue: paymentCheckLimit?.covered ?? 0,
  });
  /** ---------------------------- */

  /**
   * query for get payment method list
   * - use to show eligible payment method list
   */
  const query = {
    page: "",
    perPage: "",
    orderBy: "",
    sort: "",
    domain: data?.data.data.orderLog.domain ?? "",
    productType: data?.data.data.orderLog.productType ?? "",
    orderAmount: getOrderAmountQuery(),
    slug: "",
    coNumber: data?.data.data.coNumber ?? "",
    status: "active",
    excess: getExcessQuery(),
  };
  /** ---------------------------- */

  const {
    data: payments = [],
    isFetching,
    refetch,
  } = useGetPaymentMethodList(query, {
    select: selectPayment,
    onError: (data) => {
      if (data && Number(data.status) >= 400) {
        setStateModal({
          ...stateModal,
          isVisible: true,
          title: data.message,
        });
      }
    },
    onSuccess: () => {
      setStateModal({
        ...stateModal,
        isVisible: false,
        title: "",
      });
    },
  });

  useEffect(() => {
    if (payments.length > 0 && statePaymentSelect.length === 0) {
      payments.map((item: ItemPayments) => {
        if (item.slug === "free" && !item.options[0].disable) {
          setStatePaymentSelect([{ ...item.options[0], slug: item.slug }]);
        }
      });
    }
  }, [payments, statePaymentSelect, setStatePaymentSelect]);

  /**
   * Select payment method and set context for selected payment
   */
  function onSelected(value: StateSelectPaymentType) {
    if (!value.disable) {
      setStatePaymentSelect((prev) => {
        const temp: StateSelectPaymentType[] = prev.filter(
          (item) => item.slug === typePayment
        );
        temp.map((item) => {
          if (item.id !== value.id) {
            temp.push(value);
          }
        });
        return temp.length ? temp : [value];
      });
      setContextObj((prev) => ({ ...prev, isLoading: false }));
    }
  }
  /** ---------------------------- */

  function onConfirmModal() {
    return refetch();
  }

  /**
   * calculate order amount and check if it primary payment or not
   * - if primary payment return paymentCheckLimit.excessWithAdminFee
   * - if not return grandTotal - adminFee
   * - use at query useGetPaymentMethodList
   */
  function getOrderAmountQuery() {
    const adminFee = calcAdminFee(
      statePaymentSelect.map((val) => val.adminFee)
    );
    const isPrimaryPayment =
      paymentCheckLimit.excessWithAdminFee > 0 ? true : false;

    if (isPrimaryPayment) {
      return String(paymentCheckLimit.excessWithAdminFee);
    }
    return String(grandTotal - adminFee);
  }
  /** ---------------------------- */

  /**
   * helper function to check excess if is true or false
   * use at query useGetPaymentMethodList
   */
  function getExcessQuery() {
    if (paymentCheckLimit.name) {
      return paymentCheckLimit?.excessWithAdminFee > 0 ? "true" : "false";
    }
    return "";
  }
  /** ---------------------------- */

  if (isFetching || isFetchingCheckoutVerify) {
    return <PaymentMethodSkeleton isMobile={isMobile} />;
  }

  const newProps = {
    statePaymentSelect,
    onSelected,
    payments,
    stateModal,
    onConfirmModal,
  };

  if (isMobile) {
    return <PaymentMethodMobile {...newProps} />;
  }
  return <PaymentMethodDesktop {...newProps} />;
}

export function PaymentMethodSkeleton(props: PaymentMethodSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <PaymentMethodSkeletonMobile />;
  }
  return <PaymentMethodSkeletonDesktop />;
}
