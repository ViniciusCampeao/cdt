import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Header from '../Header';
import Footer from '../Footer';
import AdminPanel from './partials/AdminPanel';
import SalesTable from './partials/SalesTable';
import StatusProportion from './partials/StatusProportion';
import Ranking from './partials/Ranking';
import { Bar } from 'react-chartjs-2';

interface Sale {
  status: string;
  quantidade: number;
  vendedorId: string;
  matricula: string;
  tipoVenda: string;
  id?: string;
  timestamp: { toDate: () => Date };
}

interface User {
  name: string;
  isAdmin: boolean;
  id: string;
}

const ADMDASH = () => {
  const [vendedoras, setVendedoras] = useState<User[]>([]);
  const [vendedoraMap, setVendedoraMap] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any>(null);
  const [salesList, setSalesList] = useState<Sale[]>([]);
  const [editingSaleId, setEditingSaleId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    const fetchVendedoras = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const usersList: User[] = [];
        snapshot.forEach((doc) => {
          const userData = doc.data() as User;
          if (userData.isAdmin) {
            usersList.push({ ...userData, id: doc.id });
          }
        });
        setVendedoras(usersList);

        const map: Record<string, string> = {};
        usersList.forEach((vendedora) => {
          map[vendedora.id] = vendedora.name;
        });
        setVendedoraMap(map);
      } catch (error) {
        console.error('Erro ao buscar vendedoras:', error);
      }
    };

    const fetchSales = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'sales'));
        const sales: Sale[] = [];
        snapshot.forEach((docItem) => {
          const sale = docItem.data() as Sale;
          sales.push({ ...sale, id: docItem.id });
        });
        setSalesList(sales);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    fetchVendedoras();
    fetchSales();
  }, []);

  useEffect(() => {
    const generateChartData = (filteredSales: Sale[]) => {
      const statusColors: Record<string, string> = {
        cancelado: 'rgba(255, 99, 132, 0.6)',
        doc: 'rgba(255, 206, 86, 0.6)',
        ligação: 'rgba(54, 162, 235, 0.6)',
        ok: 'rgba(75, 192, 192, 0.6)',
        tudo: 'rgba(153, 102, 255, 0.6)',
      };

      const statusCount: Record<string, number> = {
        ok: 0,
        cancelado: 0,
        doc: 0,
        ligação: 0,
        tudo: 0,
      };

      filteredSales.forEach((sale) => {
        if (statusCount[sale.status] !== undefined) {
          statusCount[sale.status] += sale.quantidade || 1;
        }
      });

      const labels = Object.keys(statusCount);
      return {
        labels,
        datasets: [
          {
            label: 'Quantidade de Vendas por Status',
            data: labels.map((label) => statusCount[label]),
            backgroundColor: labels.map((label) => statusColors[label]),
          },
        ],
      };
    };

    const filteredSales = selectedId
      ? salesList.filter((sale) => sale.vendedorId === selectedId)
      : salesList;

    setChartData(generateChartData(filteredSales));
  }, [selectedId, salesList]);

  const filteredSales = selectedId
    ? salesList.filter((sale) => sale.vendedorId === selectedId)
    : salesList;

  const totalQuantity = filteredSales.reduce(
    (sum, sale) => sum + (sale.quantidade || 1),
    0
  );

  const statusSummary = {
    ok: 0,
    cancelado: 0,
    doc: 0,
    ligação: 0,
    tudo: 0,
  };

  filteredSales.forEach((sale) => {
    if (sale.status in statusSummary) {
      statusSummary[sale.status as keyof typeof statusSummary] +=
        sale.quantidade || 1;
    }
  });

  const handleUpdateStatus = async (saleId: string) => {
    if (!newStatus) return;

    try {
      const saleRef = doc(db, 'sales', saleId);
      await updateDoc(saleRef, { status: newStatus });

      setSalesList((prev) =>
        prev.map((sale) =>
          sale.id === saleId ? { ...sale, status: newStatus } : sale
        )
      );

      setEditingSaleId(null);
      setNewStatus('');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  // Rankings
  const rankingData = vendedoras.reduce((acc, vendedora) => {
    const vendas = salesList.filter((s) => s.vendedorId === vendedora.id);
    const total = vendas.reduce((sum, sale) => sum + (sale.quantidade || 1), 0);
    const ok = vendas
      .filter((s) => s.status === 'ok')
      .reduce((sum, sale) => sum + (sale.quantidade || 1), 0);
    acc[vendedora.id] = total > 0 ? (ok / total) * 100 : 0;
    return acc;
  }, {} as Record<string, number>);

  const rankingRefilData = vendedoras.reduce((acc, vendedora) => {
    const vendasRefiliacao = salesList.filter(
      (s) => s.vendedorId === vendedora.id && s.tipoVenda === 'refiliação'
    );
    const total = vendasRefiliacao.reduce(
      (sum, sale) => sum + (sale.quantidade || 1),
      0
    );
    const ok = vendasRefiliacao
      .filter((s) => s.status === 'ok')
      .reduce((sum, sale) => sum + (sale.quantidade || 1), 0);
    acc[vendedora.id] = total > 0 ? (ok / total) * 100 : 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-10 flex flex-col items-center">
        <AdminPanel vendedoras={vendedoras} setSelectedId={setSelectedId} />
        {chartData && (
          <div className="w-full max-w-2xl mb-8" style={{ height: '200px' }}>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        )}
        <SalesTable
          sales={filteredSales}
          vendedoraMap={vendedoraMap}
          editingSaleId={editingSaleId}
          newStatus={newStatus}
          setEditingSaleId={setEditingSaleId}
          setNewStatus={setNewStatus}
          handleUpdateStatus={handleUpdateStatus}
        />
        <StatusProportion
          statusSummary={statusSummary}
          totalQuantity={totalQuantity}
          sales={salesList}
        />
        <Ranking
          title="Ranking de Vendas OK (%)"
          vendedoraMap={vendedoraMap}
          rankingData={rankingData}
          sales={salesList}
        />
        <Ranking
          title="Ranking de Refiliações OK (%)"
          vendedoraMap={vendedoraMap}
          rankingData={rankingRefilData}
          sales={salesList}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ADMDASH;