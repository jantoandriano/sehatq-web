import { ASSETS } from "@sehatq/constants";

export interface RegularTelemedicineBannerResponse {
  data: {
    regularConsultation: {
      doctorId: number;
      consultationFee: number;
      indicator: string;
      photoUrl: string;
    };
    operationHours: string[];
    operationHourActive: boolean;
  };
}

export function modelRegularTelemedicineBanner(
  data: RegularTelemedicineBannerResponse["data"]
) {
  return {
    doctorId: data.regularConsultation.doctorId,
    consultationFee: data.regularConsultation.consultationFee,
    indicator: data.regularConsultation.indicator,
    photoUrl: data.regularConsultation.photoUrl || ASSETS.NO_IMAGE,
    operationHours: data.operationHours,
    operationHourActive: data.operationHourActive,
  };
}

export type RegularTelemedicineBanner = ReturnType<
  typeof modelRegularTelemedicineBanner
>;

export interface RegularTelemedicineVoucherResponse {
  data: {
    id: number;
    title: string;
    slug: string;
    code: string;
    priority: number;
    imageUrl: string;
    voucherType: string;
    flag: string;
    createdAt: string;
    platformAvailability: string;
  }[];
}

export function modelRegularTelemedicineVoucher(
  data: RegularTelemedicineVoucherResponse["data"]
) {
  return {
    code: data.length > 0 ? data[0].code : undefined,
  };
}

export type RegularTelemedicineVoucher = ReturnType<
  typeof modelRegularTelemedicineVoucher
>;
