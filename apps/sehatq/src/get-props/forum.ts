import { dehydrate, QueryClient } from "react-query";
import {
  forumKeys,
  forumCommentsKeys,
  getForum,
  getForumComments,
  forumRatingKeys,
  getForumRating,
  ForumTag,
  relatedForumsKeys,
  getRelatedForums,
  relatedArticleKeys,
  getRelatedArticles,
  regularTelemedBannerKeys,
  getRegularTelemedVoucher,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type ForumParams = {
  forumSlug: string;
};

export type ForumCommentQuery = {
  page?: string;
  perPage?: string;
};

export async function getForumProps(
  arg: ForumParams & { isMobile: boolean } & ForumCommentQuery
) {
  const { forumSlug, isMobile, page, perPage } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  const forumQuery = {
    forumSlug,
  };
  let error = null;

  try {
    const forum = await queryClient.fetchQuery(
      forumKeys.detail(forumQuery),
      async () =>
        await getForum({
          fetch,
          query: forumQuery,
        })
    );

    const forumCommentsQuery = {
      forumId: `${forum.data.id}`,
      page: page ?? "1",
      perPage: perPage ?? "5",
    };

    const forumRatingQuery = {
      forumId: `${forum.data.id}`,
    };

    const relatedForumsQuery = {
      tagId: forum?.data.tags?.map((tag: ForumTag) => tag.id).join(","),
    };

    const relatedArticlesQuery = {
      quantity: "3",
      tagId: forum?.data.tags.map((tag: ForumTag) => tag.id).join(","),
      repeater: "1",
    };

    await Promise.all([
      queryClient.prefetchQuery(
        forumCommentsKeys.list(forumCommentsQuery),
        async () =>
          await getForumComments({
            fetch,
            query: forumCommentsQuery,
          })
      ),
      queryClient.prefetchQuery(
        forumRatingKeys.detail(forumRatingQuery),
        async () =>
          await getForumRating({
            fetch,
            query: forumRatingQuery,
          })
      ),
      queryClient.prefetchQuery(
        relatedForumsKeys.list(relatedForumsQuery),
        async () =>
          await getRelatedForums({
            fetch,
            query: relatedForumsQuery,
          })
      ),
      queryClient.prefetchQuery(
        relatedArticleKeys.list(relatedArticlesQuery),
        async () =>
          await getRelatedArticles({
            fetch,
            query: relatedArticlesQuery,
          })
      ),
      queryClient.prefetchQuery(
        regularTelemedBannerKeys.vouchers(),
        async () =>
          await getRegularTelemedVoucher({
            fetch,
          })
      ),
    ]);
  } catch (err) {
    error = err;
  }

  return {
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
    error,
  };
}
