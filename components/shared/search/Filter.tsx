"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: FilterProps) => {
  return (
    <>
      <div className={`relative ${containerClasses}`}>
        <Select>
          <SelectTrigger
            className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 gap-4 border px-5 py-2.5`}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue placeholder="Selcet a Filter" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="dark:bg-dark-100 dark:text-white">
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
