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

const AddSaleForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [status, setStatus] = useState<string>('ok');
  const [tipoVenda, setTipoVenda] = useState<string>('filiação'); // <- Novo estado

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);

        const usersList: User[] = [];
        snapshot.forEach(doc => {
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

    const selectedUser = users.find(user => user.name === selectedName);
    if (selectedUser) {
      try {
        const salesRef = collection(db, 'sales');
        await addDoc(salesRef, {
          vendedorId: selectedUser.id,
          vendedorName: selectedUser.name,
          matricula,
          status,
          tipoVenda, // <- Adicionando o tipo de venda
          timestamp: Timestamp.now(),
        });

        console.log(`Venda adicionada para o usuário: ${selectedUser.name}`);

        // Resetando os campos
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

          {/* Escolha do vendedor */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Escolha o vendedor:</label>
            <select
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="border w-full p-2 rounded"
              required
            >
              <option value="">Selecione</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input para matrícula */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Matrícula da Venda:</label>
            <input
              type="text"
              name="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="border w-full p-2 rounded"
              required
            />
          </div>

          {/* Tipo de venda */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Tipo de Venda:</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoVenda"
                  value="filiação"
                  checked={tipoVenda === 'filiação'}
                  onChange={(e) => setTipoVenda(e.target.value)}
                  className="mr-2"
                />
                Filiação
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoVenda"
                  value="refiliação"
                  checked={tipoVenda === 'refiliação'}
                  onChange={(e) => setTipoVenda(e.target.value)}
                  className="mr-2"
                />
                Refiliação
              </label>
            </div>
          </div>

          {/* Escolha do status */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Status da venda:</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border w-full p-2 rounded"
              required
            >
              <option value="ok">Ok</option>
              <option value="cancelado">Cancelado</option>
              <option value="doc">Doc</option>
              <option value="ligação">Ligação</option>
              <option value="tudo">Tudo</option>
            </select>
          </div>

          {/* Botão de submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Adicionar Venda
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AddSaleForm;
