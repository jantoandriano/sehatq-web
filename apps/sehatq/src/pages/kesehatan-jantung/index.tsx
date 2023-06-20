import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { getCardiacClinicProps, CardiacClinicPageQuery } from "@get-props";
import { CardiacClinic } from "@components/pages/cardiac-clinic";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getCardiacClinicProps>
> = async ({ req, res, query }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const { lat, long } = query as CardiacClinicPageQuery;

  const props = await getCardiacClinicProps({
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
  return <CardiacClinic isMobile={isMobile} />;
}
