import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice } from "@sehatq/utils";
import { VerifyEmail } from "@components/pages/verify-email";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  res.setHeader("Cache-Control", `s-maxage=${30 * 60}, stale-while-revalidate`);
  if (!req.cookies["emailVerificationData"] || !req.cookies["token"]) {
    return { notFound: true };
  }

  const {
    email = "",
    initialResendOTPTimer = "0",
    type,
  } = JSON.parse(
    Buffer.from(req.cookies["emailVerificationData"], "base64").toString(
      "binary"
    )
  );
  const props = {
    isMobile,
    email,
    initialResendOTPTimer: +initialResendOTPTimer,
    otpType: type,
  };
  return {
    props,
  };
};

export default function VerifyEmailPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile, email, initialResendOTPTimer, otpType } = props;
  return (
    <VerifyEmail
      isMobile={isMobile}
      email={email}
      initialResendOTPTimer={initialResendOTPTimer}
      otpType={otpType}
    />
  );
}
