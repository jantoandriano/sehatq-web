import React from "react";
import { Flex, Spacer, Box } from "../../user-interfaces";
import { ForumCommentReplyForm } from "./forum-comment-reply-form";
import { ForumCommentEditForm } from "./forum-comment-edit-form";
import { DeleteForumComment } from "./delete-forum-comment";

export type ForumCommentActionsDesktopProps = {
  forumId: number;
  comment: string;
  commentId: number;
  commentBy: string;
};

export function ForumCommentActionsDesktop(
  props: ForumCommentActionsDesktopProps
) {
  const { forumId, comment, commentId, commentBy } = props;
  return (
    <Flex width="full" alignItems="center">
      <ForumCommentReplyForm
        forumId={forumId}
        commentId={commentId}
        commentBy={commentBy}
      />
      <Spacer />
      <Box marginRight={4}>
        <ForumCommentEditForm
          forumId={forumId}
          comment={comment}
          commentId={commentId}
        />
      </Box>
      <DeleteForumComment forumId={forumId} commentId={commentId} />
    </Flex>
  );
}
