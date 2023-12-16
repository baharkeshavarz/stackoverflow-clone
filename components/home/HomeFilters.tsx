"use client";
import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const isActive = "newest";
  return (
    <div className="mt-10 hidden w-full flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          className={`body-medium rounded-lg px-6 py-2 capitalize shadow-none
          ${
            isActive === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500"
          }`}
          onClick={() => {}}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
