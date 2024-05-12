import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import RatingStars from './RatingStars';
import deleteIcon from '../../../public/images/delete.svg';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faEdit } from '@fortawesome/free-solid-svg-icons';

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
  deleteInterview: (interviewId: number) => void;
}

const InterviewRow: React.FC<InterviewRowProps> = ({ interview, updateInterview, deleteInterview }) => {
  const [editedInterview, setEditedInterview] = useState<Interview>(interview);
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = ['Pending', 'Active', 'Done'];

  const handleFieldChange = (field: keyof Interview, value: string | number) => {
    if (field === 'status') {
      setEditedInterview((prevInterview) => ({
        ...prevInterview,
        [field]: value.toString(),
      }));
    } else {
      setEditedInterview((prevInterview) => ({
        ...prevInterview,
        [field]: value,
      }));
    }
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };
  
  const handleOptionSelect = (option: string) => {
    handleFieldChange('status', option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(event.target as Node).contains(dropdownRef.current)) {
        setIsDropdownOpen(false);
      }
    };
  
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

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

  const handleDeleteInterview = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(`${backendUrl}/delete-interview`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          id: interview.id,
        },
      });
      console.log(response.data);
      deleteInterview(interview.id);
    } catch (error) {
      console.error('Error deleting interview:', error);
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
      <td className="py-3 px-6 text-left relative">
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            className={`py-1 px-3 rounded-full text-xs flex items-center justify-between ${
              editedInterview.status.toLowerCase() === 'pending'
                ? 'bg-yellow-200 text-yellow-600'
                : 'bg-green-200 text-green-600'
            }`}
            onClick={toggleDropdown}
            disabled={!isEditing}
          >
            {editedInterview.status}
            <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
          </button>
          {isDropdownOpen && (
  <div
    className="absolute z-10 bg-white shadow-md rounded-md mt-2 transition duration-300 ease-in-out transform origin-top"
    style={{
      transform: isDropdownOpen ? 'scaleY(1) opacity(1)' : 'scaleY(0) opacity(0)',
    }}
  >
    {statusOptions.map((option) => (
      <button
        key={option}
        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
          option === editedInterview.status ? 'bg-gray-200 font-semibold' : ''
        }`}
        onClick={() => handleOptionSelect(option)}
        onDoubleClick={handleDoubleClick}
        
      >
        {option}
      </button>
    ))}
  </div>
)}
        </div>
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
              className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleDeleteInterview}
            className="bg-transparent text-red-500 hover:text-red-700 text-sm font-bold py-1 px-2 rounded"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </td>
    </tr>
  );
};

export default InterviewRow;