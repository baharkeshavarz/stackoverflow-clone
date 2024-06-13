import { getUserAnswers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types/index";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({
  searchParams,
  userId,
  clerkId = "",
}: AnswerTabProps) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          title={answer.title}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={result?.isNext}
        />
      </div>
    </>
  );
};

export default AnswerTab;
