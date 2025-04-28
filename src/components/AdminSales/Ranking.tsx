import React from 'react';

interface Props {
  vendedoraMap: Record<string, string>;
  rankingData: Record<string, number>;
  title: string;
}

const Ranking: React.FC<Props> = ({ vendedoraMap, rankingData, title }) => (
  <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Nome da Vendedora</th>
          <th className="p-2">% de OK</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rankingData)
          .sort((a, b) => b[1] - a[1])
          .map(([id, perc]) => (
            <tr key={id} className="border-t">
              <td className="p-2">{vendedoraMap[id]}</td>
              <td className="p-2">{perc.toFixed(2)}%</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default Ranking;