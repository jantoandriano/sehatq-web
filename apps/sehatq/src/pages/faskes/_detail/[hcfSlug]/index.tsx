import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { AwaitedReturn } from "@sehatq/utils";
import { getHCFDetailProps, HCFDetailPageParams } from "@get-props";
import { HealthCareFacility } from "@components/pages/health-care-facility";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  AwaitedReturn<typeof getHCFDetailProps>,
  HCFDetailPageParams
> = async ({ params }) => {
  const { hcfSlug = "" } = params ?? {};
  const props = await getHCFDetailProps({
    isMobile: false,
    hcfSlug: `${hcfSlug}`,
  });

  if (props.error) {
    return { notFound: true, revalidate: 5 * 60 };
  }

  return {
    props,
    revalidate: 10 * 60,
  };
};

export default function HealthCareFacilityPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { isMobile } = props;
  return <HealthCareFacility isMobile={isMobile} />;
}
