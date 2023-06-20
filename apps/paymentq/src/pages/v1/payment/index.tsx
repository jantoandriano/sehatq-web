import React from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { PaymentPage } from "@components/features/payment/payment";
import { getPaymentProps } from "@get-props";
import MainLayout from "@components/layout";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getPaymentProps>
> = async ({ req, query }) => {
  const { token } = query as { token: string };
  const isMobile = isMobileDevice(req.headers["user-agent"]);

  const props = await getPaymentProps({
    isMobile,
    token,
  });
  if (props.error) {
    return { notFound: true };
  }

  return {
    props,
  };
};

export default function Payment(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <MainLayout>
        <PaymentPage {...props} />
      </MainLayout>
    </>
  );
}
