import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const BIComponent: React.FC = () => {
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }

  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Vendas',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Despesas',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'financialData'));
      const salesData: number[] = [];
      const expensesData: number[] = [];
      const labels: string[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        labels.push(data.date);
        salesData.push(data.sales);
        expensesData.push(data.expenses);
      });

      const salesAvg = salesData.reduce((a, b) => a + b, 0) / salesData.length;
      const expensesAvg = expensesData.reduce((a, b) => a + b, 0) / expensesData.length;

      labels.push('Próximo Mês');
      salesData.push(salesAvg);
      expensesData.push(expensesAvg);

      setData({
        labels,
        datasets: [
          {
            label: 'Vendas',
            data: salesData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Despesas',
            data: expensesData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, [db]);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleAddDataClick = () => {
    navigate('/add-data');
  };

  return (
    <div>

    <Header />
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Dashboard Empresarial</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddDataClick}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Adicionar Dados
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Vendas e Despesas</h2>
          <Bar data={data} options={options} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Tendência de Vendas</h2>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default BIComponent;