import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated, PrescriptionStatusFlag } from "@sehatq/components";
import {
  getMyPrescriptionsProps,
  MyPrescriptionsParams,
  MyPrescriptionsQuery,
} from "@get-props";
import { MyPrescriptions } from "@components/pages/profile";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyPrescriptionsProps>,
  MyPrescriptionsParams
> = async ({ query, req }) => {
  const { statusFlag = "" } = query as MyPrescriptionsQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getMyPrescriptionsProps({
      statusFlag: statusFlag as PrescriptionStatusFlag | "",
      isMobile,
      cookie: req.headers["cookie"] ?? "",
    }),
  };
};

export default function MyPrescriptionsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <MyPrescriptions isMobile={isMobile} />
    </>
  );
}
