import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label }) => (
  <button onClick={onClick} className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 m-2">
    {label}
  </button>
);
