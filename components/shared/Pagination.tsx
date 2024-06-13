"use client";

import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageNumber: number;
  isNext?: boolean;
}

const Pagination = ({ pageNumber, isNext }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const nextPageNumber = direction === "next" ? ++pageNumber : --pageNumber;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };
  return (
    <div className="flex-center flex w-full gap-2 py-2">
      <Button
        className="light-border-2 btn flex-center flex min-h-[36px] gap-2 border"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="flex-center flex rounded-md bg-primary-500 px-3 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>

      <Button
        className="light-border-2 btn flex-center flex min-h-[36px] gap-2 border"
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
