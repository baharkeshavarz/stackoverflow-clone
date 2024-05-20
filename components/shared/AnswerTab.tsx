import { getUserAnswers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types/index";
import AnswerCard from "../cards/AnswerCard";

interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({
  searchParams,
  userId,
  clerkId = "",
}: AnswerTabProps) => {
  const result = await getUserAnswers({ userId, page: 1 });
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
    </>
  );
};

export default AnswerTab;
