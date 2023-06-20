import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@sehatq/components";
import { isExpired } from "src/helpers";
import { trackMobile } from "src/utils/payment";
import { ENV, PAYMENT_STATUS, PAYMENT_TYPES, URLS } from "src/constants";
import { useCancelPurchase } from "../charge/charge-queries";
import { useGetWaitingPaymentStatus } from "./waiting-payment-queries";
import { Data } from "./waiting-payment-types";
import { getDataWaitingPaymentStatus } from "./waiting-payment-model";
import { WaitingPaymentSkeleton } from "./waiting-payment-skeleton";
import { WaitingPaymentDesktop } from "./waiting-payment-desktop";
import { WaitingPaymentMobile } from "./waiting-payment-mobile";

type WaitingPaymentPageProps = {
  isMobile: boolean;
};

export function WaitingPaymentPage(props: WaitingPaymentPageProps) {
  const router = useRouter();
  const toast = useToast();

  const { isMobile } = props;
  const { coNumber } = router.query;

  const [stateModal, setStateModal] = useState({
    isVisible: false,
    title: "",
    message: "",
  });
  const [modalConfirmCC, setModalConfirmCC] = useState(false);
  const eventType = "waiting-for-payment";

  const trackingObj = {
    eventType,
    state: "",
    status: "redirect",
    message: "will be redirect to back url",
    coNumber: coNumber as string,
    link: "",
  };

  const trackMobileBack = () => {
    const trackingObj = {
      eventType: "waiting-for-payment",
      state: "back",
      status: "redirect",
      message: "will be redirect to back",
      coNumber: coNumber as string,
      link: "",
    };
    trackMobile(trackingObj);
  };

  const onClickBack = () => {
    trackMobileBack();
    history.back();
  };

  useEffect(() => {
    window.addEventListener(
      "backbutton",
      () => {
        trackMobileBack();
      },
      false
    );
  }, []);

  const {
    data: dataWaitingPaymentStatus,
    isFetching: isLoadingWaitingPaymentStatus,
    error: errorWaitingPaymentStatus,
    refetch,
  } = useGetWaitingPaymentStatus(
    {
      coNumber: coNumber as string,
    },
    {
      onSuccess: checkPaymentStatus,
      refetchOnMount: "always",
      onError: (data) => {
        if (data && Number(data.status) >= 400) {
          setStateModal({
            ...stateModal,
            isVisible: true,
            title: String(data.status),
            message: data.message,
          });
        }

        if (data.status === 404) {
          trackingObj.state = "didn’t-choose-payment-method";
          trackingObj.message = "will be redirect to home page";
          trackingObj.link = ENV.HOME_URL;
          trackMobile(trackingObj, showToast);
          window.location.href = ENV.HOME_URL;
        }
      },
    }
  );

  const { mutate: mutateCancelPurchase } = useCancelPurchase();
  const paymentType = dataWaitingPaymentStatus?.paymentType;
  const paymentTimeout = dataWaitingPaymentStatus?.paymentTimeout;
  const orderDetailData = getDataWaitingPaymentStatus(dataWaitingPaymentStatus);

  const showToast = (
    message: string,
    status: "success" | "error" | "netral"
  ) => {
    toast({
      message: message,
      status: status,
    });
  };

  useEffect(() => {
    if (
      isExpired(
        dataWaitingPaymentStatus?.serverTime as string,
        paymentTimeout as string
      )
    ) {
      toast({ message: "Payment timeout", status: "error" });
      sessionStorage.clear();
    }
  }, [dataWaitingPaymentStatus?.serverTime, paymentTimeout]);

  function onConfirmPayment() {
    return refetch().then((data) => {
      if (data.data?.status === PAYMENT_STATUS.UNPAID) {
        toast({ message: data.data?.message, status: "error" });
      }
      if (data?.data?.detail.length) {
        setStateModal({
          ...stateModal,
          isVisible: false,
          title: "",
          message: "",
        });
      }
    });
  }

  function onCheckOrder() {
    trackingObj.state = "redirect-to-order-detail";
    trackingObj.message = "will be redirect to order detail";
    trackingObj.link = `${ENV.TOKO_DOMAIN}${URLS.TOKO.ORDER_SERVICE}${coNumber}`;
    trackMobile(trackingObj);
    router.push({
      pathname: `${ENV.TOKO_DOMAIN}${URLS.TOKO.ORDER_SERVICE}${coNumber}`,
    });
  }

  const orderDetail: any = {
    ...orderDetailData,
    isLoading: isLoadingWaitingPaymentStatus as boolean,
    error: errorWaitingPaymentStatus as unknown as string,
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  function checkPaymentStatus(params: Data) {
    const serverTime = params.serverTime;
    const paymentTimeout = params.paymentTimeout;
    const paymentStatus = params.status;
    const coNumber = params.coNumber;
    const callbackURL = params.callbackURL;
    const backURL = params.backUrl;
    const paymentType = params.paymentType;

    if (params && !params.detail.length) {
      setStateModal({
        ...stateModal,
        isVisible: true,
        title: "",
        message: "Internal server error",
      });
    }

    if (
      isExpired(serverTime, paymentTimeout) &&
      paymentStatus === PAYMENT_STATUS.UNPAID
    ) {
      mutateCancelPurchase(
        {
          coNumber,
          reason: "The payment process has expired.",
        },
        {
          onSettled: () => {
            trackingObj.state = "expired";
            trackingObj.link = backURL;
            trackMobile(trackingObj);
            window.location.href = backURL;
          },
        }
      );
    }

    if (
      paymentStatus === PAYMENT_STATUS.UNPAID &&
      paymentType === PAYMENT_TYPES.CREDIT_CARD
    ) {
      setModalConfirmCC(true);
    }

    if (paymentStatus === PAYMENT_STATUS.PAID) {
      trackingObj.state = "success";
      trackingObj.message = "will be redirect to thank you page";
      trackingObj.link = `${callbackURL}?coNumber=${coNumber}&status=success`;
      trackMobile(trackingObj, showToast);
      window.location.href = `${callbackURL}?coNumber=${coNumber}&status=success`;
    }

    if (
      paymentStatus === PAYMENT_STATUS.CANCELED ||
      paymentStatus === PAYMENT_STATUS.FAILED
    ) {
      trackingObj.state =
        paymentStatus === PAYMENT_STATUS.CANCELED ? "cancel" : "failed";
      trackingObj.message = "will be redirect to back url";
      trackingObj.link = backURL;
      trackMobile(trackingObj, showToast);
      window.location.href = backURL;
    }
  }

  function onCancelCreditCard() {
    mutateCancelPurchase(
      {
        coNumber: coNumber as string,
        reason: "cancel by system",
      },
      {
        onSuccess: () => {
          const trackingObj = {
            eventType,
            state: "cancel",
            status: "redirect",
            message: "will be redirect to order detail",
            coNumber: coNumber as string,
            link: `${ENV.TOKO_DOMAIN}${URLS.TOKO.ORDER_SERVICE}${coNumber}`,
          };
          trackMobile(trackingObj);

          router.replace(
            `${ENV.TOKO_DOMAIN}${URLS.TOKO.ORDER_SERVICE}${coNumber}`
          );

          setModalConfirmCC(false);
        },
      }
    );
  }

  const newProps = {
    orderDetail,
    isMobile: props.isMobile,
    onConfirmPayment,
    onCheckOrder,
    serverTime: dataWaitingPaymentStatus?.serverTime as string,
    status: dataWaitingPaymentStatus?.status as string,
    paymentType,
    stateModal,
    trackingObj,
    isLoadingWaitingPaymentStatus,
    modalConfirmCC,
    onCancelCreditCard,
    onClickBack,
  };

  if (isLoadingWaitingPaymentStatus) {
    return <WaitingPaymentSkeleton isMobile={props.isMobile} />;
  }

  if (isMobile) {
    return <WaitingPaymentMobile {...newProps} />;
  }

  return <WaitingPaymentDesktop {...newProps} />;
}
