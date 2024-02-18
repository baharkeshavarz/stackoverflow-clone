import React from 'react'
import Filter from './search/Filter';
import { AnswerFilters } from '@/constants/filters';
import { getAnswers } from '@/lib/actions/answer.actions';

interface AllAnwsersProps {
    questionId: string;
    userId: string;
    totalAnswers: number;
    page?: number;
    filter?: number
}

const AllAnwsers = async({questionId, userId, totalAnswers, page, filter}: AllAnwsersProps) => {
  const result = await getAnswers({
    questionId,
  });  
  return (
    <div className="mt-11">
       <div className="flex items-center justify-between">
          <h3 className="primary-text-gradient ">{totalAnswers} answers</h3>
          <Filter filters={AnswerFilters}/>
       </div>
       <div>
         {result.answers.map(answer => (
            <article key={answer._id}>
                {answer._id}
            </article>
         ))}
       </div>
    </div> 
  )
}

export default AllAnwsers
