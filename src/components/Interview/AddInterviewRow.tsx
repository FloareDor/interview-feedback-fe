import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface AddInterviewRowProps {
  pageId: number;
  setInterviews: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddInterviewRow: React.FC<AddInterviewRowProps> = ({
  pageId,
  setInterviews,
}) => {
  const [interviewee_name, setIntervieweeName] = useState('');
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(
      `${backendUrl}/add-interview`,
      {
        page_id: pageId,
        interviewee_name,
        status,
        feedback,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setInterviews((prevInterviews) => [...prevInterviews, response.data]);
    setIntervieweeName('');
    setStatus('');
    setFeedback('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="interviewee_name"
            className="block text-sm font-medium text-gray-700"
          >
            Interviewee Name
          </label>
          <input
            type="text"
            id="interviewee_name"
            value={interviewee_name}
            onChange={(e) => setIntervieweeName(e.target.value)}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Interview Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700"
          >
            Interview Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={3}
          />
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min={1}
            max={5}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Interview
      </button>
    </form>
  );
};

export default AddInterviewRow;