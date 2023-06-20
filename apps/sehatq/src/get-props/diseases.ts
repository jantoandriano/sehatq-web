import { dehydrate, QueryClient } from "react-query";
import {
  diseaseListKeys,
  getDiseaseList,
  getDiseaseCategories,
  getDiseaseSEO,
  diseaseKeys,
  diseaseCategoryKeys,
} from "@sehatq/components";
import { createNodeFetch, nullify } from "@sehatq/utils";

export type DiseasesQuery = {
  slugs: string[];
};

export async function getDiseasesProps(
  arg: DiseasesQuery & { isMobile: boolean }
) {
  const { slugs, isMobile } = arg;
  const [firstSlug, secondSlug] = slugs;
  const fetch = createNodeFetch({ isMobile });
  const queryClient = new QueryClient();
  let error = null;

  const categorySlug = firstSlug?.length > 1 ? firstSlug : "";
  const { data = [] } = getDiseaseCategories({ slug: categorySlug });

  const diseasesQuery = {
    categoryId: data?.[0]?.id ? data[0].id.toString() : "",
    firstChar: firstSlug?.length === 1 ? firstSlug : secondSlug ?? "",
    tagSlug: "",
    random: "",
    perPage: "",
    page: "",
  };

  try {
    if (!data.length && secondSlug) {
      throw "Error";
    }
    queryClient.setQueryData(diseaseCategoryKeys.list({ slug: categorySlug }), {
      data,
    });
    await Promise.all([
      queryClient.prefetchQuery(diseaseCategoryKeys.list({ slug: "" }), () =>
        getDiseaseCategories({ slug: "" })
      ),
      queryClient.prefetchQuery(
        diseaseListKeys.list(diseasesQuery),
        async () =>
          await getDiseaseList({
            fetch,
            query: diseasesQuery,
          })
      ),
      categorySlug
        ? queryClient.prefetchQuery(
            diseaseKeys.seo({ slug: categorySlug }),
            async () =>
              await getDiseaseSEO({
                fetch,
                query: { slug: categorySlug },
              })
          )
        : null,
    ]);
  } catch (err) {
    error = err;
  }

  return {
    error,
    dehydratedState: nullify(dehydrate(queryClient)),
    isMobile,
  };
}
