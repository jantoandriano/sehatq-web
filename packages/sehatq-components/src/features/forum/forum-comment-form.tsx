import React, { useReducer, useState } from "react";
import { useNavigation } from "@sehatq/utils";
import { useGetProfile } from "../profile";
import { ForumCommentFormDesktop } from "./forum-comment-form-desktop";
import { ForumCommentFormMobile } from "./forum-comment-form-mobile";
import { useSubmitForumComment } from "./forum-comment-queries";
import {
  Fields,
  validateForm,
  forumCommentFormReducer,
  initialForumCommentFormState,
} from "./forum-comment-form-reducer";

export type ForumCommentFormProps =
  | {
      isMobile: false;
      forumId: number;
    }
  | {
      isMobile: true;
      forumId: number;
      textButton?: string;
      widthButton?: string;
    };

export function ForumCommentForm(props: ForumCommentFormProps) {
  const { isMobile, forumId } = props;
  const [submited, setSubmited] = useState(false);
  const [isShowForm, setShowForm] = useState(false);
  const [stateForm, dispatchStateForm] = useReducer(
    forumCommentFormReducer,
    initialForumCommentFormState
  );

  const { navigate } = useNavigation();
  const { isSuccess } = useGetProfile();

  const submitForumComment = useSubmitForumComment();
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSuccess) {
      navigate("EXTERNAL_LOGIN");
      return;
    }

    const errors = validateForm(stateForm.values);
    const hasError = Object.values(errors).some((value) => Boolean(value));
    if (!hasError) {
      submitForumComment.mutate(
        {
          comment: stateForm.values.comment,
          forumId: `${forumId}`,
        },
        {
          onSuccess: () => {
            dispatchStateForm({
              type: "change-field",
              name: "comment",
              value: "",
            });
            setSubmited(true);
          },
        }
      );
    } else {
      dispatchStateForm({
        type: "change-error",
        value: errors,
      });
    }
  }

  function onCloseForm() {
    setSubmited(false);
    setShowForm(false);
  }

  function onClickShowForm() {
    setShowForm(true);
  }

  function onChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatchStateForm({
      type: "change-field",
      name: e.target.name as keyof Fields,
      value: e.target.value,
      isEnableValidate: true,
    });
  }

  const otherProps = {
    onSubmit,
    onCloseForm,
    onChangeInput,
    submited: submited,
    values: stateForm.values,
    errors: stateForm.errors,
    isLoading: submitForumComment.isLoading,
  };

  if (isMobile) {
    const mobileProps = {
      ...otherProps,
      isShowForm,
      onClickShowForm,
      widthButton: props.widthButton,
      textButton: props.textButton ?? "Beri Komentar",
    };
    return <ForumCommentFormMobile {...mobileProps} />;
  }

  return <ForumCommentFormDesktop {...otherProps} />;
}
