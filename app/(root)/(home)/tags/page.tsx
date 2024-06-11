import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import React from "react";
import Filter from "@/components/shared/search/Filter";
import NoResult from "@/components/shared/NoResult";
import { getAllTags } from "@/lib/actions/tag.actions";
import Link from "next/link";
import { SearchParamsProps } from "@/types/index";

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex w-full gap-4">
        {result.tags.length > 0 ? (
          <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-4">
            {result.tags.map((tag) => (
              <Link
                href={`/tags/${tag._id}`}
                key={tag._id}
                className="shadow-light100_darknone"
              >
                <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                  <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                    <p className="paragraph-semibold text-dark300_light900">
                      {tag.name}
                    </p>
                  </div>
                  <p className="small-medium text-dark400_light500 mt-3.5">
                    <span className="body-semibold primary-text-gradient mr-2.5">
                      {tag.questions.length}+
                    </span>
                    questions
                  </p>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </>
  );
};

export default TagsPage;
