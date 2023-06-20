import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigation } from "@sehatq/utils";
import { useChangeEmail, useGetProfile, useToast } from "@sehatq/components";
import { VerifyEmailDesktop } from "./verify-email-desktop";
import { VerifyEmailMobile } from "./verify-email-mobile";

type VerifyEmailPageProps = {
  isMobile: boolean;
  email: string;
  initialResendOTPTimer: number;
  otpType: "verification" | "change";
};

export function VerifyEmail({
  isMobile,
  email,
  initialResendOTPTimer,
  otpType,
}: VerifyEmailPageProps) {
  const { navigate } = useNavigation();
  const { data } = useGetProfile();
  const { mutate: changeEmailMethod } = useChangeEmail();
  const toast = useToast();

  const [isVerificationSuccess, setIsVerificationSuccess] =
    useState<boolean>(false);

  function onSuccess() {
    if (otpType === "change") {
      changeEmailMethod(
        { email, isCorporate: false },
        {
          onSuccess: ({ data }) => {
            const options = {
              path: "/",
              domain: ".sehatq.com",
              expires: 1,
            };
            Cookies.set("token", data.token || "", options);
            Cookies.set(
              "__uid2_advertising_token",
              data.uid2Tokens?.advertisingToken || "",
              options
            );
            setIsVerificationSuccess(true);
          },
          onError: (e) => {
            toast({
              message: e.message,
              status: "error",
            });
          },
        }
      );
    } else {
      setIsVerificationSuccess(true);
    }
  }

  function closeModal() {
    Cookies.remove("emailVerificationData", {
      path: "/",
      domain: ".sehatq.com",
    });
    navigate("EDIT_PROFILE", { userId: data?.id });
  }

  const props = {
    email,
    initialResendOTPTimer,
    otpType,
    isVerificationSuccess,
    closeModal,
    onSuccess,
  };

  if (isMobile) return <VerifyEmailMobile {...props} />;
  return <VerifyEmailDesktop {...props} />;
}
