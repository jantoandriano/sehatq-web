import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice } from "@sehatq/utils";
import { Authenticated } from "@sehatq/components";
import { URLS } from "@sehatq/constants";
import { ConsultationPage } from "@components/pages/telemedicine/consultation";

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

export default function MyHealthRecordPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <Authenticated />
      <ConsultationPage isMobile={isMobile} />
    </>
  );
}
