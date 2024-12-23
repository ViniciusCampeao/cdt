import React from 'react';
import { Cliente } from './Types';

interface ClientesListProps {
  clientes: Cliente[];
  handleDeleteCliente: (id: string) => void;
  handleEditCliente: (cliente: Cliente) => void;
}

const ClientesList: React.FC<ClientesListProps> = ({ clientes, handleDeleteCliente, handleEditCliente }) => {
  return (
    <div className="mt-6">
      {clientes.map((cliente) => (
        <div key={cliente.id} className="p-4 bg-gray-200 rounded-lg flex justify-between items-center mb-2">
          <div>
            <p className="font-semibold">{cliente.name}</p>
            <p>{cliente.email}</p>
            <p>{cliente.phone}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => handleEditCliente(cliente)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteCliente(cliente.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientesList;
