import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  AwaitedReturn,
  getLocationFromNode,
  isMobileDevice,
} from "@sehatq/utils";
import {
  getTelemedHCPSProps,
  TelemedHCPSParams,
  TelemedHCPSQuery,
} from "@get-props";

import { TelemedicineHCPListPage } from "@components/pages/telemedicine";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTelemedHCPSProps>,
  TelemedHCPSParams
> = async ({ params, query, req, res }) => {
  const { slugs = [] } = params ?? {};
  if (slugs.length > 1) {
    return { notFound: true };
  }
  const {
    page,
    perPage,
    sort,
    q,
    campaignSlug,
    city,
    doctorExperience,
    gender,
    price,
    lat,
    long,
  } = query as TelemedHCPSQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const loc = getLocationFromNode(cookie ?? "");
  const props = await getTelemedHCPSProps({
    page,
    perPage,
    isMobile,
    slugs,
    sort,
    q,
    lat: lat ?? loc?.lat ?? "",
    long: long ?? loc?.long ?? "",
    campaignSlug,
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

export default function TelemedHCPListPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <TelemedicineHCPListPage isMobile={isMobile} />;
}
