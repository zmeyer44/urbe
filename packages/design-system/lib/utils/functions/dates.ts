import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export function formatDate(timestamp: Date, format?: string) {
  dayjs.extend(advancedFormat);
  dayjs.extend(timezone);
  return dayjs(timestamp).format(format ?? "MMMM Do, YYYY");
}
export function relativeTime(timestamp: Date) {
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });
  dayjs.extend(relative);
  return dayjs(timestamp).fromNow();
}
export function relativeTimeSmall(timestamp: Date) {
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "%ds",
      m: "1m",
      mm: "%dm",
      h: "%dh",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });
  dayjs.extend(relative);
  return dayjs(timestamp).fromNow();
}
export function addMinutesToDate(inputDate: Date, minutesToAdd: number) {
  if (!(inputDate instanceof Date)) {
    throw new Error("Invalid date input");
  }

  if (typeof minutesToAdd !== "number" || isNaN(minutesToAdd)) {
    throw new Error("Invalid minutes input");
  }
  // Copy the input date to avoid modifying the original date
  const resultDate = new Date(inputDate);

  // Add the specified number of minutes
  resultDate.setMinutes(resultDate.getMinutes() + minutesToAdd);

  return resultDate;
}

export function convertToTimezone(inputDate: Date, targetTimezone: string) {
  if (!(inputDate instanceof Date)) {
    throw new Error("Invalid date input");
  }

  if (typeof targetTimezone !== "string") {
    throw new Error("Invalid timezone input");
  }
  dayjs.extend(utc);
  dayjs.extend(timezone);
  let hours = inputDate.getHours().toString();

  if (hours.length === 1) {
    hours = "0" + hours;
  }
  let minutes = inputDate.getMinutes().toString();
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  let day = inputDate.getDate().toString();
  if (day.length === 1) {
    day = "0" + day;
  }
  let month = (inputDate.getMonth() + 1).toString();
  if (month.length === 1) {
    month = "0" + month;
  }

  const dateString = `${inputDate.getFullYear()}-${month}-${day}T${hours}:${minutes}:00.000Z`;
  // Get plain date w/o timezones
  const initialDate = new Date(dateString);

  const plainString = initialDate.toISOString().split(".")[0] as string;

  const plain = dayjs.tz(plainString, targetTimezone);
  return plain.toDate();
}
