import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../services/firebaseConfig';
import Header from '../Header';
import Footer from '../Footer';

const AddDataComponent: React.FC = () => {
  const [date, setDate] = useState('');
  const [sales, setSales] = useState('');
  const [expenses, setExpenses] = useState('');

  const db = getFirestore(app);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'financialData'), {
        date,
        sales: Number(sales),
        expenses: Number(expenses),
      });
      setDate('');
      setSales('');
      setExpenses('');
      alert('Dados adicionados com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar dados: ', error);
      alert('Erro ao adicionar dados.');
    }
  };

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Adicionar Vendas e Despesas</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Data
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="sales">
              Vendas
            </label>
            <input
              type="number"
              id="sales"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="expenses">
              Despesas
            </label>
            <input
              type="number"
              id="expenses"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AddDataComponent;
