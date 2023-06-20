import { differenceInYears } from "date-fns";
import { ASSETS } from "@sehatq/constants";
import { parseToDate } from "@sehatq/utils";

export interface TelemedicineLandingCampaignResponse {
  title: string;
  slug: string;
  subTitle: string;
  placement: string;
  startOn: string;
  endOn: string;
  banner: string;
  bannerMobile: string;
  icon: string;
  doctors: {
    id: number;
    title: string;
    slug: string;
    bookingDoctorId: number;
    name: string;
    photoUrl: string;
    hospital: {
      id: number;
      name: string;
      identityNumberRequired: boolean;
      addressRequired: boolean;
    };
    speciality: {
      name: string;
    };
    displayPrice: number | null;
    consultationFee: number;
    experienceStartOn: string;
    rating: {
      average: number;
      count: number | null;
    };
    indicator: string;
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

export function modelTelemedicineLandingCampaign(
  data: TelemedicineLandingCampaignResponse
) {
  return {
    title: data.title,
    subTitle: data.subTitle,
    slug: data.slug,
    banner: data.banner,
    bannerMobile: data.bannerMobile,
    hcps: data.doctors.map((doctor) => ({
      doctorId: doctor.id,
      doctorSlug: doctor.slug,
      doctorName: `${doctor.title ?? ""} ${doctor.name ?? ""}`,
      photoUrl: doctor.photoUrl || ASSETS.NO_IMAGE,
      speciality: doctor.speciality.name,
      isMultiplePrice: !!doctor.displayPrice,
      consultationFee: doctor.consultationFee,
      ratingAvg: doctor.rating.average,
      ratingTotal: doctor.rating.count,
      experienceStartOn: doctor.experienceStartOn,
      experience: doctor.experienceStartOn
        ? `${differenceInYears(
            new Date(),
            parseToDate(doctor.experienceStartOn, "yyyy-MM-dd")
          )} Tahun`
        : "",
      indicator: doctor.indicator,
      isPrivateChannel:
        doctor.channels.findIndex((f) => f.code == "ConsultationPrivate") >= 0,
      isBookingChannel:
        doctor.channels.findIndex((f) => f.code == "ConsultationBooking") >= 0,
      isPublicChannel:
        doctor.channels.findIndex((f) => f.code == "ConsultationPublic") >= 0,
    })),
  };
}
