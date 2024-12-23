import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import ClientesForm from './partials/ClientsForm';
import ClientesList from './partials/ClientsList';
import { Cliente } from './partials/Types';

const ClientsComponent: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editClienteId, setEditClienteId] = useState<string | null>(null);
  const [clienteData, setClienteData] = useState<{ name: string; email: string; phone: string }>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'clientes'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data: Cliente[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as Cliente);
      });
      setClientes(data);
    }
  };

  const handleAddCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      if (editClienteId) {
        const clienteRef = doc(db, 'clientes', editClienteId);
        await updateDoc(clienteRef, clienteData);
        setEditClienteId(null);
      } else {
        await addDoc(collection(db, 'clientes'), {
          uid: user.uid,
          ...clienteData,
        });
      }
      setClienteData({ name: '', email: '', phone: '' });
      fetchClientes();
    }
  };

  const handleDeleteCliente = async (id: string) => {
    await deleteDoc(doc(db, 'clientes', id));
    fetchClientes();
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditClienteId(cliente.id);
    setClienteData({ name: cliente.name, email: cliente.email, phone: cliente.phone });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <div className="text-left p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Clientes</h2>
        <ClientesForm
          clienteData={clienteData}
          setClienteData={setClienteData}
          handleAddCliente={handleAddCliente}
          editClienteId={editClienteId}
        />
        <ClientesList
          clientes={clientes}
          handleDeleteCliente={handleDeleteCliente}
          handleEditCliente={handleEditCliente}
        />
      </div>
    </div>
  );
};

export default ClientsComponent;
