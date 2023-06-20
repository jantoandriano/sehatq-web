import { rest } from "msw";
import {
  queryToString,
  hashStringToNumber,
  urlSearchParamsToQuery,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { faker } from "@faker-js/faker/locale/id_ID";
import { TelemedicineDoctorsResponse } from "..";

export function generateFakeTelemedicineDoctorsResponse(seedKey: number) {
  faker.seed(seedKey);
  return {
    data: Array.from(Array(10)).map(() => {
      const name = faker.name.findName();
      return {
        name,
        id: faker.datatype.number(),
        slug: faker.helpers.slugify(name),
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
        indicator: faker.color.human(),
        rating: {
          average: faker.datatype.number({ min: 1, max: 5, precision: 0.01 }),
          count: faker.datatype.number(200),
        },
        channels: Array.from(Array(3).keys()).map(() => ({
          id: faker.datatype.number(),
          name: faker.datatype.string(),
          code: faker.helpers.arrayElement([
            "ConsultationBooking",
            "ConsultationPublic",
            "ConsultationPrivate",
            "ConsultationApp",
          ]) as
            | "ConsultationBooking"
            | "ConsultationPublic"
            | "ConsultationPrivate"
            | "ConsultationApp",
        })),
      };
    }),
    meta: {
      pagination: {
        page: faker.datatype.number(100),
        perPage: 10,
        maxPage: faker.datatype.number(100),
        total: faker.datatype.number(1000),
      },
      sort: faker.random
        .words(3)
        .split(" ")
        .map(() => ({
          id: faker.datatype.string(5),
          name: faker.datatype.string(),
        })),
      filters: {
        specialities: faker.random
          .words(8)
          .split(" ")
          .map(() => {
            const speciality = faker.name.jobTitle();
            return {
              id: faker.datatype.number(),
              name: speciality,
              slug: faker.helpers.slugify(speciality),
              iconUrl: faker.image.abstract(),
            };
          }),
        price: [
          {
            id: "less-50",
            name: "Dibawah 50rb",
          },
          {
            id: "50-100",
            name: "50-100 ribu",
          },
          {
            id: "greater-100",
            name: "Diatas 100rb",
          },
        ],
        experiences: [
          {
            id: "less-5",
            name: "Kurang dari 5 tahun",
          },
          {
            id: "5-10",
            name: "50-10 tahun",
          },
          {
            id: "greater-10",
            name: "Diatas 10 tahun",
          },
        ],
        cities: faker.random
          .words(100)
          .split(" ")
          .map(() => ({
            id: faker.datatype.string(),
            name: faker.address.cityName(),
          })),
        gender: [
          {
            id: "m",
            name: "Laki-laki",
          },
          {
            id: "f",
            name: "Perempuan",
          },
        ],
        campaigns: [
          {
            id: faker.datatype.string(),
            name: faker.lorem.lines(1),
          },
        ],
      },
      quickFilter: [
        {
          id: "name",
          name: "A-Z",
          param: "sort",
        },
        {
          id: "less-50",
          name: "< 50 ribu",
          param: "price",
        },
        {
          id: "nearby",
          name: "Terdekat",
          param: "userLatLon",
        },
        {
          id: "kulit",
          name: "Kulit",
          param: "specialityId",
        },
      ],
    },
  };
}

export const getTelemedicineDoctors = rest.get<
  never,
  never,
  TelemedicineDoctorsResponse
>(`${ENV.API}/telemed-service/doctors`, (req, res, ctx) => {
  const query = urlSearchParamsToQuery(req.url.searchParams);
  const seedKey = hashStringToNumber(queryToString(query));
  return res(ctx.json(generateFakeTelemedicineDoctorsResponse(seedKey)));
});
