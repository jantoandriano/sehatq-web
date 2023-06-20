import React, { useState, useEffect, useReducer } from "react";
import { useToast } from "@sehatq/components";
import { useRouter } from "next/router";
import { useOrderSummaryCC } from "@components/hooks/charge/useOrdersSummaryCC";
import { useGetQueryInstallments } from "@components/hooks/charge/useGetQueryInstallments";
import {
  ENV,
  PAYMENT_DOMAIN,
  PAYMENT_PRODUCT_TYPES,
  NETCORE_EVENT_NAME,
} from "src/constants";
import { useContextCheckLimit } from "src/contexts/check-limit";
import { useContextSelectedPayment } from "src/contexts/selected-payment";
import { trackMobile } from "src/utils/payment";
import { calculateGrandTotal, sendNetCoreData } from "@utils";
import { pushDataLayerRenderCheckOutPayment } from "src/helpers/dataLayer";
import {
  CreatePurchaseBody,
  useCreatePurchase,
} from "../payment/payment-queries";
import {
  modelNetCoreDataPurchase,
  PaymentCheckoutVerifyResponse,
} from "../payment/payment-model";
import { PaymentCheckLimitType } from "../payment/payment-type";
import { generateFeePurchaseObject } from "../payment/payment-helpers";
import { CreditCardMobile } from "./credit-card-mobile";
import { CreditCardDesktop } from "./credit-card-desktop";
import {
  IFieldUnion,
  validateForm,
  CHANGE_FIELD,
  CHANGE_ERROR,
  creditCardReducer,
  initialState,
} from "./credit-card-reducer";
import { type CreditCardPageProps } from "./credit-card-types";
import { generateCardData, generateCCBody } from "./credit-card-helper";
import { useCancelPurchase } from "./charge-queries";
import { InstallmentsCache, useGetInstallments } from "./installments-queries";

function selectInstallments(data: InstallmentsCache) {
  return data.data.data.map((item) => ({
    options: item.options.map((option) => ({
      id: option.InstallmentId,
      name: item.bankName,
      adminFee: option.adminFee,
      period: option.installmentPeriod,
      unit: option.installmentPeriodUnit,
      amount: option.installmentAmount,
    })),
  }));
}

export function ChargePageCreditCard(props: CreditCardPageProps) {
  const [showCVV, seShowCVV] = useState<boolean>(false);
  const [iframeUrl, setIFrameUrl] = useState("");
  const [openCVVInfo, setOpenCVVInfo] = useState(false);
  const [statePayment, setStatePayment] = useState({
    isExpired: false,
    isConfrim: false,
  });
  const [stateForm, dispatchForm] = useReducer(creditCardReducer, initialState);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { token } = router.query as { token: string };
  const { trackingObj, failedAndCancelHandler } = props;

  /** custom hooks */
  const { mutate, isLoading: isLoading3ds } = useCreatePurchase();
  const { mutate: mutateCancelPurchase } = useCancelPurchase();

  const checkLimitCtx = useContextCheckLimit();
  const selectedPaymentCtx = useContextSelectedPayment();

  const { generateQueryInstallments } = useGetQueryInstallments({
    token,
    stateForm: stateForm,
  });
  const { data: installmentsOptions } = useGetInstallments(
    generateQueryInstallments(),
    {
      enabled: stateForm.values.cardNumber.length >= 6,
      select: selectInstallments,
      keepPreviousData: stateForm.values.cardNumber.length >= 6,
    }
  );
  const { ordersSummaryCC } = useOrderSummaryCC({
    token,
    stateForm: stateForm,
  });
  /** -------------- */

  const paymentId =
    selectedPaymentCtx && selectedPaymentCtx.selectedPayment.length > 1
      ? selectedPaymentCtx?.selectedPayment[1].id
      : selectedPaymentCtx?.selectedPayment[0].id;

  const CANCEL_BY_SYSTEM = "cancel by system";

  useEffect(() => {
    if (statePayment.isExpired) {
      toast({
        message: "Payment timeout",
        status: "error",
        position: "top",
      });
    }
  }, [statePayment.isExpired]);

  useEffect(() => {
    if (
      installmentsOptions &&
      installmentsOptions[0].options.length &&
      stateForm.values.cardNumber.length < 16
    ) {
      dispatchForm({
        name: "purchase",
        value: `${ENV.DEFAULT_INSTALLMENT}`,
        type: CHANGE_FIELD,
        isEnableValidate:
          installmentsOptions && installmentsOptions[0].options.length > 0,
      });
    }
  }, [installmentsOptions, stateForm.values.cardNumber]);

  function onShowCVV() {
    seShowCVV(!showCVV);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm(
      stateForm.values,
      installmentsOptions && installmentsOptions[0].options
    );

    const hasError = Object.values(errors).some((value) => Boolean(value));

    if (!hasError) {
      const cardData = generateCardData(stateForm.values);
      getCardToken(cardData, get3dsUrl);
    } else {
      dispatchForm({
        type: CHANGE_ERROR,
        value: errors,
      });
    }
  }

  function onChangeExpiredDate(params: string) {
    dispatchForm({
      name: "cardExp",
      value: params,
      type: CHANGE_FIELD,
      isEnableValidate: true,
    });
  }

  function onChangeChoosePurchase(params: string) {
    dispatchForm({
      name: "purchase",
      value: params,
      type: CHANGE_FIELD,
      isEnableValidate:
        installmentsOptions && installmentsOptions[0].options.length > 0,
    });
  }

  function onChange(field: IFieldUnion) {
    dispatchForm({
      ...field,
      type: CHANGE_FIELD,
      isEnableValidate: true,
    });
  }

  function getCardToken(
    cardData: {
      card_number: number;
      card_exp_month: number;
      card_exp_year: number;
      card_cvv: number;
    },
    postPurchase: (params: string) => void
  ) {
    if (cardData && typeof window.MidtransNew3ds === "object") {
      // trigger `getCardToken` function
      return window.MidtransNew3ds.getCardToken(cardData, {
        onSuccess: (res: { token_id: string }) => {
          // Success to get card token_id, implement as you wish here
          // Implement sending the token_id to backend to proceed to next step
          postPurchase(res?.token_id);
        },
        onFailure: (err: {
          validation_messages: string[];
          status_message: string;
        }) => {
          // Fail to get card token_id, implement as you wish here
          toast({
            message: err?.validation_messages
              ? err.validation_messages.join()
              : err.status_message,
            status: "error",
            position: "top",
          });
        },
      });
    }
  }

  function setNetCoreData() {
    const fee = generateFeePurchaseObject(
      props.verifyToken?.data as PaymentCheckoutVerifyResponse,
      selectedPaymentCtx?.selectedPayment,
      checkLimitCtx?.stateCheckLimit as PaymentCheckLimitType,
      ordersSummaryCC?.adminFee
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

  function get3dsUrl(tokenId: string) {
    const paymentMethod = generatePaymentMethodBody();
    const ccBody = generateCCBody(
      installmentsOptions && installmentsOptions[0].options,
      stateForm
    );

    const body: CreatePurchaseBody = {
      coNumber: props.verifyToken?.data.data.coNumber as string,
      paymentMethod,
      cc: {
        token: tokenId,
        installmentPeriod: ccBody?.period,
        installmentId: ccBody?.id,
      },
    };

    mutate(body, {
      onSuccess: (data) => {
        if (
          data.data.status === "unpaid" &&
          data.data.detail.length > 1 &&
          data.data.detail[1].redirectUrl
        ) {
          get3dsAuth(data?.data?.detail[1].redirectUrl as string);
          pushDataLayerRenderCheckOutPayment(
            props.verifyToken?.data as PaymentCheckoutVerifyResponse,
            3
          );
          setNetCoreData();
        }
        if (
          data.data.status === "unpaid" &&
          data.data.detail.length <= 1 &&
          data.data.detail[0].redirectUrl
        ) {
          get3dsAuth(data?.data?.detail[0].redirectUrl as string);
          pushDataLayerRenderCheckOutPayment(
            props.verifyToken?.data as PaymentCheckoutVerifyResponse,
            3
          );
          setNetCoreData();
        }

        if (data.data.status === "failed" || data.data.status === "cancel") {
          failedAndCancelHandler(
            props?.verifyToken?.data.data.orderLog.backURL || "",
            data.data.status,
            props.verifyToken?.data.data.coNumber
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
  }

  function get3dsAuth(redirectUrl: string) {
    if (redirectUrl && typeof window.MidtransNew3ds === "object") {
      window.MidtransNew3ds.authenticate(redirectUrl, {
        performAuthentication: (url: string) => {
          const pathname = `/v1/threeds/${props.verifyToken?.data.data.coNumber}`;
          router.replace(
            {
              pathname,
              query: {
                url: url,
                coNumber: props.verifyToken?.data.data.coNumber,
              },
            },
            pathname
          );
        },
        onSuccess: () => {
          router.replace(
            {
              pathname: "/v1/callback-payment",
              query: {
                paymentId,
                coNumber: props.verifyToken?.data.data.coNumber || "",
                callbackUrl:
                  props?.verifyToken?.data.data.orderLog.callbackURL || "",
              },
            },
            `/v1/callback-payment?coNumber=${props.verifyToken?.data.data.coNumber}&callbackUrl=${props?.verifyToken?.data.data.orderLog.callbackURL}`
          );
        },
        onFailure: () => {
          onCancelPurchase();
        },
        onPending: () => {
          onCancelPurchase();
        },
      });
    }
  }

  function onCancelPurchase() {
    mutateCancelPurchase(
      {
        coNumber: props.verifyToken?.data.data.coNumber as string,
        reason: CANCEL_BY_SYSTEM,
      },
      {
        onSuccess: () => {
          setIFrameUrl("");
          const callbackURL =
            props?.verifyToken?.data.data.orderLog.backURL || ENV.HOME_URL;
          trackingObj.state = "cancel";
          trackingObj.message = "will be redirect to home page";
          trackingObj.link = callbackURL;
          trackMobile(trackingObj);
          router.replace(callbackURL);
        },
      }
    );
  }

  function onToogleCvvInfo() {
    setOpenCVVInfo(!openCVVInfo);
  }

  function generatePaymentMethodBody() {
    if (
      selectedPaymentCtx?.selectedPayment &&
      selectedPaymentCtx.selectedPayment?.length > 1
    ) {
      return generatePaymentMethodSplitBill();
    }
    return generatePaymentMethodReguler();
  }

  function generatePaymentMethodReguler() {
    return (
      installmentsOptions &&
      installmentsOptions[0].options
        .filter((val) => val.id === Number(stateForm.values.purchase))
        .map((option: any) => ({
          id: Number(paymentId),
          name: option.name as string,
          amount: Number(
            props.verifyToken?.data.data.orderLog?.grandTotal
          ) as number,
          adminFee: option.adminFee as number,
        }))
    );
  }

  function generatePaymentMethodSplitBill() {
    const amountNotDigicare =
      installmentsOptions &&
      installmentsOptions[0].options.find(
        (val) => val.id === Number(stateForm.values.purchase)
      );
    return (
      selectedPaymentCtx?.selectedPayment &&
      selectedPaymentCtx.selectedPayment.map((val: any) => {
        return {
          id: Number(val.id),
          name: String(val.name),
          amount:
            val.name.toLowerCase() === "digiqare" ||
            val.slugProvider === "MCSYS"
              ? Number(checkLimitCtx?.stateCheckLimit.covered)
              : Number(checkLimitCtx?.stateCheckLimit.excess),
          adminFee:
            val.name.toLowerCase() === "digiqare" ||
            val.slugProvider === "MCSYS"
              ? Number(val.adminFee)
              : Number(amountNotDigicare?.adminFee),
        };
      })
    );
  }

  function onOpenModalOrder() {
    setIsOpenModalOrder(!isOpenModalOrder);
  }

  function onConfirmBackToPreviousPage() {
    router.replace(`/v1/payment?token=${token}#back`);
  }

  function onToggleModalBackPreviousPage() {
    history.pushState({}, "", "");
    props.setBackButtonBrowser((prev: any) => !prev);
  }

  function onArrowBack() {
    window.history.back();
  }

  const newProps = {
    isOpenModal: isOpenModalOrder,
    onOpenModal: onOpenModalOrder,
    data: ordersSummaryCC,
    form: {
      values: stateForm.values,
      errors: stateForm.errors,
      showCVV,
      onShowCVV,
      onSubmit,
      onChange,
      onChangeExpiredDate,
      onChangeChoosePurchase,
      iframeUrl,
      openCVVInfo,
      onToogleCvvInfo,
      isLoading3ds,
      installmentsOptions: installmentsOptions
        ? installmentsOptions[0].options
        : [],
      setStatePayment,
      isOpen: props.stateBackButtonBrowser,
      onClose: onToggleModalBackPreviousPage,
      onConfirm: onConfirmBackToPreviousPage,
      onArrowBack,
    },
  };

  if (props.isMobile) {
    return <CreditCardMobile {...newProps} />;
  }

  return <CreditCardDesktop {...newProps} />;
}
