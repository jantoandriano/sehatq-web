export type DaysKeys =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface TelemedicineHCPNextSchedule {
  date: string;
  day: DaysKeys;
  schedules: {
    doctorScheduleId: number;
    startAt: string;
    endAt: string;
  }[];
}

export interface TelemedicineHCPNextScheduleResponse {
  data: TelemedicineHCPNextSchedule;
}

export function modelTelemedicineHCPNextSchedule(
  schedule: TelemedicineHCPNextScheduleResponse["data"]
) {
  return schedule;
}

export type Consultation = ReturnType<typeof modelTelemedicineHCPNextSchedule>;

export interface AddTelemedicineReminderResponse {
  meta: {
    message: string;
  };
  data: null;
}

export interface DeleteTelemedicineReminderResponse {
  meta: {
    message: string;
  };
  data: null;
}
