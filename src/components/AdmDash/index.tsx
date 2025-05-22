import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import Header from '../Header';
import Footer from '../Footer';
import AdminPanel from './partials/AdminPanel';
import SalesTable from './partials/SalesTable';
import StatusProportion from './partials/StatusProportion';
import Ranking from './partials/Ranking';
import { Pie } from 'react-chartjs-2'; // Altere a importação para incluir Pie

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
  
  // Adicionando estados para filtro de mês e ano
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

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
      // Filtrar por mês e ano
      const dateFilteredSales = filteredSales.filter(sale => {
        const saleDate = sale.timestamp.toDate();
        return (
          saleDate.getMonth() + 1 === selectedMonth && 
          saleDate.getFullYear() === selectedYear
        );
      });

      const statusColors: Record<string, string> = {
        cancelado: 'rgba(255, 99, 132, 0.8)',
        doc: 'rgba(255, 206, 86, 0.8)',
        ligação: 'rgba(54, 162, 235, 0.8)',
        ok: 'rgba(75, 192, 192, 0.8)',
        tudo: 'rgba(153, 102, 255, 0.8)',
      };

      const statusCount: Record<string, number> = {
        ok: 0,
        cancelado: 0,
        doc: 0,
        ligação: 0,
        tudo: 0,
      };

      dateFilteredSales.forEach((sale) => {
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
            borderColor: labels.map(label => statusColors[label].replace('0.8', '1')),
            borderWidth: 1,
          },
        ],
      };
    };

    const filteredSales = selectedId
      ? salesList.filter((sale) => sale.vendedorId === selectedId)
      : salesList;

    setChartData(generateChartData(filteredSales));
  }, [selectedId, salesList, selectedMonth, selectedYear]); // Adicionar dependências de mês e ano

  const filteredSales = selectedId
    ? salesList.filter((sale) => sale.vendedorId === selectedId)
    : salesList;


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

  const handleDeleteSale = async (saleId: string) => {
    if (confirm('Tem certeza que deseja deletar esta venda?')) {
      try {
        const saleRef = doc(db, 'sales', saleId);
        await deleteDoc(saleRef);

        // Atualiza a lista de vendas removendo a venda deletada
        setSalesList((prev) => prev.filter((sale) => sale.id !== saleId));
        console.log('Venda deletada com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar venda:', error);
      }
    }
  };
  
  // Nova função para deletar múltiplas vendas
  const handleDeleteMultipleSales = async (saleIds: string[]) => {
    try {
      // Cria um array de promises para deletar todas as vendas em paralelo
      const deletePromises = saleIds.map(saleId => {
        const saleRef = doc(db, 'sales', saleId);
        return deleteDoc(saleRef);
      });
      
      await Promise.all(deletePromises);
      
      // Atualiza a lista de vendas removendo as vendas deletadas
      setSalesList((prev) => prev.filter((sale) => !saleIds.includes(sale.id || '')));
      console.log(`${saleIds.length} vendas deletadas com sucesso!`);
    } catch (error) {
      console.error('Erro ao deletar vendas:', error);
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

  // Filtrar vendas de refiliação para usar no componente Ranking
  const vendasRefiliacao = salesList.filter(sale => sale.tipoVenda === 'refiliação');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-10 flex flex-col items-center">
        <AdminPanel vendedoras={vendedoras} setSelectedId={setSelectedId} />
        
        {/* Filtros de mês e ano para o gráfico */}
        <div className="w-full max-w-2xl mb-4 flex justify-center gap-4">
          <div>
            <label htmlFor="chart-month-select" className="block text-sm font-medium text-gray-700 mb-1">
              Mês:
            </label>
            <select
              id="chart-month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border rounded p-2 bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('pt-BR', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="chart-year-select" className="block text-sm font-medium text-gray-700 mb-1">
              Ano:
            </label>
            <select
              id="chart-year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="border rounded p-2 bg-white"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
        </div>

        {chartData && (
          <div className="w-full max-w-2xl mb-8 bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold text-center mb-4">
              Quantidade de Vendas por Status
              {selectedId && vendedoraMap[selectedId] && (
                <span className="block text-sm text-blue-600 mt-1">
                  Vendedora: {vendedoraMap[selectedId]}
                </span>
              )}
            </h2>
            <div style={{ height: '300px' }}>
              <Pie 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.formattedValue || '';
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                          const percentage = ((parseInt(value) / total) * 100).toFixed(1);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
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
          handleDeleteSale={handleDeleteSale}
          handleDeleteMultipleSales={handleDeleteMultipleSales}
        />

        <StatusProportion
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          statusSummary={{} as any}
          totalQuantity={0}
          sales={filteredSales}
          selectedVendedora={selectedId ? vendedoraMap[selectedId] : null}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
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
          sales={vendasRefiliacao}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ADMDASH;