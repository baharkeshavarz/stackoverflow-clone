import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import React from "react";
import Filter from "@/components/shared/search/Filter";
import { getAllUsers } from "@/lib/actions/user.actions";
import Link from "next/link";
import UserCard from "@/components/cards/UserCard";
import { SearchParamsProps } from "@/types/index";

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex w-full gap-4">
        {result.users.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {result.users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users yet!</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default CommunityPage;
