import { rest } from "msw";
import { ENV } from "@sehatq/constants";
import { faker } from "@faker-js/faker/locale/id_ID";
import { hashStringToNumber } from "@sehatq/utils";
import { HealthToolRecordDetailResponse } from "../health-tool-model";

export function generateFakeHealthToolScoreDetail(
  query: Record<string, string>
) {
  const seedKey = hashStringToNumber(JSON.stringify(query));
  faker.seed(seedKey);

  const healthToolName = faker.lorem.sentence(3);
  return {
    data: {
      id: faker.datatype.number({ max: 1e3 }),
      healthToolName,
      iconUrl: faker.image.abstract(),
      diagnosisTitle: faker.lorem.sentence(3),
      descriptionColor: faker.color.rgb(),
      diagnosisName: faker.lorem.sentence(3),
      description: faker.lorem.sentence(),
      recommendation:
        "<ul><li>Test 1</li><li>Test 2</li><li>Test 3</li><li>Test 4</li></ul>",
      recommendationSlug: faker.helpers.slugify(healthToolName),
      recommendationButtonText: faker.lorem.sentence(2),
    },
  };
}

export const getHealthToolScoreDetail = rest.get<
  never,
  { healthToolsIdOrSlug: string; id: string },
  HealthToolRecordDetailResponse
>(
  `${ENV.API}/healthtools-service/sehatq/health-tools/:healthToolsIdOrSlug/health-records/:id`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(generateFakeHealthToolScoreDetail(req.params))
    );
  }
);
