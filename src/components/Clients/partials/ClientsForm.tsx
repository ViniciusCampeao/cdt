import React from 'react';

interface ClientesFormProps {
  clienteData: { name: string; email: string; phone: string };
  setClienteData: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string }>>;
  handleAddCliente: (e: React.FormEvent) => void;
  editClienteId: string | null;
}

const ClientsForm: React.FC<ClientesFormProps> = ({ clienteData, setClienteData, handleAddCliente, editClienteId }) => {
  return (
    <form onSubmit={handleAddCliente} className="space-y-4">
      <input
        type="text"
        value={clienteData.name}
        onChange={(e) => setClienteData({ ...clienteData, name: e.target.value })}
        placeholder="Nome"
        className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
      />
      <input
        type="email"
        value={clienteData.email}
        onChange={(e) => setClienteData({ ...clienteData, email: e.target.value })}
        placeholder="Email"
        className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
      />
      <input
        type="text"
        value={clienteData.phone}
        onChange={(e) => setClienteData({ ...clienteData, phone: e.target.value })}
        placeholder="Telefone"
        className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition"
      >
        {editClienteId ? 'Atualizar Cliente' : 'Adicionar Cliente'}
      </button>
    </form>
  );
};

export default ClientsForm;
