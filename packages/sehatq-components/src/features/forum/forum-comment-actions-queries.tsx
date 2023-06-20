import { ENV } from "@sehatq/constants";
import { AwaitedReturn, createBrowserFetch, FetchError } from "@sehatq/utils";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "../../user-interfaces";
import { forumCommentsKeys } from "./forum-comment-queries";
import {
  ReplyForumCommentResponse,
  EditForumCommentResponse,
} from "./forum-comment-actions-model";

export type ReplyForumCommentVariables = {
  comment: string;
  forumId: number;
  commentId: number;
};

export async function replyForumComment(variables: ReplyForumCommentVariables) {
  const fetch = createBrowserFetch();
  const response = await fetch.post<ReplyForumCommentResponse>(
    `${ENV.API}/content/forums/${variables.forumId}/comments/${variables.commentId}/doctor-reply`,
    { comment: variables.comment }
  );

  return {
    message: response.meta.message,
  };
}

type ReplyForumCommentReturn = AwaitedReturn<typeof replyForumComment>;

export function useReplyForumComment() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    ReplyForumCommentReturn,
    FetchError,
    ReplyForumCommentVariables
  >(replyForumComment, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
        id: "reply-forum-comment",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(forumCommentsKeys.lists());
    },
  });
}

export type EditForumCommentVariables = {
  comment: string;
  forumId: number;
  commentId: number;
};

export async function editForumComment(variables: EditForumCommentVariables) {
  const fetch = createBrowserFetch();
  const response = await fetch.patch<EditForumCommentResponse>(
    `${ENV.API}/content/forums/${variables.forumId}/comments/${variables.commentId}`,
    { comment: variables.comment }
  );

  return {
    message: response.meta.message,
  };
}

type EditForumCommentReturn = AwaitedReturn<typeof editForumComment>;

export function useEditForumComment() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    EditForumCommentReturn,
    FetchError,
    EditForumCommentVariables
  >(editForumComment, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
        id: "edit-forum-comment",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(forumCommentsKeys.lists());
    },
  });
}

export type DeleteForumCommentVariables = {
  forumId: number;
  commentId: number;
};

export async function deleteForumComment(
  variables: DeleteForumCommentVariables
) {
  const fetch = createBrowserFetch();
  const response = await fetch.delete<EditForumCommentResponse>(
    `${ENV.API}/content/forums/${variables.forumId}/comments/${variables.commentId}`
  );

  return {
    message: response.meta.message,
  };
}

type DeleteForumCommentReturn = AwaitedReturn<typeof deleteForumComment>;

export function useDeleteForumComment() {
  const toast = useToast();
  return useMutation<
    DeleteForumCommentReturn,
    FetchError,
    DeleteForumCommentVariables
  >(deleteForumComment, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
        id: "delete-forum-comment",
      });
    },
  });
}
