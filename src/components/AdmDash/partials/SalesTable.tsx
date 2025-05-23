import React, { useState } from 'react';

interface Sale {
  id?: string;
  vendedorId: string;
  matricula: string;
  status: string;
  tipoVenda: string;
  quantidade: number;
  timestamp: { toDate: () => Date }; // Timestamp do Firebase
}

interface Props {
  sales: Sale[];
  vendedoraMap: Record<string, string>;
  editingSaleId: string | null;
  newStatus: string;
  setEditingSaleId: (id: string | null) => void;
  setNewStatus: (status: string) => void;
  handleUpdateStatus: (saleId: string) => Promise<void>;
  handleDeleteSale: (saleId: string) => Promise<void>;
  handleDeleteMultipleSales?: (saleIds: string[]) => Promise<void>; // Nova prop para deletar múltiplas vendas
}

const SalesTable: React.FC<Props> = ({
  sales,
  vendedoraMap,
  editingSaleId,
  newStatus,
  setEditingSaleId,
  setNewStatus,
  handleUpdateStatus,
  handleDeleteSale,
  handleDeleteMultipleSales,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hiddenStatuses, setHiddenStatuses] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Mês atual
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Ano atual
  const [selectedSales, setSelectedSales] = useState<string[]>([]); // Estado para armazenar IDs das vendas selecionadas

  const toggleStatusFilter = (status: string) => {
    setHiddenStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  // Toggle para selecionar/deselecionar uma venda
  const toggleSaleSelection = (saleId: string | undefined) => {
    if (!saleId) return;
    
    setSelectedSales(prev => 
      prev.includes(saleId) 
        ? prev.filter(id => id !== saleId) 
        : [...prev, saleId]
    );
  };

  // Selecionar/deselecionar todas as vendas filtradas
  const toggleSelectAll = () => {
    if (selectedSales.length === filteredSales.filter(sale => sale.id).length) {
      setSelectedSales([]);
    } else {
      const allIds = filteredSales
        .filter(sale => sale.id)
        .map(sale => sale.id as string);
      setSelectedSales(allIds);
    }
  };

  // Deletar todas as vendas selecionadas
  const deleteSelectedSales = async () => {
    if (selectedSales.length === 0) return;
    
    if (confirm(`Tem certeza que deseja deletar ${selectedSales.length} vendas selecionadas?`)) {
      if (handleDeleteMultipleSales) {
        await handleDeleteMultipleSales(selectedSales);
      } else {
        // Caso a props handleDeleteMultipleSales não for fornecida, deletamos uma a uma
        for (const saleId of selectedSales) {
          await handleDeleteSale(saleId);
        }
      }
      setSelectedSales([]);
    }
  };

  const filteredSales = sales.filter((sale) => {
    const saleDate = sale.timestamp.toDate();
    return (
      sale.matricula.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !hiddenStatuses.includes(sale.status) &&
      saleDate.getMonth() + 1 === selectedMonth &&
      saleDate.getFullYear() === selectedYear
    );
  });

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-4xl mb-8">
      <h2 className="text-xl font-semibold w-full text-center uppercase mb-12">Resumo de Vendas</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Pesquisar por Matrícula:</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite a matrícula"
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filtros de Status:</h3>
        <div className="flex gap-4 flex-wrap">
          {['ok', 'cancelado', 'doc', 'ligação', 'tudo'].map((status) => (
            <label key={status} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!hiddenStatuses.includes(status)}
                onChange={() => toggleStatusFilter(status)}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300"
              />
              {status}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por Mês:</h3>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por Ano:</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {selectedSales.length > 0 && (
        <div className="mb-4 flex justify-between items-center bg-red-50 p-3 rounded">
          <span className="font-medium">{selectedSales.length} vendas selecionadas</span>
          <button
            onClick={deleteSelectedSales}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Deletar Selecionadas
          </button>
        </div>
      )}
      
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">
              <input 
                type="checkbox" 
                checked={selectedSales.length > 0 && selectedSales.length === filteredSales.filter(sale => sale.id).length}
                onChange={toggleSelectAll}
                className="form-checkbox h-4 w-4"
              />
            </th>
            <th className="p-2">Nome da Vendedora</th>
            <th className="p-2">Matrícula</th>
            <th className="p-2">Status</th>
            <th className="p-2">Tipo de Venda</th>
            <th className="p-2">Data</th>
            <th className="p-2">Editar</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="p-2 text-center">
                  <input 
                    type="checkbox" 
                    checked={sale.id ? selectedSales.includes(sale.id) : false}
                    onChange={() => toggleSaleSelection(sale.id)}
                    className="form-checkbox h-4 w-4"
                  />
                </td>
                <td className="p-2">{vendedoraMap[sale.vendedorId] || 'Desconhecido'}</td>
                <td className="p-2">{sale.matricula}</td>
                <td
                  className={`p-2 font-semibold ${
                    sale.status === 'ok'
                      ? 'text-green-500'
                      : sale.status === 'cancelado'
                      ? 'text-red-500'
                      : sale.status === 'doc'
                      ? 'text-blue-500'
                      : sale.status === 'ligação'
                      ? 'text-yellow-500'
                      : sale.status === 'tudo'
                      ? 'text-orange-500'
                      : ''
                  }`}
                >
                  {sale.status}
                </td>
                <td className="p-2 capitalize">{sale.tipoVenda}</td>
                <td className="p-2">
                  {sale.timestamp.toDate().toLocaleDateString()}
                </td>
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingSaleId(sale.id!)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteSale(sale.id!)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Deletar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-4">
                Nenhuma venda encontrada com os filtros aplicados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;