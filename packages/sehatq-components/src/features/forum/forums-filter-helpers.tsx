import { ForumsCategoryData } from "./forums-models";

function sortOptions(
  optionA: ForumsCategoryData,
  optionB: ForumsCategoryData,
  selectedOptionValue?: string
) {
  if (optionA.slug === selectedOptionValue) {
    return -1;
  }
  if (optionB.slug === selectedOptionValue) {
    return 1;
  }
  return optionA.name < optionB.name ? -1 : 1;
}

export function generateFilters(props: {
  categorySlug?: string;
  categoriesOptions: { options?: ForumsCategoryData[]; isLoading: boolean };
}) {
  const { categorySlug, categoriesOptions } = props;

  return {
    selectedValue: categorySlug ?? "",
    ...(categoriesOptions.options &&
      categoriesOptions.options.length > 0 && {
        options: categoriesOptions.options
          .map((dt) => {
            return { ...dt };
          })
          .sort((a, b) => sortOptions(a, b, categorySlug)),
      }),
    isLoading: categoriesOptions.isLoading,
  };
}
