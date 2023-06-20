import { ENV } from "@sehatq/constants";
import {
  AwaitedReturn,
  cleanQuery,
  createBrowserFetch,
  FetchError,
  queryToString,
} from "@sehatq/utils";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { FetcherArgs } from "../../types";
import { useToast } from "../../user-interfaces";
import {
  ForumCommentInputResponse,
  ForumCommentsResponse,
  modelForumComments,
  modelMetaForumComments,
} from "./forum-comment-model";

export type SubmitForumCommentVariables = {
  comment: string;
  forumId: string;
};

export async function submitForumComment(
  variables: SubmitForumCommentVariables
) {
  const fetch = createBrowserFetch();
  const response = await fetch.post<ForumCommentInputResponse>(
    `${ENV.API}/content/forums/${variables.forumId}/comments`,
    { comment: variables.comment }
  );

  return {
    message: response.meta.message,
  };
}

type SubmitForumCommentReturn = AwaitedReturn<typeof submitForumComment>;
export function useSubmitForumComment() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<
    SubmitForumCommentReturn,
    FetchError,
    SubmitForumCommentVariables
  >(submitForumComment, {
    onError: ({ message }) => {
      toast({
        message,
        status: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(forumCommentsKeys.all);
    },
  });
}

type ForumCommentsQuery = {
  forumId: string;
  page: string;
  perPage: string;
};

export const forumCommentsKeys = {
  all: ["FORUM_COMMENTS"],
  lists: () => [...forumCommentsKeys.all, "LISTS"],
  list: (query: ForumCommentsQuery) => [
    ...forumCommentsKeys.lists(),
    cleanQuery(query),
  ],
};

export async function getForumComments({
  fetch,
  query,
}: FetcherArgs<ForumCommentsQuery>) {
  const queryString = queryToString({
    page: query.page,
    perPage: query.perPage,
  });
  const result = await fetch.get<ForumCommentsResponse>(
    `${ENV.API}/content/forums/${query.forumId}/comments${queryString}`
  );
  return {
    data: modelForumComments(result.data),
    meta: modelMetaForumComments(result.meta),
  };
}

export type ForumCommentsCache = AwaitedReturn<typeof getForumComments>;

export function useGetForumComments<TData = ForumCommentsCache>(
  query: ForumCommentsQuery,
  options?: UseQueryOptions<ForumCommentsCache, FetchError, TData>
) {
  return useQuery<ForumCommentsCache, FetchError, TData>(
    forumCommentsKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getForumComments({ fetch, query });
    },
    options
  );
}
