import { rest } from "msw";
import {
  queryToString,
  hashStringToNumber,
  urlSearchParamsToQuery,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { Query } from "@sehatq/types";
import { faker } from "@faker-js/faker/locale/id_ID";
import { TelemedicineSpecialitiesResponse } from "..";

export function generateFakeTelemedicineSpecialitiesResponse(query: Query) {
  const seedKey = hashStringToNumber(queryToString(query));
  faker.seed(seedKey);
  return {
    data: Array.from(Array(13)).map(() => {
      const name = faker.name.jobTitle();
      return {
        name,
        id: faker.datatype.number(),
        slug: faker.helpers.slugify(name),
        iconUrl: faker.image.people(100, 100, true),
      };
    }),
  };
}

export const getTelemedicineSpecialities = rest.get<
  never,
  never,
  TelemedicineSpecialitiesResponse
>(`${ENV.API}/telemed-service/doctor-specialities`, (req, res, ctx) => {
  const query = urlSearchParamsToQuery(req.url.searchParams);
  return res(ctx.json(generateFakeTelemedicineSpecialitiesResponse(query)));
});
