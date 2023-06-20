import { calculateFullAge } from "@sehatq/utils";

export interface RegisterFCMTokenResponse {
  meta: {
    message: string;
  };
}

export interface ProfileResponse {
  data: {
    id: number;
    name: string;
    email: string;
    phoneVerified: 1 | 0;
    isDoctorCommenter: 1 | 0;
    emailVerified: 1 | 0;
    sendbirdAccessToken: string;
    sendbirdUserId: string;
    photoUrl: string;
    uuid: string;
    companies: {
      nik: string;
      insuranceNumber: string;
      company: {
        id: number;
        name: string;
      };
    }[];
    phone: string | null;
    height: number | null;
    weight: number | null;
    gender: "m" | "f" | "";
    address: string | null;
    birthDate: string | null;
    idType: string | null;
    idNumber: string | null;
    idImageUrl: string | null;
  };
}

export function modelProfile(data: ProfileResponse["data"]) {
  let age = null;
  if (data.birthDate) age = calculateFullAge(data.birthDate);
  return {
    id: data.id,
    idType: data.idType,
    name: data.name,
    email: data.email,
    phone: data.phone,
    birthDate: data.birthDate,
    isUserVerified: !!data?.phoneVerified,
    emailVerified: !!data.emailVerified,
    imageSrc: data.photoUrl,
    gender: data.gender,
    height: data.height,
    weight: data.weight,
    companies: data.companies,
    address: data.address,
    uuid: data.uuid,
    sendbirdAccessToken: data.sendbirdAccessToken,
    sendbirdUserId: data.sendbirdUserId,
    isDoctorCommenter: true, // Boolean(data.isDoctorCommenter),
    age,
  };
}

export type Profile = ReturnType<typeof modelProfile>;
