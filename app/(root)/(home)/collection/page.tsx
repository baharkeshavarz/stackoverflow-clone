import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result && result!.questions!.length > 0 ? (
          result!.questions!.map((question: any) => (
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
            title="Theres's no question saved to answer."
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
