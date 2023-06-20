import React from "react";
import { useRouter } from "next/router";

import { MyMentalRecordMobile } from "./my-mental-record-mobile";
import { MyMentalRecordDesktop } from "./my-mental-record-desktop";

export type MyMentalRecordProps = {
  isMobile: boolean;
};

export function MyMentalRecord(props: MyMentalRecordProps) {
  const router = useRouter();
  const { isMobile } = props;
  const { mentalId } = router.query;

  const newProps = {
    isMobile,
    mentalId: `${mentalId}`,
  };

  if (isMobile) {
    return <MyMentalRecordMobile {...newProps} />;
  }
  return <MyMentalRecordDesktop {...newProps} />;
}
