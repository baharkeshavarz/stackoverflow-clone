"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.actions";
import { viewQuestion } from "@/lib/actions/interaction.actions";
import {
  downvoteQuestion,
  upvoteQuestion
} from "@/lib/actions/question.actions";
import { toggleSaveQuestion } from "@/lib/actions/user.actions";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { undefined } from "zod";
import { useToast } from "@/components/ui/use-toast";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved
}: VotesProps) => {
  const pathname = usePathname();
  const { toast } = useToast();

  const handleVote = async (action: string) => {
    if (!userId)
      return toast({
        title: "Please log in!",
        description: "You must be logged in!"
      });
    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        });
      }

      return toast({
        title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
        variant: !hasupVoted ? "default" : "destructive"
      });
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        });
      }

      return toast({
        title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive"
      });
    }
  };
  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname
    });

    return toast({
      title: `Question ${!hasSaved ? "Saved in" : "Removed from"} your collection!`,
      variant: !hasSaved ? "default" : "destructive"
    });
  };

  useEffect(() => {
    const viewQuestionFunc = async () => {
      await viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined
      });
    };
    viewQuestionFunc();
  }, [itemId, userId, pathname]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            className="cursor-pointer"
            alt="upvote"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light_900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            className="cursor-pointer"
            alt="downvote"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light_900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          className="cursor-pointer"
          alt="star"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
