import React from "react";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { AwaitedReturn } from "@sehatq/utils";
import { ForumParams, getForumProps } from "@get-props";
import { Forum } from "@components/pages/forum";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  AwaitedReturn<typeof getForumProps> | { gone: boolean; isMobile: boolean },
  ForumParams
> = async ({ params }) => {
  const { forumSlug } = params ?? {};
  const props = await getForumProps({
    isMobile: true,
    forumSlug: `${forumSlug}`,
  });

  if (props.error) {
    return { notFound: true, revalidate: 5 * 60 };
  }

  return {
    props,
    revalidate: 60,
  };
};

export default function ForumPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { isMobile } = props;
  return <Forum isMobile={isMobile} />;
}
