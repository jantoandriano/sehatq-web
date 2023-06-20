import React from "react";
import { useQueryClient } from "react-query";
import { useDisclosure } from "../../user-interfaces";
import { DeleteForumCommentDesktop } from "./delete-forum-comment-desktop";
import { DeleteForumCommentMobile } from "./delete-forum-comment-mobile";
import { forumCommentsKeys } from "./forum-comment-queries";
import { useDeleteForumComment } from "./forum-comment-actions-queries";

export type DeleteForumCommentProps = {
  isMobile?: boolean;
  forumId: number;
  commentId: number;
};

export function DeleteForumComment(props: DeleteForumCommentProps) {
  const { isMobile, forumId, commentId } = props;
  const { mutate: deleteForum, isLoading, isSuccess } = useDeleteForumComment();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();

  function onDeleteForum() {
    deleteForum({
      forumId,
      commentId,
    });
  }

  const otherProps = {
    onDeleteForum,
    isLoading,
    isSuccess,
    isOpen,
    onOpen,
    onClose: () => {
      if (isSuccess) {
        queryClient.invalidateQueries(forumCommentsKeys.lists());
      }
      onClose();
    },
  };

  if (isMobile) return <DeleteForumCommentMobile {...otherProps} />;

  return <DeleteForumCommentDesktop {...otherProps} />;
}
