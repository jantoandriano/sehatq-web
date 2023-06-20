export interface Hospital {
  id: number;
  name: string;
  logoUrl: string;
  identityNumberRequired: boolean;
  addressRequired: boolean;
}

export interface TelemedicineDoctorDetail {
  id: number;
  slug: string;
  title: string | null;
  name: string;
  photoUrl: string;
  description: string;
  experience: string;
  experienceStartOn: string;
  displayPrice: number;
  consultationFee: number;
  str: string;
  sip: string;
  education: string;
  speciality: {
    id: number;
    name: string;
  };
  hospital: Hospital;
  indicator: string;
  rating: {
    average: number;
    count: number;
  };
  channels: {
    id: number;
    name: string;
    code:
      | "ConsultationBooking"
      | "ConsultationPublic"
      | "ConsultationPrivate"
      | "ConsultationApp";
  }[];
  hasDoctorReminder: boolean;
}

export interface TelemedicineDoctorResponse {
  data: TelemedicineDoctorDetail;
}

export type TelemedicineHCPSchedulesData = {
  doctorScheduleId: number;
  startAt: string;
  endAt: string;
  status: string;
  available?: number;
};

export type TelemedicineHCPSchedulesItem = {
  date: string;
  day: string;
  schedules: TelemedicineHCPSchedulesData[];
};

export type BookingTelemedicineHCPScheduleResponse = {
  meta: {
    message: string;
  };
  data: {
    id: number;
    expireAt: string;
    status: string;
    paymentPageUrl: string;
    waitingEndAt: string;
  };
};

export function modelTelemedicineDoctor(
  doctor: TelemedicineDoctorResponse["data"]
) {
  return {
    id: doctor.id,
    slug: doctor.slug ?? "",
    name: `${doctor.title === null ? "" : doctor.title} ${doctor.name}`,
    photoUrl: doctor.photoUrl ?? "",
    experience: doctor.experience ?? "",
    specialityName: doctor.speciality?.name ?? "",
    str: doctor.str ?? "",
    sip: doctor.sip ?? "",
    description: doctor.description ?? "",
    displayPrice: doctor.displayPrice ?? "",
    consultationFee: doctor.consultationFee ?? "",
    hospital: doctor.hospital ?? "",
    rating: doctor.rating ?? "",
    indicator: doctor.indicator ?? "",
    education: doctor.education ?? "",
    isPrivateChannel:
      doctor.channels?.findIndex((f) => f.code == "ConsultationPrivate") >= 0,
    isBookingChannel:
      doctor.channels?.findIndex((f) => f.code == "ConsultationBooking") >= 0,
    isPublicChannel:
      doctor.channels?.findIndex((f) => f.code == "ConsultationPublic") >= 0,
    hasReminder: doctor.hasDoctorReminder,
  };
}

export type Consultation = ReturnType<typeof modelTelemedicineDoctor>;

export interface TelemedicineDoctorsResponse {
  data: TelemedicineDoctorDetail[];
  meta: {
    pagination: {
      page: number;
      perPage: number;
      maxPage: number;
      total: number;
    };
    sort: {
      id: string;
      name: string;
    }[];
    filters: {
      specialities: {
        id: number;
        name: string;
        iconUrl: string;
        slug: string;
      }[];
      price: {
        id: string;
        name: string;
      }[];
      experiences: {
        id: string;
        name: string;
      }[];
      cities: {
        id: string;
        name: string;
      }[];
      gender: {
        id: string;
        name: string;
      }[];
      campaigns: {
        id: string;
        name: string;
      }[];
    };
    quickFilter: {
      id: string;
      name: string;
      param: string;
    }[];
  };
}

export function modelTelemedicineDoctors(
  doctors: TelemedicineDoctorsResponse["data"]
) {
  return doctors.map((doctor) => ({
    id: doctor.id,
    slug: doctor.slug ?? "",
    name: `${doctor.title === null ? "" : doctor.title} ${doctor.name}`,
    photoUrl: doctor.photoUrl ?? "",
    experience: doctor.experience ?? "",
    specialityName: doctor.speciality?.name ?? "",
    str: doctor.str ?? "",
    sip: doctor.sip ?? "",
    description: doctor.description ?? "",
    displayPrice: doctor.displayPrice ?? "",
    consultationFee: doctor.consultationFee ?? "",
    consultationStrikeFee:
      doctor.displayPrice != doctor.consultationFee
        ? doctor.displayPrice
        : undefined,
    hospital: doctor.hospital ?? "",
    rating: doctor.rating ?? "",
    indicator: doctor.indicator ?? "",
    channels: doctor.channels ?? [],
  }));
}

export function modelMetaTelemedicineDoctors(
  doctors: TelemedicineDoctorsResponse["meta"]
) {
  return {
    ...doctors.pagination,
    sort: doctors.sort,
    filters: doctors.filters,
    quickFilter: doctors.quickFilter,
  };
}

export type TelemedicineDoctorList = ReturnType<
  typeof modelTelemedicineDoctors
>[number];

export type TelemedicineDoctorMeta = ReturnType<
  typeof modelMetaTelemedicineDoctors
>;
