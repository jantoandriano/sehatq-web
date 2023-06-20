import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  AwaitedReturn,
  getLocationFromNode,
  isMobileDevice,
} from "@sehatq/utils";
import {
  getTelemedicineCampaignProps,
  TelemedicineCampaignParams,
  TelemedicineCampaignQuery,
} from "@get-props";
import { TelemedicineCampaignPage } from "@components/pages/telemedicine";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTelemedicineCampaignProps>,
  TelemedicineCampaignParams
> = async ({ params, query, req, res }) => {
  const { slug = "" } = params ?? {};
  const {
    page,
    perPage,
    sort,
    q,
    specialitySlug,
    city,
    doctorExperience,
    gender,
    price,
    lat,
    long,
  } = query as TelemedicineCampaignQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const loc = getLocationFromNode(cookie ?? "");
  const props = await getTelemedicineCampaignProps({
    page,
    perPage,
    isMobile,
    slug,
    sort,
    q,
    lat: lat ?? loc?.lat ?? "",
    long: long ?? loc?.long ?? "",
    specialitySlug,
    city,
    doctorExperience,
    gender,
    price,
  });

  if (props.error) {
    res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
    return { notFound: true };
  } else {
    res.setHeader(
      "Cache-Control",
      `s-maxage=${10 * 60}, stale-while-revalidate`
    );
  }

  return {
    props,
  };
};

export default function TelemedCampaignPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <TelemedicineCampaignPage isMobile={isMobile} />;
}
