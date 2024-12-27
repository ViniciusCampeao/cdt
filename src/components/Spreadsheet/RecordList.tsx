import React from 'react';
import { Record } from './Types';

interface RecordListProps {
  records: Record[];
  handleDeleteRecord: (id: string) => void;
  handleEditRecord: (record: Record) => void;
}

const RecordList: React.FC<RecordListProps> = ({ records, handleDeleteRecord, handleEditRecord }) => {
  return (
    <div>
      {records.map((record) => (
        <div
          key={record.id}
          className={`p-4 my-2 rounded shadow-md border ${
            record.color === 'green' ? 'bg-green-100 border-green-300' :
            record.color === 'red' ? 'bg-red-100 border-red-300' :
            'bg-yellow-100 border-yellow-300'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{record.name}</h3>
              <a
                href={`https://wa.me/${record.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {record.number}
              </a>
              <p>{record.status}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEditRecord(record)} className="text-blue-500 hover:text-blue-700">Editar</button>
              <button onClick={() => handleDeleteRecord(record.id)} className="text-red-500 hover:text-red-700">Deletar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordList;
