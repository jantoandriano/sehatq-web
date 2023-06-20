import React from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { getWaitingPaymentProps } from "@get-props";
import { WaitingPaymentPage } from "@components/features/waiting-payment";
import MainLayout from "@components/layout";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getWaitingPaymentProps>
> = async ({ req, query }) => {
  const { token, coNumber } = query as { token: string; coNumber: string };
  const isMobile = isMobileDevice(req.headers["user-agent"]);

  const props = await getWaitingPaymentProps({
    isMobile,
    token,
    coNumber,
  });
  if (props.error) {
    return { notFound: true };
  }

  return {
    props,
  };
};

export default function WaitingPaymentLandingPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <MainLayout>
        <WaitingPaymentPage isMobile={isMobile} />
      </MainLayout>
    </>
  );
}
