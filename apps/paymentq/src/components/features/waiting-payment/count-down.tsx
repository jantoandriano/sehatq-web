import React from "react";
import { formatDates } from "src/utils/date-format";
import { useGetHourMinSec } from "@components/hooks/useGetHourMinSec";
import { CountDownSectionMobile } from "./count-down-mobile";
import { CountDownSectionDesktop } from "./count-down-desktop";

type CountDownSectionProps = {
  isMobile?: boolean;
  paymentType: string;
  transactionTime: string;
  serverTime: string;
};
export type SetTimerParam = { hours: number; minutes: number; seconds: number };

export function CountDownSection(props: CountDownSectionProps) {
  const time = useGetHourMinSec(props.serverTime, props.transactionTime);

  const newProps = {
    paymentType: props.paymentType,
    transactionTime: formatDates(props.transactionTime),
    ...time,
  };

  if (props.isMobile) {
    return <CountDownSectionMobile {...newProps} />;
  }

  return <CountDownSectionDesktop {...newProps} />;
}
