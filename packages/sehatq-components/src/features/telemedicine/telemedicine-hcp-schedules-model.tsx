export type DaysKeys =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface TelemedicineHCPSchedules {
  id: number;
  day: DaysKeys;
  startAt: string;
  endAt: string;
  status: string;
}

export interface TelemedicineHCPSchedulesResponse {
  data: TelemedicineHCPSchedules[];
}

export function modelTelemedicineHCPSchedules(
  schedule: TelemedicineHCPSchedulesResponse["data"]
) {
  return schedule;
}

export type Consultation = ReturnType<typeof modelTelemedicineHCPSchedules>;
