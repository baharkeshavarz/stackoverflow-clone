import React from "react";

interface QuestionCardProps {
  id: number;
  title: string;
  answers: Array<Object>;
  author: {
    _id: number;
    name: string;
    picture: string;
  }[];
  upvotes: number;
  views: number;
  tags: {
    _id: number;
    name: string;
  }[];
  createdAt: Date;
}

const QuestionCard = ({
  id,
  title,
  answers,
  author,
  upvotes,
  views,
  tags,
  createdAt,
}: QuestionCardProps) => {
  return (
      <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
         

       </div>
  );
};

export default QuestionCard;
