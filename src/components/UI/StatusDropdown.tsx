import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingStars from '../UI/RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faEdit } from '@fortawesome/free-solid-svg-icons';

const StatusDropdown: React.FC<{
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}> = ({ value, isEditing, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const statusOptions = ['Pending', 'Active', 'Completed'];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const cleanup = () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return cleanup;
  }, [isEditing]);

  return (
    <td className="py-3 px-6 text-left relative">
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          className={`py-1 px-3 rounded-full text-xs flex items-center justify-between ${
            value.toLowerCase() === 'pending'
              ? 'bg-yellow-200 text-yellow-600'
              : 'bg-green-200 text-green-600'
          }`}
          onClick={toggleDropdown}
          disabled={!isEditing}
        >
          {value}
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
                  option === value ? 'bg-gray-200 font-semibold' : ''
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </td>
  );
  };

export default StatusDropdown;