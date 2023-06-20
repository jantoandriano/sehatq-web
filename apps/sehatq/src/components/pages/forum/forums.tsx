import { useRouter } from "next/router";
import React from "react";
import { ForumsDesktop } from "./forums-desktop";
import { ForumsMobile } from "./forums-mobile";

export type ForumsProps = {
  isMobile: boolean;
};

export function Forums(props: ForumsProps) {
  const router = useRouter();
  const { slugs = [], page, perPage, sort, q } = router.query;
  const { isMobile } = props;

  const [categorySlug] = slugs as string[];

  const forumsQuery = {
    page: page ? Number(page) : 1,
    perPage: perPage ? Number(perPage) : 10,
    sortBy: (sort as string) || "newest",
    categorySlug: categorySlug ?? "",
    query: q ? `${q}` : "",
    answered: true,
  };

  const otherProps = {
    ...props,
    ...forumsQuery,
  };

  if (isMobile) {
    return <ForumsMobile {...otherProps} />;
  }

  return <ForumsDesktop {...otherProps} />;
}
