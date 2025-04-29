import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface Props {
  chartData: ChartData<'pie'> | null;
  options: ChartOptions<'pie'>;
}

const ChartSection: React.FC<Props> = ({ chartData, options }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-lg md:w-[35%] md:h-[35%] mx-auto flex items-center justify-center">
    {chartData ? (
      <Pie data={chartData} options={options} />
    ) : (
      <p className="text-center">Carregando dados...</p>
    )}
  </div>
);

export default ChartSection;