import React, { useState } from 'react';

interface Props {
  vendedoraMap: Record<string, string>;
  rankingData: Record<string, number>;
  title: string;
  sales: { vendedorId: string; status: string; timestamp: { toDate: () => Date } }[]; // Adicionando vendas para filtrar por mês
}

const Ranking: React.FC<Props> = ({ vendedoraMap, title, sales }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Mês atual
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Ano atual

  // Filtrar vendas por mês e ano
  const filteredSales = sales.filter((sale) => {
    const saleDate = sale.timestamp.toDate();
    return (
      saleDate.getMonth() + 1 === selectedMonth && saleDate.getFullYear() === selectedYear
    );
  });

  // Recalcular ranking com base nas vendas filtradas
  const rankingData = filteredSales.reduce((acc, sale) => {
    if (sale.status === 'ok') {
      acc[sale.vendedorId] = (acc[sale.vendedorId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalSalesByVendedor = filteredSales.reduce((acc, sale) => {
    acc[sale.vendedorId] = (acc[sale.vendedorId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calcular porcentagem de "ok" para cada vendedor
  const rankingPercentage = Object.keys(rankingData).reduce((acc, vendedorId) => {
    const total = totalSalesByVendedor[vendedorId] || 1; // Evitar divisão por zero
    acc[vendedorId] = (rankingData[vendedorId] / total) * 100;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="mb-4 flex gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nome</th>
            <th className="p-2">% OK</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rankingPercentage)
            .sort((a, b) => b[1] - a[1])
            .map(([id, perc], index) => (
              <tr
                key={id}
                className={`border-t ${
                  index === 0
                    ? 'bg-yellow-300' // Ouro
                    : index === 1
                    ? 'bg-gray-200' // Prata
                    : index === 2
                    ? 'bg-orange-200' // Bronze
                    : ''
                }`}
              >
                <td className="p-2">{vendedoraMap[id]}</td>
                <td className="p-2">{perc.toFixed(2)}%</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;