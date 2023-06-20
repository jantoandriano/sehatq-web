import { rest } from "msw";
import { ENV } from "@sehatq/constants";
import { faker } from "@faker-js/faker/locale/id_ID";
import { hashStringToNumber, urlSearchParamsToQuery } from "@sehatq/utils";
import { Query } from "@sehatq/types";
import { PartialDeep } from "type-fest";
import deepmerge from "deepmerge";
import { HealthToolScoreListResponse } from "../health-tools-model";

export function generateFakeHealthScoreList(
  query: Query,
  previewData?: PartialDeep<HealthToolScoreListResponse>
) {
  const page = query.page ? +query.page : 1;
  const total = previewData?.meta?.pagination?.total ?? 10;
  const perPage = 10;
  const maxPage: number = Math.ceil(total / perPage);
  const htrTypes: Array<"Native" | "Typeform"> = ["Native", "Typeform"];
  const pagination = {
    page,
    perPage,
    maxPage,
    total,
  };
  const seedKey = hashStringToNumber(JSON.stringify(query));
  faker.seed(seedKey);
  const name = previewData?.meta?.healthTool?.name ?? faker.random.words(5);
  const dataLength = page >= maxPage ? total - (page - 1) * perPage : perPage;

  const fakeResponse = {
    data: Array.from(Array(dataLength).keys()).map(() => {
      return {
        id: faker.datatype.number({ max: 1e5 }),
        healthToolId: faker.datatype.number({ max: 1e5 }),
        healthToolName: name,
        score: faker.datatype.number({ max: 1e5 }),
        diagnosisName: faker.lorem.lines(1),
        diagnosisTitle: faker.lorem.lines(1),
        description: faker.lorem.paragraph(1),
        descriptionColor: faker.color.rgb({ prefix: "" }),
        createdAt: "2022-12-02 18:06:35",
      };
    }),
    meta: {
      pagination,
      healthTool: {
        id: 76,
        formCode: null,
        name,
        slug: faker.helpers.slugify(name),
        title: faker.lorem.lines(1),
        description: faker.lorem.paragraph(5),
        iconUrl: faker.image.avatar(),
        type: htrTypes[Math.floor(Math.random() * htrTypes.length)],
      },
      filters: {
        dateRange: [
          {
            label: "1 bulan terakhir",
            value: "last_months",
          },
          {
            label: "3 bulan terakhir",
            value: "last_three_months",
          },
          {
            label: "6 bulan terakhir",
            value: "last_six_months",
          },
        ],
      },
    },
  };
  return previewData
    ? (deepmerge(fakeResponse, previewData) as HealthToolScoreListResponse)
    : fakeResponse;
}
export const getHealthScoreList = (
  previewData?: PartialDeep<HealthToolScoreListResponse>
) =>
  rest.get<never, never, HealthToolScoreListResponse>(
    `${ENV.API}/healthtools-service/sehatq/health-tools/:htSlug/health-records`,
    (req, res, ctx) => {
      const query = urlSearchParamsToQuery(req.url.searchParams);
      return res(
        ctx.status(200),
        ctx.json(generateFakeHealthScoreList(query, previewData))
      );
    }
  );
