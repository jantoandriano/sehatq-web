import { rest } from "msw";
import deepmerge from "deepmerge";
import { PartialDeep } from "type-fest";
import { queryToString, hashStringToNumber } from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { Query } from "@sehatq/types";
import { faker } from "@faker-js/faker/locale/id_ID";
import { TelemedicineDoctorResponse } from "..";

export function generateFakeTelemedicineHCPResponse(
  query: Query,
  previewData?: PartialDeep<TelemedicineDoctorResponse>
) {
  const seedKey = hashStringToNumber(queryToString(query));
  faker.seed(seedKey);
  const name = faker.name.findName();
  const fakeResponse = {
    data: {
      name,
      id: faker.datatype.number({ max: 9999 }),
      slug: faker.helpers.slugify(name).toLowerCase(),
      title: faker.name.jobTitle(),
      photoUrl: faker.image.people(100, 100, true),
      description: faker.lorem.text(),
      experience: "10 Tahun",
      experienceStartOn: "",
      displayPrice: faker.datatype.number(),
      consultationFee: faker.datatype.number({ min: 100000 }),
      str: faker.datatype.string(),
      sip: faker.datatype.string(),
      education: faker.datatype.string(),
      speciality: {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
      },
      hospital: {
        id: faker.datatype.number(),
        name: faker.company.companyName(),
        logoUrl: faker.image.business(100, 100, true),
        identityNumberRequired: faker.datatype.boolean(),
        addressRequired: faker.datatype.boolean(),
      },
      rating: {
        average: faker.datatype.number({ min: 1, max: 5, precision: 0.01 }),
        count: faker.datatype.number(200),
      },
      indicator: faker.color.human(),
      channels: [],
    },
  };
  return previewData
    ? (deepmerge(fakeResponse, previewData) as TelemedicineDoctorResponse)
    : fakeResponse;
}

export const generateGetTelemedicineHCP = (
  previewData?: PartialDeep<TelemedicineDoctorResponse>
) =>
  rest.get<never, { doctorId: string }, TelemedicineDoctorResponse>(
    `${ENV.API}/telemed-service/doctors/:doctorId`,
    (req, res, ctx) => {
      const doctorId = req.params;
      return res(
        ctx.json(generateFakeTelemedicineHCPResponse(doctorId, previewData))
      );
    }
  );

export const getTelemedicineHCP = generateGetTelemedicineHCP();
