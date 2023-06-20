import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { getPediatricClinicProps } from "@get-props";
import { PediatricClinic } from "@components/pages/pediatric-clinic";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getPediatricClinicProps>
> = async ({ req, res }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getPediatricClinicProps({
    isMobile,
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
  return <PediatricClinic isMobile={isMobile} />;
}
