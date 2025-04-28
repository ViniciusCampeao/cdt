import React from 'react';

interface Sale {
  id?: string;
  vendedorId: string;
  matricula: string;
  status: string;
  tipoVenda: string;
  quantidade: number;
}

interface Props {
  sales: Sale[];
  vendedoraMap: Record<string, string>;
  editingSaleId: string | null;
  newStatus: string;
  setEditingSaleId: (id: string | null) => void;
  setNewStatus: (status: string) => void;
  handleUpdateStatus: (saleId: string) => Promise<void>;
}

const SalesTable: React.FC<Props> = ({
  sales,
  vendedoraMap,
  editingSaleId,
  newStatus,
  setEditingSaleId,
  setNewStatus,
  handleUpdateStatus,
}) => (
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
        {sales.map((sale) => (
          <tr key={sale.id} className="border-t">
            <td className="p-2">
              {vendedoraMap[sale.vendedorId] || 'Nome não encontrado'}
            </td>
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
);

export default SalesTable;