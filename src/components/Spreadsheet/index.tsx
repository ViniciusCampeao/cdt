import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import Form from './Form';
import RecordList from './RecordList';
import { Record } from './Types';

const Planilha: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [editRecordId, setEditRecordId] = useState<string | null>(null);
  const [recordData, setRecordData] = useState<{ name: string; number: string; status: string }>({
    name: '',
    number: '',
    status: '',
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'records'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data: Record[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as Record);
      });
      setRecords(data);
    }
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      if (editRecordId) {
        const recordRef = doc(db, 'records', editRecordId);
        await updateDoc(recordRef, { ...recordData, updatedAt: Timestamp.now() });
        setEditRecordId(null);
      } else {
        await addDoc(collection(db, 'records'), {
          uid: user.uid,
          ...recordData,
          createdAt: Timestamp.now(),
        });
      }
      setRecordData({ name: '', number: '', status: '' });
      fetchRecords();
    }
  };

  const handleDeleteRecord = async (id: string) => {
    await deleteDoc(doc(db, 'records', id));
    fetchRecords();
  };

  const handleEditRecord = (record: Record) => {
    setEditRecordId(record.id);
    setRecordData({ name: record.name, number: record.number, status: record.status });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:p-10 p-4 bg-gray-100">
      <div className="text-left p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Planilha</h2>
        <Form
          recordData={recordData}
          setRecordData={setRecordData}
          handleAddRecord={handleAddRecord}
          editRecordId={editRecordId}
        />
        <RecordList
          records={records}
          handleDeleteRecord={handleDeleteRecord}
          handleEditRecord={handleEditRecord}
        />
      </div>
    </div>
  );
};

export default Planilha;
