import React from 'react';

interface Sale {
  matricula: string;
  status: string;
  quantidade: number;
}

interface Props {
  salesList: Sale[];
}

const SalesDetailTable: React.FC<Props> = ({ salesList }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
    <h2 className="text-2xl font-semibold mb-4 text-center">Detalhamento das Vendas</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Matrícula
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {salesList.length > 0 ? (
            salesList.map((sale, index) => (
              <tr key={index} className={sale.status === 'ok' ? 'bg-green-50' : 'bg-yellow-50'}>
                <td className="px-6 py-4 whitespace-nowrap">{sale.matricula}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center px-6 py-4">
                Nenhuma venda encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default SalesDetailTable;