import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useToast } from "@sehatq/components";
import { ENV, PAYMENT_STATUS } from "@constants";
import { useContextSelectedPayment } from "src/contexts/selected-payment";
import { useContextCheckLimit } from "src/contexts/check-limit";
import { trackMobile } from "src/utils/payment";
import { pushDataLayerRenderCheckOutPayment } from "src/helpers/dataLayer";
import { useCancelPurchase } from "../charge/charge-queries";
import { PaymentDesktop } from "./payment-desktop";
import { PaymentMobile } from "./payment-mobile";
import { PaymentCheckLimitBody } from "./payment-model";
import {
  useGetPaymentCheckoutVerify,
  useGetPaymentCheckLimit,
} from "./payment-queries";
import {
  PaymentCheckLimitType,
  DataPaymentLimit,
  ModalCheckLimitType,
  DataModalCheckLimit,
} from "./payment-type";
import { handleErrorMessage } from "./payment-helpers";
import PaymentContext, { ctxObj } from "./payment-context";

export type PaymentPageProps = { isMobile: boolean; backURL: string };
export type StatePaymentType = { isExpired: boolean; isConfrim: boolean };
export type StateSelectPaymentType = {
  id: number;
  name: string;
  slugProvider?: string;
  adminFee: number;
  imageUrl: string;
  disable: boolean;
  disabledReason: string;
  slug: string;
};

export function PaymentPage(props: PaymentPageProps) {
  const { isMobile, backURL } = props;
  const router = useRouter();
  const { token } = router.query as { token: string };
  const toast = useToast();
  const [contextObj, setContextObj] = useState(ctxObj);
  const [statePayment, setStatePayment] = useState({
    isExpired: false,
    isConfrim: false,
  });
  const [isOpenModalInfo, setIsOpenModalInfo] = useState<boolean>(false);
  const [paymentCheckLimit, setPaymentCheckLimit] =
    useState<PaymentCheckLimitType>(DataPaymentLimit);
  const [modalCheckLimit, setModalCheckLimit] =
    useState<ModalCheckLimitType>(DataModalCheckLimit);
  const [statePaymentSelect, setStatePaymentSelect] = useState<
    StateSelectPaymentType[]
  >([]);

  const { mutate } = useGetPaymentCheckLimit();
  const { data, isFetching: isFetchingCheckoutVerify } =
    useGetPaymentCheckoutVerify({ token });

  const selectedPaymentCtx = useContextSelectedPayment();
  const checkLimitCtx = useContextCheckLimit();

  const { mutate: mutateCancelPurchase } = useCancelPurchase();
  const eventValue = "on-load-checkout-payment";

  useEffect(() => {
    selectedPaymentCtx?.setSelectedPayment(statePaymentSelect);
  }, [statePaymentSelect]);

  useEffect(() => {
    checkLimitCtx?.setStateCheckLimit(paymentCheckLimit);
  }, [paymentCheckLimit]);

  function showToast(message: string, status: "success" | "error" | "netral") {
    toast({
      message: message,
      status: status,
    });
  }

  function handleFailedPayment(status: string, isShowToast = false) {
    const objData = {
      eventType: eventValue,
      state: status,
      status: "redirect",
      message: "will be redirect to Back Url",
      coNumber: "",
      link: backURL,
    };
    if (isShowToast) {
      trackMobile(objData, showToast);
    } else {
      trackMobile(objData);
    }
    window.history.back();
  }

  useEffect(() => {
    const paymentStatus = data?.data.data.status;
    if (
      paymentStatus === PAYMENT_STATUS.CANCELED ||
      paymentStatus === PAYMENT_STATUS.FAILED
    ) {
      handleFailedPayment(paymentStatus, true);
    } else if (data?.data.data.selectPayment) {
      const { coNumber, status } = data.data.data;
      const { callbackURL } = data.data.data.orderLog;
      const objData = {
        eventType: eventValue,
        state: status === "paid" ? "success" : "waiting-for-payment",
        status: "redirect",
        message:
          status === "paid"
            ? "will be redirect to thank you page"
            : "will be redirect to waiting for payment",
        coNumber: coNumber,
        link:
          status === "paid"
            ? `${callbackURL}?coNumber=${coNumber}&status=success`
            : `${ENV.PAYMENTQ_DOMAIN}/v1/waiting-payment/${coNumber}`,
      };
      trackMobile(objData, showToast);
      if (status === "paid") {
        window.location.href = `${callbackURL}?coNumber=${coNumber}&status=success`;
      } else if (status === "unpaid") {
        window.location.href = `${ENV.PAYMENTQ_DOMAIN}/v1/waiting-payment/${coNumber}`;
      }
    } else if (data?.data.code === 200) {
      const { coNumber } = data.data.data;
      const objData = {
        eventType: eventValue,
        state: "success",
        status: "render checkout payment",
        message: "",
        coNumber: coNumber,
        link: "",
      };
      trackMobile(objData);
      pushDataLayerRenderCheckOutPayment(data?.data, 2);
    }
  }, [
    data?.data.code,
    data?.data.data,
    data?.data.data.coNumber,
    data?.data.data.selectPayment,
    router,
  ]);

  useEffect(() => {
    if (window) {
      if (
        window.performance.getEntriesByType("navigation")[0].type !==
          "reload" &&
        window?.location?.hash !== "#back"
      ) {
        history.pushState({}, "", "");
      }

      window.onpopstate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setStatePayment((prev) => ({ ...prev, isConfrim: !prev.isConfrim }));
      };

      window.addEventListener(
        "backbutton",
        () => {
          const popStateEvent = new PopStateEvent("popstate", { state: {} });
          dispatchEvent(popStateEvent);
          const objData = {
            eventType: eventValue,
            state: "back",
            status: "redirect",
            message: "will be redirect back",
            coNumber: "",
            link: "",
          };
          trackMobile(objData);
        },
        false
      );
    }
  }, []);

  function fetchLimit(
    value: StateSelectPaymentType,
    body: PaymentCheckLimitBody,
    updatePayment: (value: StateSelectPaymentType) => void
  ) {
    setContextObj((prev) => ({ ...prev, isLoading: true }));
    if (paymentCheckLimit.name !== value.name) {
      mutate(body, {
        onSuccess: (response) => {
          let isShouldUpdateData = false;
          if (
            response.data.isAllCovered &&
            response.data.member.excessWithAdminFee === 0
          ) {
            toast({
              message: response.meta.message,
              status: "success",
            });
            isShouldUpdateData = true;
            setContextObj((prev) => ({ ...prev, isLoading: false }));
          } else {
            setIsOpenModalInfo(true);
            setModalCheckLimit({
              imageUrl: value.imageUrl,
              message: response.meta.message,
            });
            if (response.data.member.remainingLimit !== 0) {
              isShouldUpdateData = true;
            } else if (statePaymentSelect.length > 1) {
              setContextObj((prev) => ({ ...prev, isLoading: false }));
            }
          }

          if (isShouldUpdateData) {
            updatePayment(value);
            setPaymentCheckLimit({
              ...response.data.member,
              name: value.name,
            });
          }
        },
        onError: (response) => {
          toast(handleErrorMessage(response.message));
        },
      });
    } else {
      updatePayment(value);
      setModalCheckLimit(DataModalCheckLimit);
      setPaymentCheckLimit(DataPaymentLimit);
    }
  }

  function onConfirmBackToPreviousPage() {
    setStatePayment((prev) => ({ ...prev, isConfrim: !prev.isConfrim }));
    mutateCancelPurchase(
      {
        coNumber: data?.data.data.coNumber as string,
        reason: "cancel by user, back to previous page",
      },
      {
        onSettled: () => {
          handleFailedPayment("cancel");
        },
      }
    );
  }

  function onToggleModalBackPreviousPage() {
    history.pushState({}, "", "");
    setStatePayment((prev) => ({ ...prev, isConfrim: !prev.isConfrim }));
  }

  function onArrowBack() {
    window.history.back();
  }

  const paymentCashlessData = statePaymentSelect.filter(
    (item) => item.slug === "split-bill"
  )[0];

  const newProps = {
    statePayment,
    setStatePayment,
    modalCheckLimit,
    paymentCheckLimit,
    isOpenModalInfo,
    setIsOpenModalInfo,
    statePaymentSelect,
    paymentCashlessData,
    setStatePaymentSelect,
    fetchLimit,
    setContextObj,
    isFetchingCheckoutVerify,
    isOpen: statePayment.isConfrim,
    onClose: onToggleModalBackPreviousPage,
    onConfirm: onConfirmBackToPreviousPage,
    onArrowBack,
  };
  return (
    <PaymentContext.Provider value={{ isLoading: contextObj.isLoading }}>
      {isMobile ? (
        <PaymentMobile {...newProps} />
      ) : (
        <PaymentDesktop {...newProps} />
      )}
    </PaymentContext.Provider>
  );
}
