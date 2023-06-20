import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import {
  getMyMentalRecordsProps,
  MyMentalRecordsParams,
  MyMentalRecordsQuery,
} from "@get-props";
import { MyMentalRecords } from "@components/pages/my-health-record/my-mental-records";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyMentalRecordsProps>,
  MyMentalRecordsParams
> = async ({ query, params, req }) => {
  const { userId = "" } = params ?? {};
  const { dateRange = "", page = "" } = query as MyMentalRecordsQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getMyMentalRecordsProps({
      userId,
      dateRange: dateRange ?? "",
      page: page ?? "",
      isMobile,
      cookie: req.headers["cookie"] ?? "",
    }),
  };
};

export default function MyHealthRecordPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <MyMentalRecords isMobile={isMobile} />
    </>
  );
}
