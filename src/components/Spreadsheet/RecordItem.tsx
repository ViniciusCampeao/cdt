import React, { useState } from 'react';
import { Record } from './Types';

interface RecordItemProps {
  record: Record;
  handleDeleteRecord: (id: string) => void;
  handleEditRecord: (record: Record) => void;
}

const RecordItem: React.FC<RecordItemProps> = ({ record, handleDeleteRecord, handleEditRecord }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-2 cursor-pointer" onClick={toggleExpand}>
      <div className="flex justify-between items-center">
        <div>
          <span>{record.name}</span>
        </div>
        <div>
          <a href={`https://wa.me/${record.number}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition">
            {record.number}
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); handleEditRecord(record); }}
            className="ml-4 text-blue-600 hover:text-blue-800 transition"
          >
            Editar
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeleteRecord(record.id); }}
            className="ml-4 text-red-600 hover:text-red-800 transition"
          >
            Excluir
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="pt-2">
          <span>{record.status}</span>
        </div>
      )}
    </div>
  );
};

export default RecordItem;
