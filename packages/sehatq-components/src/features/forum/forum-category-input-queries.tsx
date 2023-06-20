import { useQuery, UseQueryOptions } from "react-query";
import { createBrowserFetch, FetchError } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { OptionalFetcherArgs } from "../../types";
import {
  ForumCategoryInputResponse,
  modelForumCategoryInput,
} from "./forum-category-input-model";

export const forumCategoryInputKeys = {
  all: ["FORUM_CATEGORY_INPUT"],
  lists: () => [...forumCategoryInputKeys.all, "LISTS"],
  list: () => [...forumCategoryInputKeys.lists()],
};

export async function getForumCategoryInput({ fetch }: OptionalFetcherArgs) {
  const result = await fetch.get<ForumCategoryInputResponse>(
    `${ENV.API}/content-service/sehatq/forum-categories`
  );
  return { data: modelForumCategoryInput(result.data) };
}

export type ForumCategoryInputCache = Awaited<
  ReturnType<typeof getForumCategoryInput>
>;

export function useGetForumCategoryInput<TData = ForumCategoryInputCache>(
  options?: UseQueryOptions<ForumCategoryInputCache, FetchError, TData>
) {
  return useQuery<ForumCategoryInputCache, FetchError, TData>(
    forumCategoryInputKeys.lists(),
    async () => {
      const fetch = createBrowserFetch();
      return getForumCategoryInput({ fetch });
    },
    options
  );
}
