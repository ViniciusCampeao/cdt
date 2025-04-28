import React, { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Header from '../Header';
import Footer from '../Footer';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../services/firebaseConfig';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

// Definição do tipo `User`
interface User {
  id: string;
  email: string;
}

// Definição do tipo `Sale`
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
  const auth = getAuth();
  const db = getFirestore(app);

  // Busca as informações do usuário autenticado
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

  // Busca os dados de vendas do Firebase
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
          const data = doc.data() as Sale;
          sales.push({
            status: data.status,
            quantidade: data.quantidade || 1,
            matricula: (doc.data()).matricula || 'Sem matrícula',
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
  }, [user, db]);

  // Configurações do gráfico
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
      <main className="p-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8">Minhas Vendas</h1>
        {chartData ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg md:w-[40%] md:h-[40%] mx-auto flex items-center justify-center">
            <Pie data={chartData} options={options} />
          </div>
        ) : (
          <p className="text-center">Carregando dados...</p>
        )}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Detalhamento das Vendas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matrícula
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesList.length > 0 ? (
                  salesList.map((sale, index) => (
                    <tr key={index} className={sale.status === 'ok' ? 'bg-green-50' : 'bg-yellow-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">{sale.matricula}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{sale.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center px-6 py-4">
                      Nenhuma venda encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Resumo Percentual das Vendas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Porcentagem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesList.length > 0 ? (
                  Object.entries(
                    salesList.reduce<Record<string, number>>((acc, sale) => {
                      acc[sale.status] = (acc[sale.status] || 0) + sale.quantidade;
                      return acc;
                    }, {})
                  ).map(([status, quantidade], index, array) => {
                    const totalQuantity = array.reduce((acc, [, qty]) => acc + qty, 0);
                    const percent =
                      totalQuantity > 0 ? ((quantidade / totalQuantity) * 100).toFixed(1) : '0';

                    return (
                      <tr key={index} className={status === 'ok' ? 'bg-green-50' : 'bg-yellow-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">{status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{percent}%</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center px-6 py-4">
                      Nenhuma venda encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PvdDashboard;