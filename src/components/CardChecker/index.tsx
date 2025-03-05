import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

const CardChecker: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardBrand, setCardBrand] = useState('');

  const checkCardBrand = (number: string) => {
    if (number.startsWith('4')) {
      return 'Visa';
    } else if (number.startsWith('6')) {
      return 'Elo';
    } else if (number.startsWith('2') || number.startsWith('5')) {
      return 'Mastercard';
    } else if (number.startsWith('3')) {
      return 'American Express';
    } else {
      return 'Bandeira desconhecida';
    }
  };

  const handleCheck = () => {
    const brand = checkCardBrand(cardNumber);
    setCardBrand(brand);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-6">Verificar Bandeira do Cartão</h1>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Digite o número do cartão"
            className="w-full px-3 py-2 border rounded-lg mb-4"
          />
          <button
            onClick={handleCheck}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Verificar
          </button>
          {cardBrand && <p className="mt-4 text-lg font-bold">{cardBrand}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardChecker;
