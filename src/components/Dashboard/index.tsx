import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MarketingMetrics from './partials/Mkt';
import ConversionByChannel from './partials/Channel';
import CampaignPerformance from './partials/Performance';
import DashboardButton from './partials/DashboardButton';
import 'chart.js/auto';

const AdminDashboard: React.FC = () => {
  const [marketingData, setMarketingData] = useState<{ labels: string[]; clicks: number[]; leads: number[]; conversions: number[] }>({ labels: [], clicks: [], leads: [], conversions: [] });
  const [channelData, setChannelData] = useState<{ channel: string; conversions: number }[]>([]);
  const [campaignData, setCampaignData] = useState<{ campaign: string; ctr: number; cpc: number; roi: number }[]>([]);

  useEffect(() => {
    const fetchMarketingData = async () => {
      const data = [
        { date: '2025-01-01', clicks: 100, leads: 40, conversions: 5 },
        { date: '2025-01-02', clicks: 150, leads: 30, conversions: 10 },
        { date: '2025-01-03', clicks: 200, leads: 40, conversions: 15 },
        { date: '2025-01-04', clicks: 250, leads: 150, conversions: 20 },
        { date: '2025-01-05', clicks: 300, leads: 60, conversions: 25 },
      ];

      const labels = data.map(item => item.date);
      const clicks = data.map(item => item.clicks);
      const leads = data.map(item => item.leads);
      const conversions = data.map(item => item.conversions);

      setMarketingData({ labels, clicks, leads, conversions });
    };

    const fetchChannelData = async () => {
      const data = [
        { channel: 'Email', conversions: 50 },
        { channel: 'Redes Sociais', conversions: 120 },
        { channel: 'Anúncios Pagos', conversions: 200 },
      ];

      setChannelData(data);
    };

    const fetchCampaignData = async () => {
      const data = [
        { campaign: 'Campanha A', ctr: 5.2, cpc: 1.2, roi: 3.5 },
        { campaign: 'Campanha B', ctr: 4.8, cpc: 1.5, roi: 4.0 },
        { campaign: 'Campanha C', ctr: 6.0, cpc: 1.1, roi: 3.8 },
      ];

      setCampaignData(data);
    };

    fetchMarketingData();
    fetchChannelData();
    fetchCampaignData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center p-10 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          <MarketingMetrics data={marketingData} />
          <ConversionByChannel data={channelData} />
          <CampaignPerformance data={campaignData} />
          <DashboardButton label="Planilha" path="/planilha" />
          <DashboardButton label="Tabela de médicos" path="/doctors" />
          <DashboardButton label="Contatos importantes" path="/importantNumbers" />
          <DashboardButton label="Chat IA para textos" path="/chatIA" />
          <DashboardButton label="Extração de números" path="/extract" />
          <DashboardButton label="BOT Whatsapp" path="/BotWpp" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
