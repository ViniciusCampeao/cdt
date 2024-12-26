import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import DashboardButton from './partials/DashboardButton';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
        <div className="text-left p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Admin Dashboard</h2>
          <div className="space-y-4">
            <DashboardButton label="Planilha" path="/planilha" />
            <DashboardButton label="Extração de números" path="/extract" />
            <DashboardButton label="Artes" path="/arts" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
