// components/signup/SignUpFormField.tsx
import React from 'react';

interface SignUpFormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const SignUpFormField: React.FC<SignUpFormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="appearance-none block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default SignUpFormField;