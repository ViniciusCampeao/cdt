import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Header from '../Header';
import Footer from '../Footer';
import UserSelect from './partials/UserSelect';
import SaleDetails from './partials/SaleDetails';
import SaleStatus from './partials/SaleStatus';

interface User {
  name: string;
  isAdmin: boolean;
  id: string;
}

const AddSeller = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [status, setStatus] = useState<string>('ok');
  const [tipoVenda, setTipoVenda] = useState<string>('filiação');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);

        const usersList: User[] = [];
        snapshot.forEach((doc) => {
          const userData = doc.data() as User;
          if (userData.isAdmin) {
            usersList.push({ ...userData, id: doc.id });
          }
        });

        setUsers(usersList);
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedUser = users.find((user) => user.name === selectedName);
    if (selectedUser) {
      try {
        const salesRef = collection(db, 'sales');
        await addDoc(salesRef, {
          vendedorId: selectedUser.id,
          vendedorName: selectedUser.name,
          matricula,
          status,
          tipoVenda,
          timestamp: Timestamp.now(),
        });

        console.log(`Venda adicionada para o usuário: ${selectedUser.name}`);
        setSelectedName('');
        setMatricula('');
        setStatus('ok');
        setTipoVenda('filiação');
      } catch (error) {
        console.error('Erro ao adicionar a venda:', error);
      }
    }
  };

  return (
    <div>
      <Header />
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Adicionar Venda</h2>
          <UserSelect users={users} selectedName={selectedName} setSelectedName={setSelectedName} />
          <SaleDetails matricula={matricula} setMatricula={setMatricula} tipoVenda={tipoVenda} setTipoVenda={setTipoVenda} />
          <SaleStatus status={status} setStatus={setStatus} />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Adicionar Venda
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddSeller;