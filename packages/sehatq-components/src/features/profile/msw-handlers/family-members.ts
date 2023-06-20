import { rest } from "msw";
import {
  queryToString,
  hashStringToNumber,
  urlSearchParamsToQuery,
  formatDate,
} from "@sehatq/utils";
import { ENV } from "@sehatq/constants";
import { Query } from "@sehatq/types";
import { faker } from "@faker-js/faker/locale/id_ID";
import { FamilyMembersResponse } from "..";

export function generateFakeFamilyMembersResponse(query: Query) {
  const seedKey = hashStringToNumber(queryToString(query));
  faker.seed(seedKey);
  return {
    data: [
      {
        id: 1,
        name: "Akun SehatQ Testing",
        email: "testing@sehatq.com",
        gender: "m" as const,
        birthDate: "2000-02-22",
        address:
          "Jl. M.H. Thamrin No.18, RT.9/RW.5, Gondangdia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
        height: 175,
        weight: 65,
        age: new Date().getFullYear() - 2000,
        phone: "6281234567890",
        sendbirdAccessToken: "faeba82556581fe3538310ce47b163bf15df5aad",
        sendbirdUserId: "p1",
        photoUrl: "https://dev.sehatq.com/images/profile_placeholder_man.svg",
        idType: "ktp",
        idNumber: "1234567890123456",
        idImageUrl:
          "https://static-dev.sehatq.com/account-dev/identity/img_1604660300.png",
        uuid: "8449ef2d-2e36-11eb-9a5d-06a9ce52dcca",
        relation: null,
      },
      {
        address: null,
        age: 0,
        birthDate: null,
        gender: "" as const,
        height: 0,
        id: 10866,
        idImageUrl: null,
        idNumber: null,
        idType: null,
        name: "New User",
        phone: null,
        photoUrl:
          "https://static-dev.sehatq.com/account-dev/picture-empty/image-20220105-100017.png",
        relation: { id: 4, name: "Anak Perempuan" },
        sendbirdAccessToken: "8c87de986195fa579d5b83941999c79f92bbb046",
        sendbirdUserId: "p10866",
        uuid: "74c7f3a5-407b-49e6-a70f-48b432b1d94c",
        weight: 0,
      },
      ...Array.from(Array(3)).map(() => {
        const id = faker.datatype.number();
        const age = faker.datatype.number({ min: 10, max: 65, precision: 1 });
        const gender = faker.helpers.arrayElement(["m" as const, "f" as const]);
        return {
          id,
          age,
          gender,
          uuid: faker.datatype.uuid(),
          name: faker.name.findName("", "", gender === "f" ? "female" : "male"),
          relation:
            gender === "f"
              ? faker.helpers.arrayElement([
                  { id: 2, name: "Istri" },
                  { id: 4, name: "Anak Perempuan" },
                ])
              : faker.helpers.arrayElement([
                  { id: 2, name: "Suami" },
                  { id: 4, name: "Anak Laki-laki" },
                ]),
          photoUrl: faker.image.avatar(),
          birthDate: formatDate(
            faker.date.birthdate({ min: 1, max: 65, mode: "age" }),
            "yyyy-MM-dd"
          ),
          height: faker.datatype.number({ min: 100, max: 180, precision: 8 }),
          weight: faker.datatype.number({ min: 40, max: 70, precision: 8 }),
          idType: "unknown",
          idNumber: faker.phone.number("147#############"),
          idImageUrl: "unknown",
          phone: faker.phone.number("62###########"),
          address: faker.address.streetAddress(true),
          sendbirdAccessToken: faker.datatype.uuid(),
          sendbirdUserId: faker.phone.number(`p${id}`),
        };
      }),
    ],
  };
}

export const getFamilyMembers = rest.get<never, never, FamilyMembersResponse>(
  `${ENV.API}/account/family-members`,
  (req, res, ctx) => {
    const query = urlSearchParamsToQuery(req.url.searchParams);
    return res(ctx.json(generateFakeFamilyMembersResponse(query)));
  }
);
