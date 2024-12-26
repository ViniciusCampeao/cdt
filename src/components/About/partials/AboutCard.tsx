import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AboutCardProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AboutCard: React.FC<AboutCardProps> = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="bg-green-100 border border-green-300 rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
        <h3 className="text-xl font-semibold text-green-700">{title}</h3>
        <div className="text-green-700">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isOpen && <p className="mt-4 text-green-600">{content}</p>}
    </div>
  );
};

export default AboutCard;
