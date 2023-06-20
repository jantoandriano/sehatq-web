import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { getHealthToolsProps } from "@get-props";
import { HealthToolListPage } from "@components/pages/health-tool";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getHealthToolsProps>
> = async ({ req, res }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getHealthToolsProps({
    isMobile,
  });
  res.setHeader("Cache-Control", `s-maxage=${30 * 60}, stale-while-revalidate`);
  return {
    props,
  };
};

export default function HealthToolsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <HealthToolListPage isMobile={isMobile} />;
}
