import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { getMyPrescriptionProps, MyPrescriptionParams } from "@get-props";
import { MyPrescription } from "@components/pages/profile";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyPrescriptionProps>,
  MyPrescriptionParams
> = async ({ params, req }) => {
  const { prescriptionNo = "" } = params ?? {};

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getMyPrescriptionProps({
      prescriptionNo,
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
      <MyPrescription isMobile={isMobile} />
    </>
  );
}
