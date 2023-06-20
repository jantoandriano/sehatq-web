import React from "react";
import { Flex, Spacer, Box } from "../../user-interfaces";
import { ForumCommentReplyForm } from "./forum-comment-reply-form";
import { ForumCommentEditForm } from "./forum-comment-edit-form";
import { DeleteForumComment } from "./delete-forum-comment";

export type ForumCommentActionsMobileProps = {
  forumId: number;
  comment: string;
  commentId: number;
  commentBy: string;
};

export function ForumCommentActionsMobile(
  props: ForumCommentActionsMobileProps
) {
  const { forumId, comment, commentId, commentBy } = props;
  return (
    <Flex width="full" alignItems="center">
      <ForumCommentReplyForm
        isMobile
        forumId={forumId}
        commentId={commentId}
        commentBy={commentBy}
      />
      <Spacer />
      <Box marginRight={3}>
        <ForumCommentEditForm
          isMobile
          forumId={forumId}
          comment={comment}
          commentId={commentId}
        />
      </Box>
      <DeleteForumComment isMobile forumId={forumId} commentId={commentId} />
    </Flex>
  );
}
