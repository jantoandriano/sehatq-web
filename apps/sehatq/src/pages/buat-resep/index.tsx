import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import {
  getPrescriptionFormProps,
  PrescriptionFormParams,
  PrescriptionFormQuery,
} from "@get-props";
import { PrescriptionForm } from "@components/pages/prescription";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getPrescriptionFormProps>,
  PrescriptionFormParams
> = async ({ query, req, res }) => {
  if (!req.cookies["token"]) {
    return {
      redirect: {
        permanent: false,
        destination: URLS.EXTERNAL_LOGIN,
      },
    };
  }
  const { consultationId } = query as PrescriptionFormQuery;
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];

  const props = await getPrescriptionFormProps({
    consultationId,
    isMobile,
    cookie,
  });

  if (props.error) {
    res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
    if (props.error) {
      return { notFound: true };
    }
  } else {
    res.setHeader(
      "Cache-Control",
      `s-maxage=${3 * 3600}, stale-while-revalidate`
    );
  }

  return {
    props,
  };
};

export default function PrescriptionFormPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <PrescriptionForm isMobile={isMobile} />;
}
