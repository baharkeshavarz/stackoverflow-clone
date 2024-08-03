"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1 bg-slate-100" />
        <Skeleton className="h-14 w-28 bg-slate-100" />
      </div>

      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton
            key={item}
            className="h-60 w-full rounded-2xl bg-slate-100 sm:w-[230px]"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
