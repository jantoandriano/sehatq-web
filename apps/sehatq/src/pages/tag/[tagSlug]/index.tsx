import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { TagPage } from "@components/pages/tag";
import { getTagProps, TagParams } from "@get-props";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getTagProps>,
  TagParams
> = async ({ req, params, res }) => {
  const { tagSlug = "" } = params ?? {};
  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getTagProps({
    tagSlug,
    isMobile,
  });

  if (props.error) {
    res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
    return { notFound: true };
  }

  res.setHeader(
    "Cache-Control",
    `s-maxage=${24 * 3600}, stale-while-revalidate`
  );
  return {
    props,
  };
};

export default function TagsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <TagPage isMobile={props.isMobile} />;
}
