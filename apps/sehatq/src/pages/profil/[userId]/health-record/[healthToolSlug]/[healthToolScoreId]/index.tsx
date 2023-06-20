import React from "react";
import { GetServerSideProps } from "next";
import { isMobileDevice } from "@sehatq/utils";
import { InferGetServerSidePropsType } from "next/types";
import { getHealthToolsRecordDetailProps } from "@get-props";
import { HealthToolScoreDetailPage } from "@components/pages/health-tool/health-tool-score-detail";

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getHealthToolsRecordDetailProps({
      isMobile,
      healthToolsIdOrSlug: `${query.healthToolSlug || ""}`,
      id: `${query.healthToolScoreId || ""}`,
      cookie: req.headers.cookie || "",
    }),
  };
};

export default function HealthToolScorePage({
  isMobile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HealthToolScoreDetailPage isMobile={isMobile} />;
}
