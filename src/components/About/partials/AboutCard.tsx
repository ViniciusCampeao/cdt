import React from 'react';
import { CSSTransition } from 'react-transition-group';

interface AboutCardProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AboutCard: React.FC<AboutCardProps> = ({ title, content, isOpen, onClick }) => {
  return (
    <div
      className="bg-green-500 text-white p-6 rounded-lg cursor-pointer transition-transform transform hover:scale-105 mb-4"
      onClick={onClick}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="content"
        unmountOnExit
      >
        <p className="text-sm">{content}</p>
      </CSSTransition>
    </div>
  );
};

export default AboutCard;
