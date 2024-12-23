import React from 'react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-green-700 transition"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default SocialLink;
