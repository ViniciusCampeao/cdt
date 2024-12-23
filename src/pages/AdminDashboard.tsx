import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <div className="text-left p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Admin Dashboard</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/planilha')}
            className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition"
          >
            Planilha
          </button>
          <button
            onClick={() => navigate('/conta')}
            className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition"
          >
            Conta
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AdminDashboard;
