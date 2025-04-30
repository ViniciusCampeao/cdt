import React, { useState } from 'react';

interface Props {
  statusSummary: Record<string, number>;
  totalQuantity: number;
  sales: { status: string; timestamp: { toDate: () => Date } }[]; // Adicionando vendas para filtrar por mês e ano
}

const StatusProportion: React.FC<Props> = ({ sales }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Mês atual
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Ano atual

  // Filtrar vendas por mês e ano
  const filteredSales = sales.filter((sale) => {
    const saleDate = sale.timestamp.toDate();
    return (
      saleDate.getMonth() + 1 === selectedMonth && saleDate.getFullYear() === selectedYear
    );
  });

  // Recalcular statusSummary e totalQuantity com base nas vendas filtradas
  const recalculatedStatusSummary = filteredSales.reduce((acc, sale) => {
    acc[sale.status] = (acc[sale.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recalculatedTotalQuantity = filteredSales.length;

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
      <h2 className="text-xl font-semibold mb-4">Proporção de Status (%)</h2>
      <div className="mb-4 flex gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por Mês:</h3>
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
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por Ano:</h3>
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
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Status</th>
            <th className="p-2">Porcentagem</th>
            <th className="p-2">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(recalculatedStatusSummary).map(([status, count]) => (
            <tr
              key={status}
              className={`border-t ${
                status === 'ok'
                  ? 'bg-green-100'
                  : status === 'cancelado'
                  ? 'bg-red-100'
                  : status === 'ligação'
                  ? 'bg-yellow-100'
                  : status === 'doc'
                  ? 'bg-blue-100'
                  : status === 'tudo'
                  ? 'bg-gray-100'
                  : ''
              }`}
            >
              <td className="p-2 capitalize text-center">{status}</td>
              <td className="p-2 text-center">
                {recalculatedTotalQuantity > 0
                  ? `${((count / recalculatedTotalQuantity) * 100).toFixed(2)}%`
                  : '0%'}
              </td>
              <td className="p-2 text-center">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusProportion;