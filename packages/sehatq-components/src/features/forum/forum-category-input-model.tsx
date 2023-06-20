export interface ForumCategoryInputResponse {
  data: {
    id: number;
    name: string;
    slug: string;
  }[];
}

export function modelForumCategoryInput(
  data: ForumCategoryInputResponse["data"]
) {
  return data.map((category) => ({
    ...category,
    value: category.id,
  }));
}

export type ForumCategoryInputData = ReturnType<
  typeof modelForumCategoryInput
>[0];
