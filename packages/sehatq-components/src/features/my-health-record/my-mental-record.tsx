import React from "react";

import {
  MyMentalRecordDesktop,
  MyMentalRecordSkeletonDesktop,
} from "./my-mental-record-desktop";
import {
  MyMentalRecordMobile,
  MyMentalRecordSkeletonMobile,
} from "./my-mental-record-mobile";
import {
  useGetMyMentalRecord,
  MyMentalRecordCache,
} from "./my-mental-record-queries";

export type MyMentalRecordProps = {
  isMobile?: boolean;
  mentalId: string;
};

function selectMyMentalRecord(myMentalRecord: MyMentalRecordCache) {
  return myMentalRecord.data;
}

export function MyMentalRecord(props: MyMentalRecordProps) {
  const { isMobile, mentalId } = props;

  const query = {
    mentalId,
  };

  const { data: myMentalRecord, isLoading } = useGetMyMentalRecord(query, {
    select: selectMyMentalRecord,
  });

  if (isLoading) {
    return <MyMentalRecordSkeleton isMobile={isMobile} />;
  }

  if (myMentalRecord && myMentalRecord.id) {
    if (isMobile) {
      return <MyMentalRecordMobile {...myMentalRecord} />;
    }

    return <MyMentalRecordDesktop {...myMentalRecord} />;
  }
  return null;
}

export type MyMentalRecordSkeletonProps = { isMobile?: boolean };

export function MyMentalRecordSkeleton(props: MyMentalRecordSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <MyMentalRecordSkeletonMobile />;
  }
  return <MyMentalRecordSkeletonDesktop />;
}
