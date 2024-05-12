import React, { useState } from 'react';
import axios from 'axios';
import RatingStars from './RatingStars';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
interface Interview {
  id: number;
  interviewee_name: string;
  status: string;
  feedback: string;
  rating: number;
}

interface InterviewRowProps {
  interview: Interview;
  updateInterview: (updatedInterview: Interview) => void;
}

const InterviewRow: React.FC<InterviewRowProps> = ({ interview, updateInterview }) => {
  const [editedInterview, setEditedInterview] = useState<Interview>(interview);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field: keyof Interview, value: string | number) => {
    setEditedInterview((prevInterview) => ({
      ...prevInterview,
      [field]: value,
    }));
  };

  const handleUpdateInterview = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.put(`${backendUrl}/update-interview`, editedInterview, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      updateInterview(editedInterview);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedInterview(interview);
    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-100"
      onDoubleClick={handleDoubleClick}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <input
          type="text"
          value={editedInterview.interviewee_name}
          onChange={(e) => handleFieldChange('interviewee_name', e.target.value)}
          readOnly={!isEditing}
          className="bg-transparent"
        />
      </td>
      <td className="py-3 px-6 text-left">
        <input
          type="text"
          value={editedInterview.status}
          onChange={(e) => handleFieldChange('status', e.target.value)}
          readOnly={!isEditing}
          className={`py-1 px-3 rounded-full text-xs ${
            editedInterview.status.toLowerCase() === 'pending'
              ? 'bg-yellow-200 text-yellow-600'
              : 'bg-green-200 text-green-600'
          }`}
        />
      </td>
      <td className="py-3 px-6 text-left">
        <input
          type="text"
          value={editedInterview.feedback}
          onChange={(e) => handleFieldChange('feedback', e.target.value)}
          readOnly={!isEditing}
          className="bg-transparent"
        />
      </td>
      <td className="py-3 px-6 text-left flex items-center">
        <input
          type="number"
          value={editedInterview.rating}
          onChange={(e) => handleFieldChange('rating', Number(e.target.value))}
          readOnly={!isEditing}
          className="bg-transparent w-16 mr-2"
        />
        <RatingStars rating={editedInterview.rating} />
      </td>
      <td className="py-3 px-6 text-center">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdateInterview}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default InterviewRow;