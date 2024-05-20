import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (timestamp: Date): string => {
  const now: Date = new Date();
  const date: Date = new Date(timestamp);
  const seconds: number = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const unit in intervals) {
    if (Object.prototype.hasOwnProperty.call(intervals, unit)) {
      const interval: number = Math.floor(seconds / intervals[unit]);

      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }
  }

  return "just now";
};

export const formatAndDivideNumber = (count: number): string => {
  if (count !== undefined) {
    if (Math.abs(count) >= 1e6) {
      return (count / 1e6).toFixed(1) + "M";
    } else if (Math.abs(count) >= 1e3) {
      return (count / 1e3).toFixed(1) + "K";
    } else {
      return count.toString();
    }
  } else {
    return "0";
  }
};

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
};
