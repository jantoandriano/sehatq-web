import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { AwaitedReturn } from "@sehatq/utils";
import { getHCPDetailProps, HCPDetailPageParams } from "@get-props";
import { HealthCareProfessional } from "@components/pages/health-care-professional";
import { redisClient, generateRedirectKey } from "@libs/redis";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  AwaitedReturn<typeof getHCPDetailProps>,
  HCPDetailPageParams
> = async ({ params }) => {
  const { hcpSlug = "" } = params ?? {};

  const redisKey = generateRedirectKey({
    entity: "hcp",
    nameOfData: hcpSlug,
    platform: "mweb",
  });
  const destination = (await redisClient.get(redisKey))?.trim();
  if (destination) {
    return {
      redirect: {
        permanent: true,
        destination,
      },
    };
  }
  const props = await getHCPDetailProps({
    hcpSlug: `${hcpSlug}`,
    isMobile: true,
  });

  if (props.error) {
    return { notFound: true, revalidate: 5 * 60 };
  }

  return {
    props,
    revalidate: 60,
  };
};

export default function HealthCareProfessionalPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { isMobile } = props;
  return <HealthCareProfessional isMobile={isMobile} />;
}
