import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";
import {
  isMobileDevice,
  getLocationFromNode,
  AwaitedReturn,
} from "@sehatq/utils";
import { getHCFProps, HCFParams, HCFQuery } from "@get-props";
import { HealthCareFacilityList } from "@components/pages/health-care-facility";

const NotFoundPage = dynamic(() => import("../../404"), {
  ssr: false,
});

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getHCFProps>,
  HCFParams
> = async ({ params, query, req, res }) => {
  const { slugs = [] } = params ?? {};
  const { page, perPage, partner, facility, lat, long, sort, q } =
    query as HCFQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const loc = getLocationFromNode(cookie ?? "");
  const props = await getHCFProps({
    page,
    perPage,
    isMobile,
    slugs,
    partner,
    facility,
    lat: lat ?? loc?.lat ?? "",
    long: long ?? loc?.long ?? "",
    sort,
    q,
  });

  if (props.notFound || props.gone) {
    res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
    if (props.gone) {
      res.statusCode = 410;
    } else {
      return { notFound: true };
    }
  } else if (!loc?.lat && !loc?.long) {
    res.setHeader(
      "Cache-Control",
      `s-maxage=${30 * 60}, stale-while-revalidate`
    );
  }
  return {
    props,
  };
};

export default function HealthCareFacilitiesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile, gone } = props;
  if (gone) {
    return <NotFoundPage />;
  }
  return <HealthCareFacilityList isMobile={isMobile} />;
}
