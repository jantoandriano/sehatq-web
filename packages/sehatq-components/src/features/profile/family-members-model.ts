import { parseToDate } from "@sehatq/utils";

export interface FamilyMembersResponse {
  data: {
    id: number;
    uuid: string;
    name: string;
    photoUrl: string;
    gender: "m" | "f" | "";
    age: number;
    height: number;
    weight: number;
    relation: {
      id: number;
      name: string;
    } | null;
    phone: string | null;
    idType: string | null;
    address: string | null;
    idNumber: string | null;
    birthDate: string | null;
    idImageUrl: string | null;
    sendbirdAccessToken: string;
    sendbirdUserId: string;
  }[];
}

export interface FamilyFormResponse {
  meta: { message: string };
  data: [];
}

export function modelFamilyMembers(data: FamilyMembersResponse["data"]) {
  return data.map((familyMember) => ({
    id: familyMember.id,
    uuid: familyMember.uuid,
    name: familyMember.name,
    gender: familyMember.gender,
    imgSrc: familyMember.photoUrl,
    isActive: false,
    profileNavigation: {
      name: "PROFILE_FAMILY_DETAIL" as const,
      query: { memberId: `${familyMember.id}` },
    },
    age: familyMember.age,
    relation: familyMember.relation ? familyMember.relation.name : "Saya",
    height: familyMember.height,
    weight: familyMember.weight,
    birthDate: familyMember.birthDate
      ? parseToDate(familyMember.birthDate, "yyyy-MM-dd")
      : undefined,
    phone: familyMember.phone,
    address: familyMember.address,
    identityNumber: familyMember.idNumber,
    sendbirdAccessToken: familyMember.sendbirdAccessToken,
    sendbirdUserId: familyMember.sendbirdUserId,
  }));
}

export type FamilyMembers = ReturnType<typeof modelFamilyMembers>[0];
