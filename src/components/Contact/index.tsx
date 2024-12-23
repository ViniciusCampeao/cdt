import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import SocialLink from './partials/SocialLink';

const ContactComponent: React.FC = () => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/cdtcornelioprocopio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: <FaInstagram size={30} />,
      label: "Instagram",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100082955937810",
      icon: <FaFacebook size={30} />,
      label: "Facebook",
    },
    {
      href: "https://wa.link/r5g673",
      icon: <FaWhatsapp size={30} />,
      label: "WhatsApp",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <h2 className="text-4xl font-bold text-green-700 mb-10 text-center">
        Precisa de ajuda? Entre em contato conosco
      </h2>
      <div className="flex space-x-10">
        {socialLinks.map((link, index) => (
          <SocialLink key={index} href={link.href} icon={link.icon} label={link.label} />
        ))}
      </div>
    </div>
  );
};

export default ContactComponent;
