import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { isMobileDevice, AwaitedReturn } from "@sehatq/utils";
import { InsiderObjectPage } from "@sehatq/components";
import { getArticlesProps, ArticlesParams, ArticlesQuery } from "@get-props";
import { ArticleListPage } from "@components/pages/article";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getArticlesProps>,
  ArticlesParams
> = async ({ params, query, req, res }) => {
  const { slugs = [] } = params ?? {};
  const { page, perPage } = query as ArticlesQuery;
  const isMobile = isMobileDevice(req.headers["user-agent"]);

  const props = await getArticlesProps({
    page,
    perPage,
    slugs,
    isMobile,
  });
  res.setHeader("Cache-Control", `s-maxage=${30 * 60}, stale-while-revalidate`);
  return {
    props,
  };
};

export default function ArticlesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return (
    <>
      <InsiderObjectPage type="ARTICLES" />
      <ArticleListPage isMobile={isMobile} />
    </>
  );
}
