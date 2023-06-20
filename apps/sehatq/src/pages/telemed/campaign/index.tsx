import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { TelemedicineCampaignListPage } from "@components/pages/telemedicine";
import { getTelemedicineCampaignListProps } from "src/get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTelemedicineCampaignListProps>
> = async ({ req, res }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const props = await getTelemedicineCampaignListProps({
    isMobile,
    cookie,
  });
  res.setHeader("Cache-Control", `s-maxage=${10 * 60}, stale-while-revalidate`);

  return {
    props,
  };
};

export default function TelemedCampaignListPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <TelemedicineCampaignListPage isMobile={isMobile} />;
}
