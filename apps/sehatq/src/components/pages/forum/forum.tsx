import { ForumCache, useGetForum, ForumTag } from "@sehatq/components";
import { useRouter } from "next/router";
import React from "react";
import { ForumDesktop } from "./forum-desktop";
import { ForumMobile } from "./forum-mobile";

export type ForumProps = {
  isMobile: boolean;
};

function selectForumData(cache: ForumCache) {
  return cache.data;
}
export function Forum(props: ForumProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { forumSlug, page, perPage } = router.query;

  const { data: forum } = useGetForum(
    { forumSlug: `${forumSlug}` },
    { select: selectForumData }
  );

  const otherProps = {
    isMobile,
    forumSlug: forumSlug as string,
    forumId: forum?.id as number,
    commentPage: page ? Number(`${page}`) : 1,
    commentPerPage: perPage ? Number(`${perPage}`) : 5,
    isAnswer: forum?.answer ? true : false,
    tagId: forum?.tags?.map((tag: ForumTag) => tag.id).join(",") ?? "",
  };

  if (isMobile) {
    return <ForumMobile {...otherProps} />;
  }
  return <ForumDesktop {...otherProps} />;
}
