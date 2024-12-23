import React, { useState } from 'react';
import { Record } from './Types';
import { format } from 'date-fns';
import firebase from 'firebase/compat/app';

interface RecordItemProps {
  record: Record;
  handleDeleteRecord: (id: string) => void;
  handleEditRecord: (record: Record) => void;
}

const RecordItem: React.FC<RecordItemProps> = ({ record, handleDeleteRecord, handleEditRecord }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleNumberClick = (number: string) => {
    const whatsappUrl = `https://wa.me/${number}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatDate = (date: firebase.firestore.Timestamp | undefined) => {
    if (date) {
      return format(date.toDate(), 'dd/MM/yyyy HH:mm');
    }
    return '';
  };

  return (
    <div className="p-4 bg-gray-200 rounded-lg flex justify-between items-center mb-2 cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
      <div>
        <p className="font-semibold">{record.name}</p>
        <p className="text-blue-500 hover:underline" onClick={(e) => { e.stopPropagation(); handleNumberClick(record.number); }}>
          {record.number}
        </p>
        {showDetails && <p>{record.status}</p>}
        <p className="text-sm text-gray-500">{formatDate(record.createdAt)}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={(e) => { e.stopPropagation(); handleEditRecord(record); }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDeleteRecord(record.id); }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default RecordItem;
