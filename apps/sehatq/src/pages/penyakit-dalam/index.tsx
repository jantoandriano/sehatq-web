import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { getInternistClinicProps, InternistClinicPageQuery } from "@get-props";
import { InternistClinic } from "@components/pages/internist-clinic";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getInternistClinicProps>
> = async ({ req, res, query }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const { lat, long } = query as InternistClinicPageQuery;

  const props = await getInternistClinicProps({
    isMobile,
    lat,
    long,
  });
  res.setHeader("Cache-Control", `s-maxage=${30 * 60}, stale-while-revalidate`);
  return {
    props,
  };
};

export default function PediatricClinicPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <InternistClinic isMobile={isMobile} />;
}
