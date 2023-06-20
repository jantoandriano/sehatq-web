import React, { useEffect, useState } from "react";
import { useToast } from "@sehatq/components";
import { useRouter } from "next/router";
import { useOrdersSummaryOvo } from "@components/hooks/charge/useOrdersSummaryOvo";
import {
  ENV,
  PAYMENT_STATUS,
  PAYMENT_DOMAIN,
  PAYMENT_PRODUCT_TYPES,
  NETCORE_EVENT_NAME,
} from "src/constants";
import { useContextCheckLimit } from "src/contexts/check-limit";
import { useContextSelectedPayment } from "src/contexts/selected-payment";
import { trackMobile } from "src/utils/payment";
import { calculateGrandTotal, sendNetCoreData } from "@utils";
import { pushDataLayerRenderCheckOutPayment } from "src/helpers/dataLayer";
import { useCreatePurchase } from "../payment/payment-queries";
import {
  modelNetCoreDataPurchase,
  PaymentCheckoutVerifyResponse,
} from "../payment/payment-model";
import { generateFeePurchaseObject } from "../payment/payment-helpers";
import { type PaymentCheckLimitType } from "../payment/payment-type";
import { OvoFormChargeMobile } from "./ovo-mobile";
import { OvoFormChargeDesktop } from "./ovo-desktop";
import { OvoFormChargeProps } from "./ovo-type";

export function ChargePageOvo(props: OvoFormChargeProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [statePayment, setStatePayment] = useState({
    isExpired: false,
    isConfrim: false,
  });
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const { token } = router.query as { token: string };

  const { mutate, isLoading: isLoadingPurchase } = useCreatePurchase();
  const checkLimitCtx = useContextCheckLimit();
  const selectedPaymentCtx = useContextSelectedPayment();
  const { ordersSumary } = useOrdersSummaryOvo({
    token,
    paymentOptions: selectedPaymentCtx?.selectedPayment,
  });
  const { trackingObj, failedAndCancelHandler } = props;

  useEffect(() => {
    setPhoneNumberError("");
  }, [phoneNumber]);

  useEffect(() => {
    setPhoneNumber(props.ovoLastPhoneNumber);
  }, [props.ovoLastPhoneNumber]);

  function onChangePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.target;
    setPhoneNumber(value);
  }

  function setNetCoreData() {
    const fee = generateFeePurchaseObject(
      props.verifyToken?.data as PaymentCheckoutVerifyResponse,
      selectedPaymentCtx?.selectedPayment,
      checkLimitCtx?.stateCheckLimit as PaymentCheckLimitType
    );

    sendNetCoreData(
      modelNetCoreDataPurchase(
        props.verifyToken?.data as PaymentCheckoutVerifyResponse,
        selectedPaymentCtx?.selectedPayment,
        calculateGrandTotal(fee)
      ),
      props.verifyToken?.data.data.orderLog.domain === PAYMENT_DOMAIN.TELEMED &&
        props.verifyToken?.data.data.orderLog.productType ===
          PAYMENT_PRODUCT_TYPES.DIGITAL
        ? NETCORE_EVENT_NAME.TELEMED_PAY
        : NETCORE_EVENT_NAME.PRODUCT_PURCHASE
    );
  }

  function onPurchase() {
    const errors = validateForm(phoneNumber);

    if (!errors) {
      const body = {
        coNumber: props.verifyToken?.data.data.coNumber as string,
        paymentMethod: generatePaymentMethod(),
        phoneNumber,
      };
      mutate(body, {
        onSuccess: (response) => {
          trackingObj.coNumber = response.data.detail[0].coNumber;

          /**
           * check status
           * success redirect to waiting-payment
           * fail or cancel redirect to client checkout (ENV.BACKURL)
           */
          if (response.data.status === PAYMENT_STATUS.UNPAID) {
            trackingObj.state = "waiting-for-payment";
            trackingObj.message = "will be redirect to waiting for payment";
            trackingObj.link = `${ENV.PAYMENTQ_DOMAIN}/v1/waiting-payment/${response.data.detail[0].coNumber}`;
            trackMobile(trackingObj);
            setNetCoreData();
            pushDataLayerRenderCheckOutPayment(
              props.verifyToken?.data as PaymentCheckoutVerifyResponse,
              3
            );
            router.replace(
              `/v1/waiting-payment/${response.data.detail[0].coNumber}`
            );
          }
          if (
            response.data.status === PAYMENT_STATUS.FAILED ||
            response.data.status === PAYMENT_STATUS.CANCELED
          ) {
            failedAndCancelHandler(
              props?.verifyToken?.data.data.orderLog.backURL || "",
              response.data.status
            );
          }
        },
        onError: (response) => {
          toast({
            message: response.message,
            status: "error",
          });
        },
      });
    } else {
      setPhoneNumberError(errors);
    }
  }

  function generatePaymentMethod() {
    if (selectedPaymentCtx?.selectedPayment?.length > 1) {
      return paymentMethodSplitBill();
    }
    return paymentMethodReguler();
  }

  function paymentMethodSplitBill() {
    return selectedPaymentCtx?.selectedPayment.map((option: any) => ({
      id: option.id || "",
      name: option.name || "",
      amount: getAmountSplitBill(option),
      adminFee: option.adminFee || 0,
    }));
  }

  function paymentMethodReguler() {
    return selectedPaymentCtx?.selectedPayment.map((option: any) => ({
      id: option.id || "",
      name: option.name || "",
      amount: getAmountPaymentReguler(),
      adminFee: option.adminFee || 0,
    }));
  }

  function onOpenOrderSummary() {
    setIsOpenModalOrder(!isOpenModalOrder);
  }

  function getAmountSplitBill(option: any) {
    return option.name.toLowerCase() === "digiqare" ||
      option.slugProvider === "MCSYS"
      ? (checkLimitCtx?.stateCheckLimit?.covered as number)
      : (checkLimitCtx?.stateCheckLimit?.excess as number);
  }

  function getAmountPaymentReguler() {
    if (props.verifyToken?.data.data.orderLog.grandTotal) {
      return Number(props.verifyToken?.data.data.orderLog.grandTotal);
    }
    return 0;
  }

  function onConfirmBackToPreviousPage() {
    router.replace(`/v1/payment?token=${token}#back`);
  }

  function onToggleModalBackPreviousPage() {
    history.pushState({}, "", "");
    props.setBackButtonBrowser((prev: any) => !prev);
  }

  const ovoFormChargeProps = {
    isOpenModalOrder,
    onOpenOrderSummary,
    phoneNumber,
    onPurchase,
    onChangePhoneNumber,
    summaryOrders: ordersSumary,
    isLoadingPurchase,
    statePayment,
    setStatePayment,
    phoneNumberError,
    isOpen: props.stateBackButtonBrowser,
    onClose: onToggleModalBackPreviousPage,
    onConfirm: onConfirmBackToPreviousPage,
  };

  function validateForm(params: string | undefined) {
    let errors = "";
    const regex = /^(0)8[1-9][0-9]{6,9}$/;

    if (!params) {
      errors = "No telepon wajib diisi";
    } else if (params.length <= 9) {
      errors = "No telepon kurang dari 9";
    } else if (params[0] !== "0") {
      errors = "Format no telepon salah. (contoh 08xxxxx)";
    } else if (!regex.test(params)) {
      errors = "No telepon tidak sesuai";
    }

    return errors;
  }

  if (props.isMobile) {
    return <OvoFormChargeMobile {...ovoFormChargeProps} />;
  }
  return <OvoFormChargeDesktop {...ovoFormChargeProps} />;
}
