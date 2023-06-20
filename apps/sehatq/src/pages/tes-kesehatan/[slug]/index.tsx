import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { HealthToolPage } from "@components/pages/health-tool";
import { getHealthToolProps, HealthToolParams } from "src/get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getHealthToolProps>,
  HealthToolParams
> = async ({ req, params }) => {
  const { slug = "" } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const props = await getHealthToolProps({
    isMobile,
    cookie,
    slug,
  });

  return {
    props,
  };
};

export default function HealthTool(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <HealthToolPage isMobile={isMobile} />;
}
