import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingStars from '../UI/RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import ViewingActions from './ViewingActions';
import EditingActions from './EditingActions';
import StatusDropdown from '../UI/StatusDropdown';

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
  pageId: string | "interview1";
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
        deleteInterview(interview.id);
      }
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <input
          type="text"
          value={editedInterview.interviewee_name}
          onChange={(e) => handleFieldChange('interviewee_name', e.target.value)}
          readOnly={!isEditing}
          className="bg-transparent"
        />
      </td>
      <StatusDropdown
        value={editedInterview.status}
        isEditing={isEditing}
        onChange={(value) => handleFieldChange('status', value)}
      />
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
          <EditingActions
            isNew={!interview}
            onSave={handleUpdateInterview}
            onCancel={handleCancelEdit}
          />
        ) : (
          <ViewingActions
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeleteInterview}
            canDelete={!!interview}
          />
        )}
      </td>
    </tr>
  );
};





export default EditableInterviewRow;