import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const ChatWithHuggingFace: React.FC = () => {
  return (
    <div>
      <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Chat com IA</h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center">  
        <Link
          to="https://hf.co/chat/assistant/676ff71a1c2e494608d80284"
          target='_blank'
          className="text-center bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Redirecionamento para o Chat (Terceirizado)
        </Link>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ChatWithHuggingFace;
