import React, { useReducer } from "react";
import { useDisclosure } from "../../user-interfaces";
import { ForumCommentReplyFormDesktop } from "./forum-comment-reply-form-desktop";
import { ForumCommentReplyFormMobile } from "./forum-comment-reply-form-mobile";
import { useReplyForumComment } from "./forum-comment-actions-queries";
import {
  Fields,
  forumCommentFormReducer,
  initialForumCommentFormState,
} from "./forum-comment-form-reducer";

export type ForumCommentReplyFormProps = {
  isMobile?: boolean;
  forumId: number;
  commentId: number;
  commentBy: string;
};

export function ForumCommentReplyForm(props: ForumCommentReplyFormProps) {
  const { isMobile, commentBy, forumId, commentId } = props;
  const [stateForm, dispatchStateForm] = useReducer(
    forumCommentFormReducer,
    initialForumCommentFormState
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    mutate: replyForumComment,
    isLoading,
    isSuccess,
    reset,
  } = useReplyForumComment();

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatchStateForm({
      type: "change-field",
      name: e.target.name as keyof Fields,
      value: e.target.value,
      isEnableValidate: true,
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    replyForumComment(
      {
        comment: stateForm.values.comment,
        commentId,
        forumId,
      },
      {
        onSuccess: () => {
          dispatchStateForm({
            type: "change-field",
            name: "comment",
            value: "",
          });
        },
      }
    );
  }

  const otherProps = {
    isOpen,
    onOpen,
    onSubmit,
    onChange,
    isLoading,
    isSuccess,
    commentBy,
    onClose: () => {
      reset();
      onClose();
    },
    values: stateForm.values,
    errors: stateForm.errors,
    disableSubmit: Boolean(
      !stateForm.values.comment || stateForm.errors.comment
    ),
  };

  if (isMobile) {
    return <ForumCommentReplyFormMobile {...otherProps} />;
  }
  return <ForumCommentReplyFormDesktop {...otherProps} />;
}
