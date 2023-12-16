"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="background-light800_dark400 relative flex min-h-[56px] w-full max-w-[600px] items-center justify-center gap-1 rounded-xl px-4">
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder="Search globally"
        value=""
        className="no-focus placeholder paragraph-regular background-light800_dark400 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default GlobalSearch;
