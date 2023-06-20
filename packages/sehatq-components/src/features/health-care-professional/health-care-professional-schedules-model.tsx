import { formatDate, parseToDate } from "@sehatq/utils";

export interface HCPSchedulesResponse {
  data: {
    date: string;
    day: string;
    time: string[];
    schedule: [
      {
        status: string;
        time: string;
      },
      {
        status: string;
        time: string;
      }
    ];
  }[];
}

export function modelHCPSchedules(data: HCPSchedulesResponse["data"]) {
  return data.map((schedule) => ({
    date: formatDate(
      parseToDate(schedule.date, "yyyy-MM-dd"),
      "EEEE, dd MMMM yyyy"
    ),
    activeSchedules: schedule.schedule
      .filter((f) => f.status == "active")
      .map((sch) => sch.time),
  }));
}

export type HCPSchedules = ReturnType<typeof modelHCPSchedules>[number];
