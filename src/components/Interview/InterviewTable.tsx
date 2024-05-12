import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InterviewRow from './InterviewRow';
import AddInterviewRow from './AddInterviewRow';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Interview {
  id: number;
  interviewee_name: string;
  status: string;
  feedback: string;
  rating: number;
}

const InterviewTable: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [pageId, setPageId] = useState<number>(1); // Default page ID

  useEffect(() => {
    const fetchInterviews = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${backendUrl}/get-all-interviews/${pageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setInterviews(response.data);
    };

    fetchInterviews();
  }, [pageId]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Interview Status</th>
              <th className="py-3 px-6 text-left">Interview Feedback</th>
              <th className="py-3 px-6 text-left">Rating</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {interviews.map((interview) => (
              <InterviewRow key={interview.id} interview={interview} />
            ))}
          </tbody>
        </table>
        <AddInterviewRow pageId={pageId} setInterviews={setInterviews} />
      </div>
    </div>
  );
};

export default InterviewTable;