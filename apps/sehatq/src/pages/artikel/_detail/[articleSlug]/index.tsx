import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { Article } from "@components/pages/article";
import { getArticleProps, ArticleParams } from "@get-props";
import { redisClient, generateRedirectKey } from "@libs/redis";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getArticleProps>,
  ArticleParams
> = async ({ params, req, res }) => {
  const { articleSlug = "" } = params ?? {};
  const redisKey = generateRedirectKey({
    entity: "article",
    nameOfData: articleSlug,
    platform: "web",
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
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getArticleProps({
    isMobile,
    articleSlug,
  });

  if (props.error) {
    res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
    return { notFound: true };
  }

  res.setHeader("Cache-Control", `s-maxage=31536000, stale-while-revalidate`);
  return {
    props,
  };
};

export default function ArticlePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <Article isMobile={props.isMobile} />;
}
