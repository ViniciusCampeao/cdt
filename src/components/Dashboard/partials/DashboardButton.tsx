import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardButtonProps {
  label: string;
  path: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ label, path }) => {
  return (
    <Link to={path} className="block p-4 text-black uppercase text-center rounded-lg border-2 border-black hover:scale-105 transition duration-200">
      {label}
    </Link>
  );
};

export default DashboardButton;
