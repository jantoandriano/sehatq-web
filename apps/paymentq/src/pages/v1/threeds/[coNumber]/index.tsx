import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { isMobileDevice } from "@sehatq/utils";
import { useToast } from "@sehatq/components";
import { CC3ds } from "@components/features/charge/cc-3ds";
import { usePrompt } from "@components/hooks/usePrompt";
import { useCancelPurchase } from "@components/features/charge/charge-queries";
import { ENV } from "src/constants";
import { trackMobile } from "src/utils/payment";
import MainLayout from "@components/layout";

export type ModalIFrameProps = {
  isMobile: boolean;
  iframeUrl?: string | string[] | null;
  coNumber?: string | string[] | null;
};

export const getServerSideProps: GetServerSideProps<ModalIFrameProps> = async ({
  req,
  query,
}) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const { url, coNumber } = query;
  const iframeUrl = url ? url : null;

  return {
    props: {
      isMobile,
      iframeUrl,
      coNumber,
    },
  };
};

export default function ThreedsPage(props: ModalIFrameProps) {
  const toast = useToast();

  const { mutate: mutateCancelPurchase } = useCancelPurchase();

  const trackingObj = {
    eventType: "purchase",
    state: "cancel",
    status: "redirect",
    message: "will be redirect to back url",
    coNumber: props.coNumber as string,
    link: "",
  };

  const showToast = (
    message: string,
    status: "success" | "error" | "netral"
  ) => {
    toast({
      message: message,
      status: status,
    });
  };

  /** ask user when reload 3ds page
   * - yes, cancel transaction
   */
  usePrompt();

  useEffect(() => {
    if (!props.iframeUrl) {
      mutateCancelPurchase(
        {
          coNumber: props.coNumber as string,
          reason: "cancel by system",
        },
        {
          onSuccess: () => {
            trackMobile(trackingObj, showToast);
            window.location.href = ENV.HOME_URL;
          },
          onError: () => {
            trackMobile(trackingObj, showToast);
            window.location.href = ENV.HOME_URL;
          },
        }
      );
    }
  }, [props.iframeUrl, props.coNumber]);

  return (
    <>
      <MainLayout>
        <CC3ds {...props} />
      </MainLayout>
    </>
  );
}
