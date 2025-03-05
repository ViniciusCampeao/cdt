import React, { useState } from 'react';
import { addressData } from './partials/addressData';
import Header from '../Header';
import Footer from '../Footer';

const AddressLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cep, setCep] = useState('');

  const handleSearch = () => {
    const result = addressData.find((address) =>
      address.street.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (result) {
      setCep(result.cep);
    } else {
      setCep('CEP não encontrado');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-6">Buscar CEP</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome da rua ou avenida"
            className="w-full px-3 py-2 border rounded-lg mb-4"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Buscar
          </button>
          {cep && <p className="mt-4 text-lg font-bold">{cep}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddressLookup;
