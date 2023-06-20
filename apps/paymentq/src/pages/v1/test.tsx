import React, { useEffect } from "react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { ENV } from "@constants";

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ query }) => {
  const { token } = query as { token: string };
  return {
    props: { token },
  };
};

export default function Test(
  props: InferGetServerSidePropsType<{ token: string }>
) {
  const { token } = props;

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== ENV.PAYMENTQ_DOMAIN || !event.data?.eventType)
          return;
        console.log("post message", event);
      },
      false
    );
  }, []);

  return (
    <iframe
      src={`${ENV.PAYMENTQ_DOMAIN}/v1/payment?token=${token}`}
      width="100%"
      height="100%"
      style={{
        display: "block",
        borderWidth: 1,
        borderColor: "gray",
        height: "100vh",
        width: "100%",
      }}
    />
  );
}
