import React, { ReactElement } from "react";
import { AdSlot } from "../google-publisher-tag";
import {
  ForumListDesktop,
  ForumListSkeletonDesktop,
} from "./forum-list-desktop";
import { ForumListMobile, ForumListSkeletonMobile } from "./forum-list-mobile";
import { EmptyForumList } from "./empty-forum-list";
import { useGetForums, ForumsCache } from "./forum-queries";

export type ForumListProps = {
  isMobile: boolean;
  page?: number;
  perPage?: number;
  categorySlug?: string;
  sortBy?: string;
  query?: string;
  adsTop?: ReturnType<typeof AdSlot>;
  adsMiddle?: ReturnType<typeof AdSlot>;
  popularForumsMiddle?: ReactElement;
  answered?: boolean;
};

function selectData(forumList: ForumsCache) {
  return forumList;
}

export function ForumList(props: ForumListProps) {
  const {
    isMobile,
    page,
    perPage,
    categorySlug,
    sortBy,
    query,
    adsTop,
    adsMiddle,
    popularForumsMiddle,
    answered,
  } = props;

  const forumsQuery = {
    page: page ? `${page}` : "1",
    perPage: perPage ? `${perPage}` : "10",
    categoryId: categorySlug ?? "",
    sortBy: sortBy ?? "",
    query: query ?? "",
    answered: `${answered ?? ""}`,
  };

  const {
    data: forums,
    isLoading,
    error,
  } = useGetForums(forumsQuery, {
    select: selectData,
  });

  const otherProps = {
    forums: error ? [] : forums?.data ?? [],
    page: forumsQuery.page,
    maxPage: `${forums?.meta?.pagination.maxPage}` ?? "1",
    adsTop,
    adsMiddle,
  };

  if (isLoading) {
    if (isMobile) return <ForumListSkeletonMobile />;
    return <ForumListSkeletonDesktop />;
  }

  if (!forums || forums?.data.length == 0) {
    return <EmptyForumList searchQuery={query} isMobile={isMobile} />;
  }

  if (isMobile) {
    return (
      <ForumListMobile
        {...otherProps}
        popularForumsMiddle={popularForumsMiddle}
      />
    );
  }

  return <ForumListDesktop {...otherProps} />;
}
