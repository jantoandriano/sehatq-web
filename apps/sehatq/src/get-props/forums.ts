import { dehydrate, QueryClient } from "react-query";
import { createNodeFetch, nullify } from "@sehatq/utils";
import { forumKeys, getForums } from "@sehatq/components";

export type ForumsQuery = {
  page: string;
  perPage: string;
  sort: string;
  q: string;
};

export type ForumsParams = {
  slugs: string[];
};

export async function getForumsProps(
  arg: ForumsParams & { isMobile: boolean } & ForumsQuery
) {
  const { isMobile, slugs, page, perPage, sort, q } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;
  const [categorySlug] = slugs;

  try {
    const forumsQuery = {
      page: page ? `${page}` : "1",
      perPage: perPage ? `${perPage}` : "10",
      categoryId: categorySlug ?? "",
      sortBy: sort || "newest",
      query: q ? `${q}` : "",
      answered: "true",
    };

    const popularQuery = {
      page: "1",
      perPage: "5",
      categoryId: "",
      sortBy: "popular",
      query: "",
      answered: "",
    };

    const forumsCategoryQuery = {
      page: "1",
      perPage: "1",
      categoryId: "",
      sortBy: "",
      query: "",
      answered: "",
    };

    const responses = await Promise.all([
      queryClient.fetchQuery(
        forumKeys.list(forumsQuery),
        async () =>
          await getForums({
            fetch,
            query: forumsQuery,
          })
      ),
      queryClient.prefetchQuery(
        forumKeys.list(popularQuery),
        async () =>
          await getForums({
            fetch,
            query: popularQuery,
          })
      ),
      queryClient.prefetchQuery(
        forumKeys.categoryFilter(forumsCategoryQuery),
        async () =>
          await getForums({
            fetch,
            query: forumsCategoryQuery,
          })
      ),
    ]);

    const forumsResponse = responses[0];

    if (!forumsResponse?.data.length) {
      error = true;
    }
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
