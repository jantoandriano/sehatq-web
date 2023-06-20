import React from "react";

import { MyEmptyMentalRecordDesktop } from "./my-empty-mental-record-desktop";
import { MyEmptyMentalRecordMobile } from "./my-empty-mental-record-mobile";

export type MyEmptyMentalRecordProps = { isMobile: boolean };

export function MyEmptyMentalRecord(props: MyEmptyMentalRecordProps) {
  const { isMobile, ...otherProps } = props;
  if (isMobile) {
    return <MyEmptyMentalRecordMobile {...otherProps} />;
  }
  return <MyEmptyMentalRecordDesktop {...otherProps} />;
}
