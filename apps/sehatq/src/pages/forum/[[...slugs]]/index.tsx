import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AwaitedReturn, isMobileDevice } from "@sehatq/utils";
import { ForumsParams, ForumsQuery, getForumsProps } from "@get-props";
import { Forums } from "@components/pages/forum";

export const getServerSideProps: GetServerSideProps<
  AwaitedReturn<typeof getForumsProps>,
  ForumsParams
> = async ({ params, query, req, res }) => {
  const { slugs = [] } = params ?? {};
  const { page, perPage, sort, q } = query as ForumsQuery;

  const isMobile = isMobileDevice(req.headers["user-agent"]);
  const props = await getForumsProps({
    page,
    perPage,
    isMobile,
    slugs,
    sort,
    q,
  });

  if (props.error || page === "1" || !page) {
    res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
    if (props.error) {
      return { notFound: true };
    }
  } else {
    res.setHeader(
      "Cache-Control",
      `s-maxage=${30 * 60}, stale-while-revalidate`
    );
  }

  return {
    props,
  };
};

export default function ForumsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isMobile } = props;
  return <Forums isMobile={isMobile} />;
}
