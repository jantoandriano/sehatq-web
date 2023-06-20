import React, { useState } from "react";
import { VStack } from "../../user-interfaces";
import { useGetProfile, ProfileCache } from "../profile/profile-queries";
import { ForumCommentListDesktop } from "./forum-comment-list-desktop";
import { ForumCommentListMobile } from "./forum-comment-list-mobile";
import {
  ForumCommentsCache,
  useGetForumComments,
} from "./forum-comment-queries";
import { ForumCommentSkeleton } from "./forum-comment";

export type ForumCommentListProps = {
  isMobile: boolean;
  forumId: number;
  page: number;
  perPage: number;
};

function selectComments(comments: ForumCommentsCache) {
  return comments;
}

function selectIsDoctorCommenter(cache: ProfileCache) {
  return cache.isDoctorCommenter;
}

export function ForumCommentList(props: ForumCommentListProps) {
  const { isMobile, forumId, page, perPage } = props;
  const [activeReplyComment, setActiveReply] = useState<
    { commentId: number; commentBy: string } | undefined
  >();

  const { data: isShowActions = false } = useGetProfile({
    select: selectIsDoctorCommenter,
  });

  const { data: comments, isLoading } = useGetForumComments(
    { forumId: `${forumId}`, page: `${page}`, perPage: `${perPage}` },
    { select: selectComments }
  );

  function onClickReply(data: { commentId: number; createdBy: string }) {
    setActiveReply({ commentId: data.commentId, commentBy: data.createdBy });
  }
  function onCloseForm() {
    setActiveReply(undefined);
  }

  if (isLoading) {
    return (
      <VStack spacing={4} width="full" alignItems="stretch">
        {Array.from(Array(5).keys()).map((index) => (
          <ForumCommentSkeleton key={index} isMobile={isMobile} />
        ))}
      </VStack>
    );
  }

  const otherProps = {
    data: comments?.data ?? [],
    forumId,
    page,
    maxPage:
      comments?.meta.maxPage ?? Math.ceil((comments?.meta.total ?? 1) / 5),
    onClickReply,
    activeReplyComment,
    onCloseForm,
    isShowActions,
  };

  if (isMobile) {
    return <ForumCommentListMobile {...otherProps} />;
  }
  return <ForumCommentListDesktop {...otherProps} />;
}
