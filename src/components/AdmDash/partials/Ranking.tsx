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
          <th className="p-2">Nome</th>
          <th className="p-2">% OK</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rankingData)
          .sort((a, b) => b[1] - a[1])
          .map(([id, perc], index) => (
            <tr
              key={id}
              className={`border-t ${
                index === 0
                  ? 'bg-yellow-300' 
                  : index === 1
                  ? 'bg-gray-200' 
                  : index === 2
                  ? 'bg-orange-200' 
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

export default Ranking;