import React from 'react';
import RatingStars from './RatingStars';

interface Interview {
  id: number;
  interviewee_name: string;
  status: string;
  feedback: string;
  rating: number;
}

interface InterviewRowProps {
  interview: Interview;
}

const InterviewRow: React.FC<InterviewRowProps> = ({ interview }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        {interview.interviewee_name}
      </td>
      <td className="py-3 px-6 text-left">
        <span
          className={`${
            interview.status.toLowerCase() === 'pending'
              ? 'bg-yellow-200 text-yellow-600'
              : 'bg-green-200 text-green-600'
          } py-1 px-3 rounded-full text-xs`}
        >
          {interview.status}
        </span>
      </td>
      <td className="py-3 px-6 text-left">{interview.feedback}</td>
      <td className="py-3 px-6 text-left">
        <RatingStars rating={interview.rating} />
      </td>
    </tr>
  );
};

export default InterviewRow;