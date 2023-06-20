import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { TelemedicineLanding } from "@components/pages/telemedicine";
import { getTelemedicineLandingProps } from "src/get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTelemedicineLandingProps>
> = async ({ req, res }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const props = await getTelemedicineLandingProps({
    isMobile,
    cookie,
  });
  res.setHeader("Cache-Control", `s-maxage=${10 * 60}, stale-while-revalidate`);

  return {
    props,
  };
};

export default function TelemedicineLandingPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <TelemedicineLanding isMobile={isMobile} />;
}
