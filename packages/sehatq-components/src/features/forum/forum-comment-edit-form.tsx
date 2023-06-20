import React, { useReducer } from "react";
import { useDisclosure } from "../../user-interfaces";
import { ForumCommentEditFormDesktop } from "./forum-comment-edit-form-desktop";
import { ForumCommentEditFormMobile } from "./forum-comment-edit-form-mobile";
import { useEditForumComment } from "./forum-comment-actions-queries";
import {
  Fields,
  forumCommentFormReducer,
  initialForumCommentFormState,
} from "./forum-comment-form-reducer";

export type ForumCommentEditFormProps = {
  isMobile?: boolean;
  forumId: number;
  comment: string;
  commentId: number;
};

export function ForumCommentEditForm(props: ForumCommentEditFormProps) {
  const { isMobile, forumId, comment, commentId } = props;
  const [stateForm, dispatchStateForm] = useReducer(forumCommentFormReducer, {
    ...initialForumCommentFormState,
    values: {
      ...initialForumCommentFormState.values,
      comment,
    },
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    mutate: editForumComment,
    isLoading,
    isSuccess,
    reset,
  } = useEditForumComment();

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
    editForumComment({
      comment: stateForm.values.comment,
      forumId,
      commentId,
    });
  }

  const otherProps = {
    isOpen,
    onOpen,
    onSubmit,
    onChange,
    isLoading,
    isSuccess,
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
    return <ForumCommentEditFormMobile {...otherProps} />;
  }
  return <ForumCommentEditFormDesktop {...otherProps} />;
}
