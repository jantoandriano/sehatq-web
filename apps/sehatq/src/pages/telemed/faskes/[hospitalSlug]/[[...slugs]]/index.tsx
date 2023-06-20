import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  AwaitedReturn,
  getLocationFromNode,
  isMobileDevice,
} from "@sehatq/utils";
import {
  getTelemedicineHospitalProps,
  TelemedicineHospitalParams,
  TelemedicineHospitalQuery,
} from "@get-props";
import { TelemedicineHospitalPage } from "@components/pages/telemedicine";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTelemedicineHospitalProps>,
  TelemedicineHospitalParams
> = async ({ params, query, req, res }) => {
  const { hospitalSlug = "", slugs = [] } = params ?? {};
  if (slugs.length > 1) {
    return { notFound: true };
  }
  const {
    page,
    perPage,
    sort,
    q,
    city,
    doctorExperience,
    gender,
    price,
    lat,
    long,
    campaignSlug,
  } = query as TelemedicineHospitalQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const cookie = req.headers["cookie"];
  const loc = getLocationFromNode(cookie ?? "");
  const props = await getTelemedicineHospitalProps({
    page,
    perPage,
    isMobile,
    hospitalSlug,
    sort,
    q,
    lat: lat ?? loc?.lat ?? "",
    long: long ?? loc?.long ?? "",
    slugs,
    city,
    doctorExperience,
    gender,
    price,
    campaignSlug,
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

export default function TelemedHospitalPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <TelemedicineHospitalPage isMobile={isMobile} />;
}
