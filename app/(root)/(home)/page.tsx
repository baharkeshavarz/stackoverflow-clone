import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.actions";
import Link from "next/link";

export default async function Home() {
  const result = await getQuestions({});
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question">
          <Button className="primary-gradient min-h-[46px] px-4 py-2 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result && result!.questions!.length > 0 ? (
          result!.questions!.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              answers={question.answers.length}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              tags={question.tags}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Theres's no question to answer."
            description="Be the first to break the silence! Ask a Question and kickstart the
              discussion. Our query could be the next big thing others learn from. Get
              involved!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
