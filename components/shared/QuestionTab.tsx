import { getUserQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types/index";
import QuestionCard from "../cards/QuestionCard";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionTab = async ({
  searchParams,
  userId,
  clerkId = "",
}: QuestionTabProps) => {
  const result = await getUserQuestions({ userId, page: 1 });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          answers={question.answers.length}
          author={question.author}
          upvotes={question.upvotes.length}
          views={question.views}
          tags={question.tags}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
