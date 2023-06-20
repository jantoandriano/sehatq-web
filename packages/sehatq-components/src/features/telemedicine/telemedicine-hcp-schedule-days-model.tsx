export interface TelemedicineHCPScheduleDays {
  date: string;
  day: string;
  schedules: {
    available: 0 | 1;
    doctorScheduleId: number;
    startAt: string;
    endAt: string;
    status: string;
  }[];
}

export interface TelemedicineHCPScheduleDaysResponse {
  data: TelemedicineHCPScheduleDays[];
}

export function modelTelemedicineHCPScheduleDays(
  schedule: TelemedicineHCPScheduleDaysResponse["data"]
) {
  return schedule;
}

export type Consultation = ReturnType<typeof modelTelemedicineHCPScheduleDays>;
