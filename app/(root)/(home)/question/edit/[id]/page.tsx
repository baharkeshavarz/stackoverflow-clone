import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types/index";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;
