import {
  format as formatDateFns,
  parse,
  parseISO,
  intervalToDuration,
  differenceInDays,
  formatRelative,
  differenceInSeconds,
} from "date-fns";
import { SHECEDULE_DAYS } from "@sehatq/constants";
import id from "date-fns/locale/id/index.js";

export function formatDate(
  date: Date | number,
  format: string,
  isRelativeFormat?: boolean
) {
  const days = differenceInDays(new Date(), date) ?? 0;
  if (isRelativeFormat && days > -6 && days < 7) {
    return formatRelative(date, new Date(), { locale: id });
  }

  return formatDateFns(date, format, { locale: id });
}

export function calculateFullAge(dob: string) {
  const birthDate = parse(dob, "yyyy-MM-dd", new Date());
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: new Date(),
  });
  return { years, months, days };
}

export function intervalDays(date: Date | number) {
  const today = new Date();
  return differenceInDays(today, new Date(date));
}

export function parseToDate(
  dateString: string,
  format: "iso" | Omit<string, "iso">,
  isLocalId?: boolean
) {
  return format == "iso"
    ? parseISO(dateString)
    : parse(dateString, format as string, new Date(), {
        ...(isLocalId ? { locale: id } : null),
      });
}

export function convertDateToEnglish(date: string) {
  let newDate;
  if (date.includes("Mei")) {
    newDate = date.replace(/Mei/g, "May");
  } else if (date.includes("Agt")) {
    newDate = date.replace(/Agt/g, "Aug");
  } else if (date.includes("Okt")) {
    newDate = date.replace(/Okt/g, "Oct");
  } else if (date.includes("Des")) {
    newDate = date.replace(/Des/g, "Dec");
  } else {
    newDate = date;
  }
  return parseToDate(newDate, "dd MMM yyyy");
}

export function getIdDay(dayName: string) {
  return SHECEDULE_DAYS.find((d) => d.name == dayName.toLowerCase())?.id;
}

export function convertDayNameIdToEn(dayName: string) {
  switch (dayName) {
    case "Senin":
      return "Monday";
    case "Selasa":
      return "Tuesday";
    case "Rabu":
      return "Wednesday";
    case "Kamis":
      return "Thursday";
    case "Jumat":
      return "Friday";
    case "Sabtu":
      return "Saturday";
    case "Minggu":
      return "Sunday";
    default:
      return null;
  }
}

export function differentInSeconds(dateLeft: Date, dateRight: Date) {
  return differenceInSeconds(dateLeft, dateRight);
}
