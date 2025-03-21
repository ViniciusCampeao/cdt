import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import DashboardButton from './partials/DashboardButton';
import 'chart.js/auto';

const AdminDashboard: React.FC = () => {


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center p-10 bg-gray-100">
      <h1 className="mb-10 text-3xl uppercase">Central de Recursos para Vendedores</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <DashboardButton label="Planilha" path="/planilha" />
          <DashboardButton label="Tabela de médicos" path="/doctors" />
          <DashboardButton label="Contatos importantes" path="/importantNumbers" />
          <DashboardButton label="Chat IA para textos" path="/chatIA" />
          <DashboardButton label="Extração de números" path="/extract" />
          <DashboardButton label="BOT Whatsapp" path="/BotWpp" />
          <DashboardButton label="VPN" path="/Vpn" />
          <DashboardButton label="Links uteis" path="/APK" />
          <DashboardButton label="Lista de Contatos" path="/contactList" />
          <DashboardButton label="Extrair números para TIM" path="/tim" />
          <DashboardButton label="BI" path="/bi" />
          <DashboardButton label="Verificar Bandeira do Cartão" path="/cardChecker" />
          <DashboardButton label="Buscar CEP" path="/addressLookup" />
          <DashboardButton label="Enviar doc" path="/docSend" />
          <DashboardButton label="Feedback" path="/feedback" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
