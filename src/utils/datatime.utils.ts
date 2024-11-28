import { isTruthy } from "./types.utils";

export const timeSignatures = [ "ms", "s", "m", "h", "d", "w", "mo", "y" ] as const;
export type TimeSignature = (typeof timeSignatures)[number];

export type TimeLike = number | `${number}${TimeSignature}`;

export const oneSecond = 1000;
export const oneMinute = 60 * oneSecond;
export const oneHour = 60 * oneMinute;
export const oneDay = 24 * oneHour;
export const oneWeek = 7 * oneDay;
export const oneMonth = 30 * oneDay;
export const oneYear = 365 * oneDay;

export const timeLikeToMs = (time: TimeLike) => {
  if (typeof time === "number") {
    return time;
  }
  if (typeof time !== "string") {
    return NaN;
  }
  if (time.endsWith("ms")) {
    return +time.slice(0, -2);
  }
  if (time.endsWith("s")) {
    return +time.slice(0, -1) * oneSecond;
  }
  if (time.endsWith("m")) {
    return +time.slice(0, -1) * oneMinute;
  }
  if (time.endsWith("h")) {
    return +time.slice(0, -1) * oneHour;
  }
  if (time.endsWith("d")) {
    return +time.slice(0, -1) * oneDay;
  }
  if (time.endsWith("w")) {
    return +time.slice(0, -1) * oneWeek;
  }
  if (time.endsWith("mo")) {
    return +time.slice(0, -2) * oneMonth;
  }
  if (time.endsWith("y")) {
    return +time.slice(0, -1) * oneYear;
  }
  return NaN;
};

const theGoodLocale = "en-CA";
const nyTimeZone = "America/New_York";
const toLocaleStringWorks =
  new Date("2000-01-01").toLocaleString(theGoodLocale, { timeZone: nyTimeZone, hour12: false }) ===
  "1999-12-31, 19:00:00";

export const toUtcTimestamp = (date: Date | string) =>
  new Date(date).toISOString().replace("T", " ").replace("Z", " UTC");

export const toUtcDateAndTime = (date: Date | string): [date: string, hour: string, timeZone: string] => {
  const timestamp = toUtcTimestamp(date);
  const [ hour, tz ] = timestamp.slice(11).split(" ");
  return [ timestamp.slice(0, 10), hour, tz ];
};

export const toIsoDate = (date: Date | string) => new Date(date).toISOString().slice(0, 10);

export const timeZoneDateFunctionsFactory = (timeZone: string, suffix = "") => {
  if (!toLocaleStringWorks) {
    return {
      toDate: toIsoDate,
      toTimestamp: toUtcTimestamp,
      toDateAndTime: toUtcDateAndTime,
    };
  }

  const toDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString(theGoodLocale, { timeZone });
  };

  const toTimestamp = (date: Date | string) => {
    const d = new Date(date);
    const dateTime = d.toLocaleString(theGoodLocale, { timeZone, hour12: false }).replace(",", "");
    const ms = `000${d.getMilliseconds()}`.slice(-3);
    return isTruthy(suffix) ? `${dateTime}.${ms} ${suffix}` : `${dateTime}.${ms}`;
  };

  const toDateAndTime = (date: Date | string, options?: { noMs?: boolean }): [date: string, hour: string, timeZone: string] => {
    const timestamp = toTimestamp(date);
    const [ hourWithMs, tz ] = timestamp.slice(11).split(" ");
    const [ hourNoMs ] = hourWithMs.split(".");
    return [ timestamp.slice(0, 10), options?.noMs ? hourNoMs : hourWithMs, tz ];
  };

  return { toDate, toTimestamp, toDateAndTime };
};
