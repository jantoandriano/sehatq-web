import { format, differenceInSeconds } from "date-fns";
import id from "date-fns/locale/id/index.js";

export const formatDates = (paramDate: string) => {
  return format(new Date(paramDate), "EEEE, d MMMM yyyy HH:mm", {
    locale: id,
  });
};

export const customFormat = (paramDate: string, formatString: string) => {
  return format(new Date(paramDate), formatString, {
    locale: id,
  });
};

export const differenceSeconds = (dateLeft: string, dateRight: string) => {
  return differenceInSeconds(new Date(dateLeft), new Date(dateRight));
};
