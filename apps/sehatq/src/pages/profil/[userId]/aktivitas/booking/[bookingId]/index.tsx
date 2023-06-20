import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { MyDoctorAppointment } from "@components/pages/my-doctor-appointment";

export const getServerSideProps: GetServerSideProps<{
  isMobile: boolean;
}> = async ({ req }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return { props: { isMobile } };
};

export default function MyDoctorAppointmentPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <MyDoctorAppointment isMobile={isMobile} />
    </>
  );
}
