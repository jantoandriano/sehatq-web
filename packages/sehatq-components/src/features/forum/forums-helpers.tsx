import { ForumsCache, useGetForumCategoryFilters } from "./forum-queries";

function selectCategories(cache: ForumsCache) {
  return cache.meta.categories;
}

export function useGetCategoryData(slug: string) {
  let category = undefined;
  const forumsCategoryQuery = {
    page: "1",
    perPage: "1",
    categoryId: "",
    sortBy: "",
    query: "",
    answered: "",
  };

  const { data: categories } = useGetForumCategoryFilters(forumsCategoryQuery, {
    select: selectCategories,
  });

  if (categories && categories?.length > 0) {
    category = categories.find((category) => category.slug == slug);
  }

  return category;
}
