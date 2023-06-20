import { rest } from "msw";
import { ENV } from "@sehatq/constants";
import { ProfileResponse } from "..";

export function generateFakeProfileResponse() {
  return {
    data: {
      id: 1,
      name: "Akun SehatQ Testing",
      email: "testing@sehatq.com",
      gender: "m" as const,
      birthDate: "2000-02-22",
      address:
        "Jl. M.H. Thamrin No.18, RT.9/RW.5, Gondangdia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
      height: 175,
      weight: 65,
      phone: "6281234567890",
      phoneVerified: 1 as const,
      sendbirdAccessToken: "faeba82556581fe3538310ce47b163bf15df5aad",
      sendbirdUserId: "p1",
      photoUrl: "https://dev.sehatq.com/images/profile_placeholder_man.svg",
      idType: "ktp",
      idNumber: "1234567890123456",
      idImageUrl:
        "https://static-dev.sehatq.com/account-dev/identity/img_1604660300.png",
      uuid: "8449ef2d-2e36-11eb-9a5d-06a9ce52dcca",
      isDoctorCommenter: 0 as const,
      companies: [],
    },
  };
}

export const getProfile = rest.get<never, never, ProfileResponse>(
  `${ENV.API}/account/profile`,
  (req, res, ctx) => {
    return res(ctx.json(generateFakeProfileResponse()));
  }
);
