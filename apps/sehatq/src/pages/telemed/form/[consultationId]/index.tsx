import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { URLS } from "@sehatq/constants";
import { ConsultationFormPage } from "@components/pages/telemedicine";

export const getServerSideProps: GetServerSideProps<{
  isMobile: boolean;
}> = async ({ req, res }) => {
  if (!req.cookies["token"]) {
    return {
      redirect: {
        permanent: false,
        destination: URLS.EXTERNAL_LOGIN,
      },
    };
  }
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  res.setHeader(
    "Cache-Control",
    `s-maxage=${6 * 3600}, stale-while-revalidate`
  );
  return {
    props: {
      isMobile,
    },
  };
};

export default function ConsultationForm(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <ConsultationFormPage isMobile={isMobile} />
    </>
  );
}
