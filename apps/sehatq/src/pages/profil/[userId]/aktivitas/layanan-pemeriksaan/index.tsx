import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";

import { Authenticated } from "@sehatq/components";
import {
  getMyHealthServiceAppointmentsProps,
  MyHealthServiceAppointmentsParams,
  MyHealthServiceAppointmentsQuery,
} from "@get-props";
import { MyHealthServiceAppointments } from "@components/pages/profile";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getMyHealthServiceAppointmentsProps>,
  MyHealthServiceAppointmentsParams
> = async ({ params, query, req }) => {
  const { userId = "" } = params ?? {};
  const { status = "" } = query as MyHealthServiceAppointmentsQuery;
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getMyHealthServiceAppointmentsProps({
      userId,
      status,
      isMobile,
      cookie: req.headers["cookie"] ?? "",
    }),
  };
};

export default function MyHealthServiceAppointmentsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <MyHealthServiceAppointments isMobile={isMobile} />
    </>
  );
}
