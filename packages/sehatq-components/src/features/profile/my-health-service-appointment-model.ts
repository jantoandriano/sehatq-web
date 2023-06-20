import { generatePriceDisplay, formatDate } from "@sehatq/utils";
import {
  HEALTH_SERVICE_STATUS,
  HealthServiceStatusCode,
} from "./health-service-appointment-constants";

const normalFormatDate = "dd MMMM yyyy";

export interface MyHealthServiceAppointmentsResponse {
  meta: {
    pagination: {
      total: number;
      page: number;
      perPage: number;
    };
    filter: {
      status: {
        code: HealthServiceStatusCode;
        name: string;
      }[];
    };
  };
  data: {
    id: number;
    bookingId: string;
    packageName: string;
    procedureName: string;
    bookingDate: string;
    bookingTime: string;
    createdAt: string;
    status: HealthServiceStatusCode;
    isGuestBooking: number;
    price: number;
    hospital: {
      id: number;
      name: string;
      title: string;
      slug: string;
    };
    package: {
      id: number;
      name: string;
      slug: string;
      price: number;
      isFree: number;
    };
    procedure: {
      id: number;
      slug: string;
    };
    patient: {
      name: string;
    };
  }[];
}

function bookingTimeCF(time: string) {
  const timeSplit = time.split(" ");
  const startTime = timeSplit[0].split(":");
  const endTime = timeSplit[2].split(":");
  return `${startTime[0]}.${startTime[1]} - ${endTime[0]}.${endTime[1]}`;
}

export function modelMyHealthServiceAppointments(
  data: MyHealthServiceAppointmentsResponse["data"]
) {
  return data.map((modelBookingHealthService) => {
    const {
      id,
      status,
      bookingDate,
      bookingId,
      createdAt,
      packageName,
      procedureName,
      procedure,
      price,
      patient,
      hospital,
      bookingTime,
    } = modelBookingHealthService;
    const hospitalTitle = hospital.title ? `${hospital.title} ` : "";
    return {
      id: id,
      bookCreateDate: `${formatDate(new Date(createdAt), "dd MMM, HH.mm")}`,
      statusCode: status,
      bookDate: `${formatDate(new Date(bookingDate), normalFormatDate)}`,
      bookId: bookingId,
      serviceName: packageName,
      serviceType: procedureName,
      serviceTypeSlug: procedure.slug,
      servicePrice: generatePriceDisplay(price),
      patientName: patient.name,
      bookHcfName: `${hospitalTitle}${hospital.name}`,
      bookHcfSlug: hospital.slug,
      bookTime: bookingTimeCF(bookingTime),
    };
  });
}

export type ModelMyHealthServiceAppointments = ReturnType<
  typeof modelMyHealthServiceAppointments
>[number];

export interface MyHealthServiceAppointmentResponse {
  data: {
    bookingId: string;
    createdAt: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    status: HealthServiceStatusCode;
    price: number;
    isGuestBooking: number;
    procedurePackage: {
      id: number;
      price: number;
      isNeedConsultationDoctor: number;
      name: string;
    };
    procedure: {
      id: number;
      slug: string;
      name: string;
    };
    hcf: {
      id: number;
      slug: string;
      name: string;
    };
    user: {
      id: number;
      name: string;
      dob: string;
      address: string;
      phone: string;
    };
  };
}

export function modelMyHealthServiceAppointment(
  data: MyHealthServiceAppointmentResponse["data"]
) {
  const {
    bookingId,
    createdAt,
    status,
    user,
    procedurePackage,
    procedure,
    scheduleDate,
    scheduleStartTime,
    scheduleEndTime,
    hcf,
    price,
  } = data;
  return {
    bookingId,
    createdAt: `${formatDate(new Date(createdAt), "dd MMM, HH.mm")}`,
    status: {
      id: status,
      label: HEALTH_SERVICE_STATUS[status]["statusLabel"],
      color: HEALTH_SERVICE_STATUS[status]["statusColor"],
    },
    patientName: user.name,
    patientDob: `${formatDate(new Date(user.dob), normalFormatDate)}`,
    patientAddress: user.address,
    patientPhone: user.phone,
    packageName: procedurePackage.name,
    procedureName: procedure.name,
    procedureSlug: procedure.slug,
    scheduleDate: `${formatDate(new Date(scheduleDate), normalFormatDate)}`,
    scheduleTime: bookingTimeCF(`${scheduleStartTime} - ${scheduleEndTime}`),
    hcfName: hcf.name,
    hcfSlug: hcf.slug,
    price: generatePriceDisplay(price),
  };
}

export type ModelMyHealthServiceAppointment = ReturnType<
  typeof modelMyHealthServiceAppointment
>;

export type CancelMyHealthServiceAppointmentsResponse = {
  data: [];
  meta: {
    message: string;
  };
};
