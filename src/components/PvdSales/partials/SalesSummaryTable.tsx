import React from 'react';

interface Sale {
  status: string;
  quantidade: number;
}

interface Props {
  salesList: Sale[];
}

const SalesSummaryTable: React.FC<Props> = ({ salesList }) => {
  const summary = salesList.reduce<Record<string, number>>((acc, sale) => {
    acc[sale.status] = (acc[sale.status] || 0) + sale.quantidade;
    return acc;
  }, {});

  const totalQuantity = Object.values(summary).reduce((acc, qty) => acc + qty, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Resumo Percentual das Vendas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Porcentagem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(summary).map(([status, qty], index) => {
              const percent = totalQuantity > 0 ? ((qty / totalQuantity) * 100).toFixed(1) : '0';

              return (
                <tr key={index} className={status === 'ok' ? 'bg-green-50' : 'bg-yellow-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">{status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{percent}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">{qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesSummaryTable;