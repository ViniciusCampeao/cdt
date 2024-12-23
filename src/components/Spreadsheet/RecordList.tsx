import React from 'react';
import RecordItem from './RecordItem';
import { Record } from './Types';

interface RecordListProps {
  records: Record[];
  handleDeleteRecord: (id: string) => void;
  handleEditRecord: (record: Record) => void;
}

const RecordList: React.FC<RecordListProps> = ({ records, handleDeleteRecord, handleEditRecord }) => {
  return (
    <div className="records mt-6 space-y-4">
      {records.map(record => (
        <RecordItem
          key={record.id}
          record={record}
          handleDeleteRecord={handleDeleteRecord}
          handleEditRecord={handleEditRecord}
        />
      ))}
    </div>
  );
};

export default RecordList;
