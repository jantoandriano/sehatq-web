import { isMobileDevice } from "@sehatq/utils";
import { GetServerSideProps } from "next";
import React from "react";
import { InferGetServerSidePropsType } from "next/types";
import { getHealthToolsProps } from "@get-props";
import { HealthToolLanding } from "@components/pages/health-tool";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getHealthToolsProps({ isMobile }),
  };
};

export default function HealthToolRecordListPage({
  isMobile,
}: InferGetServerSidePropsType<typeof getHealthToolsProps>) {
  return <HealthToolLanding isMobile={isMobile} />;
}
