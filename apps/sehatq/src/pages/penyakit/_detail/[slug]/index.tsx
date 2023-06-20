import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { Disease } from "@components/pages/disease";
import { getDiseaseProps, DiseaseQuery } from "@get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getDiseaseProps>,
  DiseaseQuery
> = async ({ params, req, res }) => {
  const { slug = "" } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getDiseaseProps({
    slug,
    isMobile,
  });
  if (props.error) {
    return { notFound: true };
  }
  res.setHeader(
    "Cache-Control",
    `s-maxage=${30 * 24 * 60 * 60}, stale-while-revalidate`
  );
  return {
    props,
  };
};

export default function DiseasePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <Disease isMobile={isMobile} />;
}
