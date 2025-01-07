import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardButtonProps {
  label: string;
  path: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ label, path }) => {
  return (
    <Link to={path} className="block p-4 bg-green-500 text-white text-center rounded-lg shadow-md hover:bg-green-600 transition duration-200">
      {label}
    </Link>
  );
};

export default DashboardButton;
