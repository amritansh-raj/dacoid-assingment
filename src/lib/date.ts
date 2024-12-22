import { format, parseISO } from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";

const TIMEZONE = "Asia/Kolkata";

export function toUnixTimestamp(date: Date, time?: string): number {
  const dateStr = format(date, "yyyy-MM-dd");
  const timeStr = time || "00:00";
  const dateTimeStr = `${dateStr}T${timeStr}:00${getTimezoneOffset()}`;
  return Math.floor(parseISO(dateTimeStr).getTime() / 1000);
}

export function fromUnixTimestamp(timestamp: number): Date {
  return toDate(timestamp * 1000, { timeZone: TIMEZONE });
}

export function formatDate(timestamp: number, formatStr: string): string {
  return formatInTimeZone(timestamp * 1000, TIMEZONE, formatStr);
}

export function getDayTimestamp(date: Date): number {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return toUnixTimestamp(startOfDay);
}

export function timeToSeconds(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60;
}

export function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function getTimezoneOffset(): string {
  const offset = 330; // IST offset in minutes (+5:30)
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset >= 0 ? "+" : "-";
  return `${sign}${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
