import React from 'react';

interface PerformanceProps {
  data: {
    campaign: string;
    ctr: number;
    cpc: number;
    roi: number;
  }[];
}

const Performance: React.FC<PerformanceProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Desempenho de Campanhas de Marketing</h3>
      <ul className="list-disc ml-5">
        {data.map(campaign => (
          <li key={campaign.campaign} className="text-gray-600">
            {campaign.campaign} - CTR: {campaign.ctr}%, CPC: ${campaign.cpc}, ROI: {campaign.roi}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Performance;
