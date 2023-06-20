import { ASSETS } from "@sehatq/constants";

export interface TelemedLandingHCPSResponse {
  data: {
    id: number;
    slug: string;
    title: string;
    name: string;
    photoUrl: string;
    experience: string;
    experienceStartOn: string;
    displayPrice: number;
    consultationFee: number;
    indicator: string;
    hospital: {
      name: string;
      identityNumberRequired: boolean;
      addressRequired: boolean;
    };
    speciality: {
      id: number;
      name: string;
    };
    rating: {
      average: number;
      count: number;
    };
    priority: boolean;
    channels: {
      id: number;
      name: string;
      code:
        | "ConsultationBooking"
        | "ConsultationPublic"
        | "ConsultationPrivate"
        | "ConsultationApp";
    }[];
  }[];
}

export function modelTelemedLandingHCPS(
  data: TelemedLandingHCPSResponse["data"]
) {
  return data.map((hcp) => ({
    doctorId: hcp.id,
    doctorSlug: hcp.slug,
    doctorName: `${hcp.title ?? ""} ${hcp.name ?? ""}`,
    hcfName: hcp.hospital.name,
    photoUrl: hcp.photoUrl || ASSETS.NO_IMAGE,
    speciality: hcp.speciality.name,
    consultationFee: hcp.consultationFee,
    consultationStrikeFee: hcp.displayPrice,
    ratingAvg: hcp.rating.average,
    ratingTotal: hcp.rating.count,
    experience: hcp.experience,
    indicator: hcp.indicator,
    isPrivateChannel:
      hcp.channels?.findIndex((f) => f.code == "ConsultationPrivate") >= 0,
    isBookingChannel:
      hcp.channels?.findIndex((f) => f.code == "ConsultationBooking") >= 0,
    isPublicChannel:
      hcp.channels?.findIndex((f) => f.code == "ConsultationPublic") >= 0,
  }));
}
