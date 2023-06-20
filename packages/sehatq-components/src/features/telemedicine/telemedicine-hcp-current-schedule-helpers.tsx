import { formatDate, translateDay, parseToDate } from "@sehatq/utils";

import { TelemedicineHCPSchedules } from "./telemedicine-hcp-schedules-model";
import { TelemedicineHCPScheduleDays } from "./telemedicine-hcp-schedule-days-model";

export function checkNextAvailSchedule(
  doctorScheduleDays: TelemedicineHCPScheduleDays[]
) {
  let result = [];
  const temp = [];

  const currentDay = formatDate(new Date(), "EEEE");
  const currentHour = formatDate(new Date(), "HH:mm");
  const FORMAT_DATE = "yyyy-MM-dd";

  for (let i = 0; i < doctorScheduleDays.length; i++) {
    for (let j = 0; j < doctorScheduleDays[i].schedules.length; j++) {
      if (doctorScheduleDays[i].schedules[j].available) {
        const day = formatDate(
          parseToDate(doctorScheduleDays[i].date, FORMAT_DATE),
          "dd MMMM yyyy"
        );

        const dayTemp = formatDate(
          parseToDate(doctorScheduleDays[i].date, FORMAT_DATE),
          "EEEE"
        ).toLocaleLowerCase();

        const { startAt, endAt, doctorScheduleId } =
          doctorScheduleDays[i].schedules[j];

        temp.push({
          dayTemp,
          day,
          id: doctorScheduleId,
          startAt,
          endAt,
        });
      }
    }
  }

  /** filter schedule base on today */
  result = temp.filter(
    (item) =>
      item.dayTemp === currentDay.toLowerCase() &&
      item.startAt >= currentHour &&
      currentHour <= item.endAt
  );

  if (!result.length) {
    return temp.slice(0, 1);
  }

  return result.slice(0, 1);
}

export function checkTodayAvailSchedule(
  doctorSchedules: TelemedicineHCPSchedules[]
) {
  let results = [];

  const currentDay = formatDate(new Date(), "EEEE");
  const currentHour = formatDate(new Date(), "HH:mm");

  /** filter schedule base on today */
  const scheduleList = doctorSchedules.filter(
    (item) =>
      translateDay(item.day).toLowerCase() === currentDay.toLowerCase() &&
      currentHour >= item.startAt &&
      currentHour <= item.endAt
  );

  /** translate schedule list day from eng to id */
  results = scheduleList.map((v) => ({
    ...v,
    day: formatDate(new Date(), "dd MMMM yyyy"),
    dayTemp: translateDay(v.day).toLocaleLowerCase(),
  }));

  return results;
}
