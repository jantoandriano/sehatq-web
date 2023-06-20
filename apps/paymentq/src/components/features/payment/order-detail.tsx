import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@sehatq/components";
import {
  ENV,
  NETCORE_EVENT_NAME,
  PAYMENT_PRODUCT_TYPES,
  PAYMENT_DOMAIN,
} from "@constants";
import { calculateGrandTotal, sendNetCoreData } from "@utils";
import { calcAdminFee, trackMobile } from "src/utils/payment";
import { pushDataLayerRenderCheckOutPayment } from "src/helpers/dataLayer";
import {
  OrderDetailDesktop,
  OrderDetailSkeletonDesktop,
} from "./order-detail-desktop";
import {
  OrderDetailMobile,
  OrderDetailSkeletonMobile,
} from "./order-detail-mobile";
import { ModalOrderDetail } from "./modal-order-detail";
import {
  useGetPaymentCheckoutVerify,
  PaymentCheckoutVerifyCache,
  useCreatePurchase,
} from "./payment-queries";
import { type PaymentCheckLimitType } from "./payment-type";
import {
  handleErrorMessage,
  amountPurchaseValue,
  generateFeePurchaseObject,
} from "./payment-helpers";
import { type StateSelectPaymentType, type StatePaymentType } from "./payment";
import PaymentContext from "./payment-context";
import {
  modelNetCoreDataPurchase,
  PaymentCheckoutVerifyResponse,
} from "./payment-model";

export type OrderDetailProps = {
  isMobile: boolean;
  statePayment: StatePaymentType;
  statePaymentSelect: StateSelectPaymentType[];
  paymentCheckLimit: PaymentCheckLimitType;
};
export type OrderDetailSkeletonProps = { isMobile: boolean };

function selectPaymentCheckout(paymentCheckout: PaymentCheckoutVerifyCache) {
  return paymentCheckout.data;
}

const typePayment = "split-bill";

export function OrderDetail(props: OrderDetailProps) {
  const { isMobile, statePayment, statePaymentSelect, paymentCheckLimit } =
    props;
  const router = useRouter();
  const { token } = router.query as { token: string };
  const toast = useToast();
  const ctx = useContext(PaymentContext);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);
  const { mutate, isLoading: isLoadingPurchase } = useCreatePurchase();
  const { data: orders, isLoading } = useGetPaymentCheckoutVerify(
    {
      token,
    },
    { select: selectPaymentCheckout }
  );

  const fee = generateFeePurchaseObject(
    orders as PaymentCheckoutVerifyResponse,
    statePaymentSelect,
    paymentCheckLimit
  );

  const setNetCoreData = () => {
    sendNetCoreData(
      modelNetCoreDataPurchase(
        orders as PaymentCheckoutVerifyResponse,
        statePaymentSelect,
        calculateGrandTotal(fee)
      ),
      orders?.data.orderLog.domain === PAYMENT_DOMAIN.TELEMED &&
        orders?.data.orderLog.productType === PAYMENT_PRODUCT_TYPES.DIGITAL
        ? NETCORE_EVENT_NAME.TELEMED_PAY
        : NETCORE_EVENT_NAME.PRODUCT_PURCHASE
    );
  };

  function onPurchase() {
    if (!statePayment.isExpired) {
      const body = {
        coNumber: orders?.data.coNumber ?? "",
        paymentMethod: statePaymentSelect.map((item) => ({
          id: item.id,
          name: item.name,
          adminFee: item.adminFee,
          amount: amountPurchaseValue(
            { slug: item.slug, adminFee: item.adminFee },
            calculateGrandTotal(fee),
            paymentCheckLimit,
            typePayment
          ),
        })),
      };

      const paymentId = statePaymentSelect.find(
        (payment) => payment.id === 8 || payment.id === 5
      );

      if (paymentId?.id === 8 || paymentId?.id === 5) {
        return router.replace({
          pathname: `/v1/charge`,
          query: { token },
          hash: "charge",
        });
      }

      mutate(body, {
        onSuccess: () => {
          const showToast = (message: string) => {
            toast({
              message: message,
              status: "success",
            });
          };
          const objData = {
            eventType: "purchase",
            state: "",
            status: "redirect",
            message: "",
            coNumber: orders?.data.coNumber as string,
            link: "",
          };
          if (
            statePaymentSelect.length === 1 &&
            (statePaymentSelect[0].slug === "free" ||
              statePaymentSelect[0].slug === typePayment)
          ) {
            objData.state = "success";
            objData.message = "will be redirect to thank you page";
            objData.link = `${orders?.data.orderLog.callbackURL}?coNumber=${orders?.data.coNumber}&status=success`;
            window.location.href = `${orders?.data.orderLog.callbackURL}?coNumber=${orders?.data.coNumber}&status=success`;
          } else {
            objData.state = "waiting-for-payment";
            objData.message = "will be redirect to waiting for payment";
            objData.link = `${ENV.PAYMENTQ_DOMAIN}/v1/waiting-payment/${orders?.data.coNumber}`;
            router.replace(`/v1/waiting-payment/${orders?.data.coNumber}`);
          }
          trackMobile(objData, showToast);
          setNetCoreData();
          pushDataLayerRenderCheckOutPayment(
            orders as PaymentCheckoutVerifyResponse,
            3
          );
        },
        onError: (response) => {
          toast(handleErrorMessage(response.message));
        },
      });
    } else {
      window.location.href = orders?.data.orderLog.backURL ?? ENV.HOME_URL;
    }
  }

  const ordersSumary = {
    ...fee,
    isCashless: !!statePaymentSelect.find((item) => item.slug === typePayment),
    grandTotal: calculateGrandTotal(fee),
  };

  const orderDetailProps = {
    ...fee,
    ...ordersSumary,
    adminFee: calcAdminFee(fee.adminFee),
    onPurchase,
    isLoadingPurchase,
    isDisableButonPurchase: !statePaymentSelect.length || ctx.isLoading,
    paymentCheckLimit: paymentCheckLimit,
    selllingAmountWording:
      orders?.data.orderLog.domain === PAYMENT_DOMAIN.TELEMED &&
      orders?.data.orderLog.productType === PAYMENT_PRODUCT_TYPES.DIGITAL
        ? "Biaya Konsultasi"
        : "Total Belanja",
    voucherCode: orders?.data.orderLog.voucherCode ?? "",
  };

  if (isLoading) {
    return <OrderDetailSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return (
      <Fragment>
        <OrderDetailMobile
          {...orderDetailProps}
          onConfrim={() => setIsOpenModalOrder(true)}
        />
        <ModalOrderDetail
          {...orderDetailProps}
          isOpenModalOrder={isOpenModalOrder}
          onConfrim={() => setIsOpenModalOrder(false)}
        />
      </Fragment>
    );
  }
  return <OrderDetailDesktop {...orderDetailProps} />;
}

export function OrderDetailSkeleton(props: OrderDetailSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <OrderDetailSkeletonMobile />;
  }
  return <OrderDetailSkeletonDesktop />;
}
