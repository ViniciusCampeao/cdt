import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Header from '../Header';
import Footer from '../Footer';

interface User {
  name: string;
  isAdmin: boolean;
  id: string;
}

const AddSeller = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [matriculas, setMatriculas] = useState<string>('');
  const [tiposVenda, setTiposVenda] = useState<string>('');
  const [statuses, setStatuses] = useState<string>('');

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

    if (!selectedUserId) {
      alert('Selecione um vendedor.');
      return;
    }

    const matriculaList = matriculas.split('\n').map((m) => m.trim()).filter((m) => m);
    const tipoVendaList = tiposVenda.split('\n').map((t) => t.trim().toLowerCase()).filter((t) => t);
    const statusList = statuses.split('\n').map((s) => s.trim().toLowerCase()).filter((s) => s);

    if (
      matriculaList.length !== tipoVendaList.length ||
      matriculaList.length !== statusList.length
    ) {
      alert('As listas de matrículas, tipos de venda e status devem ter o mesmo tamanho.');
      return;
    }

    try {
      const salesRef = collection(db, 'sales');
      for (let i = 0; i < matriculaList.length; i++) {
        await addDoc(salesRef, {
          vendedorId: selectedUserId,
          vendedorName: users.find((user) => user.id === selectedUserId)?.name || '',
          matricula: matriculaList[i],
          tipoVenda: tipoVendaList[i], // Já formatado para minúsculas
          status: statusList[i], // Já formatado para minúsculas
          timestamp: Timestamp.now(),
        });
      }

      console.log('Vendas adicionadas com sucesso!');
      setMatriculas('');
      setTiposVenda('');
      setStatuses('');
    } catch (error) {
      console.error('Erro ao adicionar as vendas:', error);
    }
  };

  return (
    <div>
      <Header />
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Adicionar Vendas em Lote</h2>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Selecione o Vendedor:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="border w-full p-2 rounded"
              required
            >
              <option value="">Selecione</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Lista de Matrículas (uma por linha):</label>
            <textarea
              value={matriculas}
              onChange={(e) => setMatriculas(e.target.value)}
              className="border w-full p-2 rounded"
              rows={5}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Lista de Tipos de Venda (uma por linha):</label>
            <textarea
              value={tiposVenda}
              onChange={(e) => setTiposVenda(e.target.value)}
              className="border w-full p-2 rounded"
              rows={5}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Lista de Status (uma por linha):</label>
            <textarea
              value={statuses}
              onChange={(e) => setStatuses(e.target.value)}
              className="border w-full p-2 rounded"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Adicionar Vendas
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddSeller;