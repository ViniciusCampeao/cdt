import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardButtonProps {
  label: string;
  path: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ label, path }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition"
    >
      {label}
    </button>
  );
};

export default DashboardButton;
