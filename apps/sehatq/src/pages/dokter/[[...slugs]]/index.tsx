import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import {
  isMobileDevice,
  getLocationFromNode,
  AwaitedReturn,
} from "@sehatq/utils";
import { getHCPProps, HCPParams, HCPQuery } from "@get-props";
import { HealthCareProfessionals } from "@components/pages/health-care-professional";

const NotFoundPage = dynamic(() => import("../../404"), {
  ssr: false,
});

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getHCPProps>,
  HCPParams
> = async ({ params, query, req, res }) => {
  const { slugs = [] } = params ?? {};
  const { page, perPage, gender, schedule, lat, long, sort, q, hcfId } =
    query as HCPQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const loc = getLocationFromNode(cookie ?? "");
  const props = await getHCPProps({
    page,
    perPage,
    isMobile,
    slugs,
    gender,
    schedule,
    lat: lat ?? loc?.lat ?? "",
    long: long ?? loc?.long ?? "",
    sort,
    q,
    hcfId,
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

export default function HealthCareProfessionalsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile, gone } = props;
  if (gone) {
    return <NotFoundPage />;
  }
  return <HealthCareProfessionals isMobile={isMobile} />;
}
