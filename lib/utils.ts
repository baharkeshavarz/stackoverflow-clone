import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types/index";

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
    minute: 60,
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

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  // Just update the "key" from params
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  });
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        ++badgeCounts[level as keyof BadgeCounts];
      }
    });
  });

  return badgeCounts;
};
