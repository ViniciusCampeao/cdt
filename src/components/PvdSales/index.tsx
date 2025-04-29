import React, { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import Header from '../Header';
import Footer from '../Footer';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../services/firebaseConfig';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import ChartSection from './partials/ChartSection';
import SalesSummaryTable from './partials/SalesSummaryTable';
import SalesDetailTable from './partials/SalesDetailTable';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

interface User {
  id: string;
  email: string;
}

interface Sale {
  status: string;
  quantidade: number;
  matricula: string;
}

const statusColors: Record<string, string> = {
  cancelado: 'rgba(255, 99, 132, 0.6)',
  doc: 'rgba(255, 206, 86, 0.6)',
  ligação: 'rgba(54, 162, 235, 0.6)',
  ok: 'rgba(75, 192, 192, 0.6)',
  tudo: 'rgba(153, 102, 255, 0.6)',
};

const PvdDashboard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [salesList, setSalesList] = useState<Sale[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // formato: '2025-04'
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          email: currentUser.email || '',
        });
      }
    };

    fetchUser();

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email || '',
        });
      }
    });
  }, [auth]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const q = query(collection(db, 'sales'), where('vendedorId', '==', user.id));
        const snapshot = await getDocs(q);

        const statusCount: Record<string, number> = {
          cancelado: 0,
          doc: 0,
          ligação: 0,
          ok: 0,
          tudo: 0,
        };

        const sales: Sale[] = [];

        snapshot.forEach((doc) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = doc.data() as any;
          const timestamp: Date | undefined = data.timestamp?.toDate?.();

          if (!timestamp) return;

          // Filtro por mês
          if (selectedMonth) {
            const [year, month] = selectedMonth.split('-').map(Number);
            const isSameMonth =
              timestamp.getFullYear() === year && timestamp.getMonth() + 1 === month;
            if (!isSameMonth) return;
          }

          sales.push({
            status: data.status,
            quantidade: data.quantidade || 1,
            matricula: data.matricula || 'Sem matrícula',
          });

          if (data.status && Object.prototype.hasOwnProperty.call(statusCount, data.status)) {
            statusCount[data.status] += data.quantidade || 1;
          }
        });

        const labels = Object.keys(statusCount);

        setSalesList(sales);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Vendas por Status',
              data: labels.map((status) => statusCount[status]),
              backgroundColor: labels.map((status) => statusColors[status]),
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar os dados de vendas:', error);
      }
    };

    fetchData();
  }, [user, selectedMonth, db]);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0) as number;
            const value = context.raw as number;
            const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${value} vendas (${percent}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Header />
      <main className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Minhas Vendas</h1>

        <div className="mb-6 flex justify-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por mês</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="block w-60 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <ChartSection chartData={chartData} options={options} />
        <SalesDetailTable salesList={salesList} />
        <SalesSummaryTable salesList={salesList} />
      </main>
      <Footer />
    </div>
  );
};

export default PvdDashboard;
