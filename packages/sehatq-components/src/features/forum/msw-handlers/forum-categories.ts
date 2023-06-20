import { rest } from "msw";
import { ENV } from "@sehatq/constants";
import { faker } from "@faker-js/faker/locale/id_ID";
import { ForumCategoryInputResponse } from "../forum-category-input-model";

export function generateFakeForumCategories() {
  const name = ["Infeksi", "Kandungan", "Pernapasan", "Jantung"];
  return {
    data: Array.from(Array(4).keys()).map((index) => {
      return {
        name: name[index],
        id: index + 1,
        slug: faker.helpers.slugify(name[index]),
      };
    }),
  };
}

export const getForumCategories = rest.get<
  never,
  never,
  ForumCategoryInputResponse
>(`${ENV.API}/content-service/sehatq/forum-categories`, (req, res, ctx) => {
  return res(ctx.json(generateFakeForumCategories()));
});
