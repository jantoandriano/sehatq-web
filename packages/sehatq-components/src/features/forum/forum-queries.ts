import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import {
  createBrowserFetch,
  FetchError,
  AwaitedReturn,
  cleanQuery,
  queryToString,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { FetcherArgs } from "../../types";
import { useToast } from "../../user-interfaces";
import { modelForum, ForumResponse, ForumInputResponse } from "./forum-models";
import { modelForums, modelMetaForums, ForumsResponse } from "./forums-models";

type ForumsQuery = {
  sortBy: string;
  page: string;
  perPage: string;
  categoryId: string;
  query: string;
  answered: string;
};

type ForumQuery = {
  forumSlug: string;
};

export const forumKeys = {
  all: ["FORUMS"],
  details: () => [...forumKeys.all, "DETAIL"],
  detail: (query: ForumQuery) => [...forumKeys.details(), cleanQuery(query)],
  lists: () => [...forumKeys.all, "LISTS"],
  list: (query: ForumsQuery) => [...forumKeys.lists(), cleanQuery(query)],
  categoryFilters: () => [...forumKeys.all, "CATEGORY_FILTERS"],
  categoryFilter: (query: ForumsQuery) => [
    ...forumKeys.categoryFilters(),
    cleanQuery(query),
  ],
};

export async function getForum({ fetch, query }: FetcherArgs<ForumQuery>) {
  const result = await fetch.get<ForumResponse>(
    `${ENV.API}/content/forums/${query.forumSlug}`
  );
  return {
    data: modelForum(result.data),
  };
}

export type ForumCache = Awaited<ReturnType<typeof getForum>>;

export function useGetForum<TData = ForumCache>(
  query: ForumQuery,
  options?: UseQueryOptions<ForumCache, FetchError, TData>
) {
  return useQuery<ForumCache, FetchError, TData>(
    forumKeys.detail(query),
    async () => {
      const fetch = createBrowserFetch();
      return getForum({ fetch, query });
    },
    options
  );
}

export async function getForums({ fetch, query }: FetcherArgs<ForumsQuery>) {
  const queryString = queryToString({
    ...query,
  });
  const result = await fetch.get<ForumsResponse>(
    `${ENV.API}/content/forums${queryString}`
  );
  return {
    data: modelForums(result.data),
    meta: modelMetaForums(result.meta),
  };
}

export type ForumsCache = AwaitedReturn<typeof getForums>;

export function useGetForums<TData = ForumsCache>(
  query: ForumsQuery,
  options?: UseQueryOptions<ForumsCache, FetchError, TData>
) {
  return useQuery<ForumsCache, FetchError, TData>(
    forumKeys.list(query),
    async () => {
      const fetch = createBrowserFetch();
      return getForums({ fetch, query });
    },
    options
  );
}

export function useGetForumCategoryFilters<TData = ForumsCache>(
  query: ForumsQuery,
  options?: UseQueryOptions<ForumsCache, FetchError, TData>
) {
  return useQuery<ForumsCache, FetchError, TData>(
    forumKeys.categoryFilter(query),
    async () => {
      const fetch = createBrowserFetch();
      return getForums({ fetch, query });
    },
    options
  );
}

export type SubmitForumVariables = {
  title: string;
  categoryId: number;
  question: string;
};

export async function submitForum(variables: SubmitForumVariables) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<ForumInputResponse>(
    `${ENV.API}/content/forums`,
    { ...variables },
    { headers: { "Accept-Version": "v2" } }
  );
  return {
    message: response.meta.message,
  };
}

type SubmitForumReturn = AwaitedReturn<typeof submitForum>;

export function useSubmitForum() {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation<SubmitForumReturn, FetchError, SubmitForumVariables>(
    submitForum,
    {
      onError: ({ message }) => {
        toast({
          message,
          status: "error",
        });
      },
      onSuccess: (data) => {
        toast({
          message: data.message,
          status: "success",
        });
        queryClient.invalidateQueries(forumKeys.all);
      },
    }
  );
}

export type MarkForumAsSpamVariables = {
  forumId: number;
};

export async function markForumAsSpam(variables: MarkForumAsSpamVariables) {
  const fetch = createBrowserFetch();

  const response = await fetch.post<{
    meta: {
      message: string;
    };
  }>(`${ENV.API}/content/report-spam`, {
    type: "forum",
    id: variables.forumId,
  });
  return {
    message: response.meta?.message,
  };
}

type MarkForumAsSpamReturn = AwaitedReturn<typeof markForumAsSpam>;

export function useMarkForumAsSpam() {
  return useMutation<
    MarkForumAsSpamReturn,
    FetchError,
    MarkForumAsSpamVariables
  >(markForumAsSpam, {});
}
