import React from 'react';

interface Props {
  vendedoras: Array<{ id: string; name: string }>;
  setSelectedId: (id: string) => void;
}

const AdminPanel: React.FC<Props> = ({ vendedoras, setSelectedId }) => (
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
);

export default AdminPanel;