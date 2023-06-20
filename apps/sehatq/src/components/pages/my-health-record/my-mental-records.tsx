import React from "react";

import { MyMentalRecordsMobile } from "./my-mental-records-mobile";
import { MyHealthRecordsDesktop } from "./my-mental-records-desktop";

export type MyMentalRecordsProps = { isMobile: boolean };

export function MyMentalRecords(props: MyMentalRecordsProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <MyMentalRecordsMobile />;
  }
  return <MyHealthRecordsDesktop />;
}
