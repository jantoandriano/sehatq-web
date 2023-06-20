import { dehydrate, QueryClient } from "react-query";
import {
  articleKeys,
  getArticles,
  diseaseKeys,
  getDiseases,
  MedicalProcedureKeys,
  getMedicalProcedures,
  ReviewKeys,
  getReviews,
  getReviewsFeatured,
  tagSEOKeys,
  getTagSEO,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type TagParams = {
  tagSlug: string;
};

export async function getTagProps(arg: TagParams & { isMobile: boolean }) {
  const { isMobile, tagSlug } = arg;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();

  let error = null;

  try {
    const TagQuery = {
      tagSlug,
    };

    const generalQuery = {
      tagSlug,
      page: "1",
      perPage: "3",
      categoryId: "",
      categorySlug: "",
    };

    const MedicalProcedureQuery = {
      tagSlug,
      page: "1",
      perPage: "4",
    };

    if (TagQuery.tagSlug) {
      await Promise.all([
        queryClient.prefetchQuery(
          tagSEOKeys.seo(TagQuery),
          async () =>
            await getTagSEO({
              fetch,
              query: TagQuery,
            })
        ),
        queryClient.prefetchQuery(
          articleKeys.list(generalQuery),
          async () =>
            await getArticles({
              fetch,
              query: generalQuery,
            })
        ),
        queryClient.prefetchQuery(
          diseaseKeys.list(generalQuery),
          async () =>
            await getDiseases({
              fetch,
              query: generalQuery,
            })
        ),
        queryClient.prefetchQuery(
          MedicalProcedureKeys.list(MedicalProcedureQuery),
          async () =>
            await getMedicalProcedures({
              fetch,
              query: MedicalProcedureQuery,
            })
        ),
        queryClient.prefetchQuery(
          ReviewKeys.list(generalQuery),
          async () =>
            await getReviews({
              fetch,
              query: generalQuery,
            })
        ),
        queryClient.prefetchQuery(
          ReviewKeys.featured(),
          async () =>
            await getReviewsFeatured({
              fetch,
              query: {},
            })
        ),
      ]);
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
