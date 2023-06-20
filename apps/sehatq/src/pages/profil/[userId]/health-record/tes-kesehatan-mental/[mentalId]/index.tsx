import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { getMyMentalRecordProps, MyMentalRecordParams } from "@get-props";
import { MyMentalRecord } from "@components/pages/my-health-record/my-mental-record";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyMentalRecordProps>,
  MyMentalRecordParams
> = async ({ params, req }) => {
  const { mentalId = "" } = params ?? {};

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getMyMentalRecordProps({
      mentalId,
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
      <MyMentalRecord isMobile={isMobile} />
    </>
  );
}
