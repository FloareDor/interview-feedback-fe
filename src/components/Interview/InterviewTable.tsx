import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditableInterviewRow from './EditableInterviewRow';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Interview {
  id: number;
  interviewee_name: string;
  status: string;
  feedback: string;
  rating: number;
}

interface InterviewTableProps {
  pageId: string;
}

const InterviewTable: React.FC<InterviewTableProps> = ({ pageId }) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${backendUrl}/get-all-interviews/${pageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setInterviews(response.data);
    };

    fetchInterviews();
  }, [pageId]);

  const updateInterview = (updatedInterview: Interview) => {
    setInterviews((prevInterviews) =>
      prevInterviews.map((interview) =>
        interview.id === updatedInterview.id ? updatedInterview : interview
      )
    );
  };

  const deleteInterview = (interviewId: number) => {
    setInterviews((prevInterviews) =>
      prevInterviews.filter((interview) => interview.id !== interviewId)
    );
  };

  const addInterview = (newInterview: Interview) => {
    setInterviews((prevInterviews) => [...prevInterviews, newInterview]);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Status (/5)</th>
              <th className="py-3 px-6 text-left">Feedback</th>
              <th className="py-3 px-6 text-left">Rating</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {interviews.map((interview) => (
              <EditableInterviewRow
                key={interview.id}
                interview={interview}
                updateInterview={updateInterview}
                addInterview={addInterview}
                deleteInterview={deleteInterview}
                pageId={pageId}
              />
            ))}
            <EditableInterviewRow
              updateInterview={updateInterview}
              addInterview={addInterview}
              deleteInterview={deleteInterview}
              pageId={pageId}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewTable;