import { isMobileDevice } from "@sehatq/utils";
import { GetServerSideProps } from "next";
import React from "react";
import { InferGetServerSidePropsType } from "next/types";
import { useQueryClient } from "react-query";
import {
  healthToolKeys,
  InfiniteHealthToolScoreListCache,
} from "@sehatq/components";
import { getHealthToolScoreListProps } from "@get-props";
import { HealthToolScoreList } from "@components/pages/health-tool";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { userId = "", healthToolSlug = "" } = params ?? {};
  const cookie = req.headers["cookie"];
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  return {
    props: await getHealthToolScoreListProps({
      isMobile,
      userId: userId === "all" ? "" : (userId as string),
      healthToolSlug: healthToolSlug as string,
      cookie,
    }),
  };
};

export default function HealthToolScoreListPage(
  props: InferGetServerSidePropsType<typeof getHealthToolScoreListProps>
) {
  const { isMobile, healthToolScoreListQuery } = props;
  const queryClient = useQueryClient();

  const healthToolScoreCache =
    queryClient.getQueryData<InfiniteHealthToolScoreListCache>(
      healthToolKeys.scoreList(healthToolScoreListQuery)
    );
  const healthTool = healthToolScoreCache?.pages[0].meta.healthTool;
  return <HealthToolScoreList healthTool={healthTool} isMobile={isMobile} />;
}
