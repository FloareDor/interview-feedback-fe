// StatusDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface StatusDropdownProps {
  status: string;
  isEditing: boolean;
  onStatusChange: (status: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  status,
  isEditing,
  onStatusChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statusOptions = ['Pending', 'Active', 'Completed'];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: string) => {
    onStatusChange(option);
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
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        className={`py-1 px-3 rounded-full text-xs flex items-center justify-between ${
          status.toLowerCase() === 'pending'
            ? 'bg-yellow-200 text-yellow-600'
            : 'bg-green-200 text-green-600'
        }`}
        onClick={toggleDropdown}
        disabled={!isEditing}
      >
        {status}
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
                option === status ? 'bg-gray-200 font-semibold' : ''
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;