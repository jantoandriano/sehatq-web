import { rest } from "msw";
import { ENV } from "@sehatq/constants";
import { faker } from "@faker-js/faker/locale/id_ID";
import { hashStringToNumber, urlSearchParamsToQuery } from "@sehatq/utils";
import { HealthToolsResponse } from "../health-tools-model";

const perPage = 10;
const total: number = Math.ceil(Math.random() * 100);
const maxPage: number = Math.ceil(total / perPage);
const htrTypes: Array<"Native" | "Typeform"> = ["Native", "Typeform"];
const pagination = {
  page: 1,
  perPage,
  maxPage,
  total,
};

export function generateFakeHealthRecordList(query: Record<string, string>) {
  const seedKey = hashStringToNumber(JSON.stringify(query));
  faker.seed(seedKey);
  return {
    data: Array.from(Array(perPage).keys()).map(() => {
      const name = faker.name.findName();
      return {
        id: faker.datatype.number({ max: 1e5 }),
        name,
        slug: faker.helpers.slugify(name),
        title: faker.lorem.lines(1),
        description: faker.lorem.paragraph(5),
        iconUrl: faker.image.avatar(),
        type: htrTypes[Math.floor(Math.random() * htrTypes.length)],
      };
    }),
    meta: {
      pagination,
    },
  };
}

export const getHealthRecordList = rest.get<never, never, HealthToolsResponse>(
  `${ENV.API}/content-service/sehatq/health-tools`,
  (req, res, ctx) => {
    const query = urlSearchParamsToQuery(req.url.searchParams);

    return res(
      ctx.json(generateFakeHealthRecordList({ ...query, keyword: "" }))
    );
  }
);
