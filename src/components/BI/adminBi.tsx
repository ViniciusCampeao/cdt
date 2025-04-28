import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { Bar } from 'react-chartjs-2';
import Header from '../Header';
import Footer from '../Footer';

interface Sale {
  status: string;
  quantidade: number;
  vendedorId: string;
  matricula: string;
  tipoVenda: string;
  id?: string;
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
  const [chartData, setChartData] = useState<any>(null);
  const [salesList, setSalesList] = useState<Sale[]>([]);
  const [editingSaleId, setEditingSaleId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  const statusColors: Record<string, string> = {
    cancelado: 'rgba(255, 99, 132, 0.6)',
    doc: 'rgba(255, 206, 86, 0.6)',
    ligação: 'rgba(54, 162, 235, 0.6)',
    ok: 'rgba(75, 192, 192, 0.6)',
    tudo: 'rgba(153, 102, 255, 0.6)',
  };

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
      const statusCount: Record<string, number> = {
        cancelado: 0,
        doc: 0,
        ligação: 0,
        ok: 0,
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
            label: 'Status das Vendas',
            data: labels.map((status) => statusCount[status]),
            backgroundColor: labels.map((status) => statusColors[status]),
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

  const totalQuantity = filteredSales.reduce((sum, sale) => sum + (sale.quantidade || 1), 0);

  const statusSummary = {
    cancelado: 0,
    doc: 0,
    ligação: 0,
    ok: 0,
    tudo: 0,
  };

  filteredSales.forEach((sale) => {
    if (sale.status in statusSummary) {
      statusSummary[sale.status as keyof typeof statusSummary] += sale.quantidade || 1;
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-10 flex flex-col items-center">
        {/* Painel */}
        <div className="bg-green-100 p-6 rounded-md shadow-md w-full max-w-3xl text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Painel do Administrador</h1>
          <label className="block mb-2 font-medium">Selecione a Vendedora:</label>
          <select
            onChange={(e) => setSelectedId(e.target.value)}
            className="border px-4 py-2 rounded mb-4 w-1/2 mx-auto"
          >
            <option value="">Todas as Vendedoras</option>
            {vendedoras.map((vendedora) => (
              <option key={vendedora.id} value={vendedora.id}>
                {vendedora.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gráfico */}
        {chartData && (
          <div className="w-full max-w-2xl mb-8" style={{ height: '200px' }}>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        )}

        {/* Tabela de vendas */}
        <div className="bg-white p-4 rounded shadow-md w-full max-w-4xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Resumo de Vendas</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nome da Vendedora</th>
                <th className="p-2">Matrícula</th>
                <th className="p-2">Status</th>
                <th className="p-2">Tipo de Venda</th>
                <th className="p-2">Editar</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-t">
                  <td className="p-2">{vendedoraMap[sale.vendedorId] || 'Nome não encontrado'}</td>
                  <td className="p-2">{sale.matricula}</td>
                  <td className={`p-2 font-semibold ${
                    sale.status === 'ok' ? 'text-green-500' :
                    sale.status === 'cancelado' ? 'text-red-500' :
                    sale.status === 'doc' ? 'text-blue-500' :
                    sale.status === 'ligação' ? 'text-yellow-500' :
                    sale.status === 'tudo' ? 'text-orange-500' : ''
                  }`}>
                    {sale.status}
                  </td>
                  <td className="p-2 capitalize">{sale.tipoVenda}</td>
                  <td className="p-2">
                    {editingSaleId === sale.id ? (
                      <div className="flex gap-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="border p-1 rounded"
                        >
                          <option value="">Selecione</option>
                          <option value="ok">Ok</option>
                          <option value="cancelado">Cancelado</option>
                          <option value="doc">Doc</option>
                          <option value="ligação">Ligação</option>
                          <option value="tudo">Tudo</option>
                        </select>
                        <button
                          onClick={() => handleUpdateStatus(sale.id!)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingSaleId(sale.id!)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Proporção de Status */}
        <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Proporção de Status (%)</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Status</th>
                <th className="p-2">Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(statusSummary).map(([status, count]) => (
                <tr key={status} className="border-t">
                  <td className="p-2 capitalize">{status}</td>
                  <td className="p-2">
                    {totalQuantity > 0 ? `${((count / totalQuantity) * 100).toFixed(2)}%` : '0%'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ranking geral */}
        <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Ranking de Vendas OK (%)</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nome da Vendedora</th>
                <th className="p-2">% de OK</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(vendedoras.reduce((acc, vendedora) => {
                const vendas = salesList.filter(s => s.vendedorId === vendedora.id);
                const total = vendas.reduce((sum, sale) => sum + (sale.quantidade || 1), 0);
                const ok = vendas.filter(s => s.status === 'ok')
                                 .reduce((sum, sale) => sum + (sale.quantidade || 1), 0);
                acc[vendedora.id] = total > 0 ? (ok / total) * 100 : 0;
                return acc;
              }, {} as Record<string, number>))
              .sort((a, b) => b[1] - a[1])
              .map(([id, perc]) => (
                <tr key={id} className="border-t">
                  <td className="p-2">{vendedoraMap[id]}</td>
                  <td className="p-2">{perc.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ranking refiliação */}
        <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Ranking de Refiliações OK (%)</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nome da Vendedora</th>
                <th className="p-2">% de OK (Refiliação)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(vendedoras.reduce((acc, vendedora) => {
                const vendasRefiliacao = salesList.filter(s => s.vendedorId === vendedora.id && s.tipoVenda === 'refiliação');
                const total = vendasRefiliacao.reduce((sum, sale) => sum + (sale.quantidade || 1), 0);
                const ok = vendasRefiliacao.filter(s => s.status === 'ok')
                                           .reduce((sum, sale) => sum + (sale.quantidade || 1), 0);
                acc[vendedora.id] = total > 0 ? (ok / total) * 100 : 0;
                return acc;
              }, {} as Record<string, number>))
              .sort((a, b) => b[1] - a[1])
              .map(([id, perc]) => (
                <tr key={id} className="border-t">
                  <td className="p-2">{vendedoraMap[id]}</td>
                  <td className="p-2">{perc.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/* FOOTER */}
      
        <Footer />
      
    </div>
  );
};

export default ADMDASH;
