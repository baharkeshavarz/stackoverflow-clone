import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";

interface QuestionCardProps {
  _id: string;
  title: string;
  answers: Array<Object>;
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  tags: {
    _id: string;
    name: string;
  }[];
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  answers,
  author,
  upvotes,
  views,
  tags,
  createdAt,
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper w-full rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimeStamp(createdAt)}
        </span>
        <Link
          href={`/question/${_id}`}
          className="text-dark200_light900 base-semibold sm:h3-semibold line-clamp-1 flex-1 py-2"
        >
          <h3>{title}</h3>
        </Link>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={_id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={` -asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(upvotes)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye "
          value={formatAndDivideNumber(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
