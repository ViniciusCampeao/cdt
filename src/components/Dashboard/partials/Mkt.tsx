import React from 'react';
import { Line } from 'react-chartjs-2';

interface MarketingMetricsChartProps {
  data: {
    labels: string[];
    clicks: number[];
    leads: number[];
    conversions: number[];
  };
}

const Mkt: React.FC<MarketingMetricsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Cliques em Anúncios',
        data: data.clicks,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Leads Gerados',
        data: data.leads,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Conversões',
        data: data.conversions,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Métricas de Marketing</h3>
      <Line data={chartData} />
    </div>
  );
};

export default Mkt;
