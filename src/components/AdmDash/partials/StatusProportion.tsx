import React from 'react';

interface Props {
  statusSummary: Record<string, number>;
  totalQuantity: number;
}

const StatusProportion: React.FC<Props> = ({ statusSummary, totalQuantity }) => (
  <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
    <h2 className="text-xl font-semibold mb-4">Proporção de Status (%)</h2>
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Status</th>
          <th className="p-2">Porcentagem</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(statusSummary).map(([status, count]) => (
          <tr key={status} className="border-t">
            <td className="p-2 capitalize">{status}</td>
            <td className="p-2">
              {totalQuantity > 0
                ? `${((count / totalQuantity) * 100).toFixed(2)}%`
                : '0%'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StatusProportion;