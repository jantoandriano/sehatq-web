import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";

import { Authenticated } from "@sehatq/components";
import {
  getMyHealthServiceAppointmentProps,
  MyHealthServiceAppointmentParams,
} from "@get-props";
import { MyHealthServiceAppointment } from "@components/pages/profile";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyHealthServiceAppointmentProps>,
  MyHealthServiceAppointmentParams
> = async ({ params, req }) => {
  const { userId = "", bookingId = "" } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getMyHealthServiceAppointmentProps({
      userId,
      bookingId,
      isMobile,
      cookie: req.headers["cookie"] ?? "",
    }),
  };
};

export default function MyHealthServiceAppointmentPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <Authenticated />
      <MyHealthServiceAppointment {...props} />
    </>
  );
}
