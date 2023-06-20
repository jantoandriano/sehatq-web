import React, { useEffect, useMemo, useState } from "react";
import { intervalToDuration } from "date-fns";
import useCountDown from "react-countdown-hook";

import { OTPEmailDesktop } from "./otp-email-desktop";
import { OTPEmailMobile } from "./otp-email-mobile";
import {
  GenerateOTPResponse,
  useGenerateOTPEmail,
  useValidateOTPEmail,
} from "./otp-email-queries";

export type OTPEmailProps = {
  isMobile: boolean;
  initialResendOTPTimer: number;
  email: string;
  otpType: "verification" | "change";
  onSuccess: () => void;
};

function formatTime(time: number) {
  return time < 10 ? `0${time}` : String(time);
}

export function OTPEmail({
  isMobile,
  email,
  initialResendOTPTimer,
  otpType,
  onSuccess,
}: OTPEmailProps) {
  const [timeLeft, { start }] = useCountDown(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLastRetryOtp, setIsLastRetryOtp] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string>("");

  useEffect(() => {
    if (initialResendOTPTimer > 0) {
      start(initialResendOTPTimer * 1e3);
    }
  }, [initialResendOTPTimer, start]);

  const { mutate: generateOTPEmailMethod } = useGenerateOTPEmail({
    excludeEmailVerified: `${otpType === "change"}`,
  });

  const { mutate: validateOTPEmailMethod, isLoading: isVerifying } =
    useValidateOTPEmail({
      excludeEmailVerified: `${otpType === "change"}`,
    });

  const { minutes, seconds }: Record<string, number> = intervalToDuration({
    start: 0,
    end: timeLeft,
  });

  const duration = useMemo(() => {
    return {
      inSeconds: timeLeft / 1e3,
      formatted: `${formatTime(minutes)}:${formatTime(seconds)}`,
    };
  }, [timeLeft, minutes, seconds]);

  function changeOtp(val: string) {
    setOtpValues(val);
  }

  function resendOtp() {
    generateOTPEmailMethod(
      {
        email,
      },
      {
        onSuccess: ({ data, meta }) => {
          const { otp }: GenerateOTPResponse = data;
          if (otp) {
            if (otp.remainingRetryOtp === 0) setIsLastRetryOtp(true);
            start(+otp.resendOtpWaitingTime * 1000);
          } else {
            setErrorMsg(meta.message);
            setIsLastRetryOtp(true);
          }
        },
        onError: (e) => setErrorMsg(e.message),
      }
    );
  }

  function verifyOtp() {
    setErrorMsg("");
    validateOTPEmailMethod(
      {
        email,
        otpCode: otpValues,
      },
      {
        onSuccess,
        onError: (e) => setErrorMsg(e.message),
      }
    );
  }

  const props = {
    email,
    duration,
    errorMsg,
    isLastRetryOtp,
    isVerifying,
    otpValues,
    resendOtp,
    verifyOtp,
    changeOtp,
  };

  if (isMobile) return <OTPEmailMobile {...props} />;
  return <OTPEmailDesktop {...props} />;
}
