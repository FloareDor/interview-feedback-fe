import React, { useState } from 'react';
import axios from 'axios';
import RatingStars from './RatingStars';
import deleteIcon from '../../../public/images/delete.svg'
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Interview {
  id: number;
  interviewee_name: string;
  status: string;
  feedback: string;
  rating: number;
}

interface EditableInterviewRowProps {
  interview?: Interview;
  updateInterview: (updatedInterview: Interview) => void;
  addInterview: (newInterview: Interview) => void;
  deleteInterview: (interviewId: number) => void;
  pageId: string | null;
}

const EditableInterviewRow: React.FC<EditableInterviewRowProps> = ({
  interview,
  updateInterview,
  addInterview,
  deleteInterview,
  pageId,
}) => {
  const [editedInterview, setEditedInterview] = useState<Interview>(
    interview || {
      id: 0,
      interviewee_name: '',
      status: '',
      feedback: '',
      rating: 0,
    }
  );
  const [isEditing, setIsEditing] = useState(!interview);

  const handleFieldChange = (field: keyof Interview, value: string | number) => {
    setEditedInterview((prevInterview) => ({
      ...prevInterview,
      [field]: value,
    }));
  };

  const handleUpdateInterview = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (interview) {
        const response = await axios.put(`${backendUrl}/update-interview`, editedInterview, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        updateInterview(editedInterview);
      } else {
        const response = await axios.post(
          `${backendUrl}/add-interview`,
          {
            page_id: pageId,
            ...editedInterview,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        addInterview(response.data);
        setEditedInterview({
          id: 0,
          interviewee_name: '',
          status: '',
          feedback: '',
          rating: 0,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating/adding interview:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedInterview(interview || {
      id: 0,
      interviewee_name: '',
      status: '',
      feedback: '',
      rating: 0,
    });
    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleDeleteInterview = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(`${backendUrl}/delete-interview`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          id: interview?.id,
        },
      });
      console.log(response.data);
      if (interview) {
        deleteInterview(interview.id); // Call the deleteInterview function passed as a prop
      }
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100" onDoubleClick={handleDoubleClick}>
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              {interview ? 'Save' : 'Add'}
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </>
      ) : interview ? (
        <button
        onClick={handleDeleteInterview}
        className="bg-transparent text-red-500 hover:text-red-700 text-sm font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      ) : null}
      </td>
    </tr>
  );
};

export default EditableInterviewRow;