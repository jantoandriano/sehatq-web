import React from "react";
import { PopularForumsDesktop } from "./popular-forums-desktop";
import { PopularForumsMobile } from "./popular-forums-mobile";
import { useGetForums, ForumsCache } from "./forum-queries";

function selectPopularForums(cache: ForumsCache) {
  return cache.data;
}

export type PopularForumsProps = {
  isMobile?: boolean;
};

export function PopularForums(props: PopularForumsProps) {
  const { isMobile } = props;

  const {
    data: forums = [],
    isLoading,
    error,
  } = useGetForums(
    {
      page: "1",
      perPage: "5",
      sortBy: "popular",
      categoryId: "",
      query: "",
      answered: "",
    },
    { select: selectPopularForums }
  );

  const basicProps = {
    forums,
    isLoading: isLoading && !error,
    error,
  };

  if (isMobile) {
    return <PopularForumsMobile {...basicProps} />;
  }
  return <PopularForumsDesktop {...basicProps} />;
}
