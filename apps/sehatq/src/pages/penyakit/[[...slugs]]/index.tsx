import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { DiseaseListPage } from "@components/pages/disease";
import { getDiseasesProps, DiseasesQuery } from "@get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getDiseasesProps>,
  DiseasesQuery
> = async ({ params, req, res }) => {
  const { slugs = [] } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);

  const props = await getDiseasesProps({
    slugs,
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

export default function DiseasesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <DiseaseListPage isMobile={isMobile} />
    </>
  );
}
