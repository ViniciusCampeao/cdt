import React from "react";
import { FaRegLifeRing } from 'react-icons/fa';

const StartPage: React.FC = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white p-8 shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold text-green-500 mb-6 text-center animate-pulse">
          Bem-vindo à Forma de Arrecadação
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Estamos aqui para ajudar você a realizar seus pagamentos de forma simples e segura.
        </p>
        <a
          href="/payment"
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:shadow-xl hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
        >
          Prosseguir com o Pagamento
        </a>
        <p className="mt-6 text-center text-sm text-gray-400">
          Caso encontre algum problema, clique em{" "}
          <a
            href="/contact"
            className="text-green-400 underline hover:text-green-500"
            rel="noopener noreferrer"
          >
            ajuda
          </a>
          .
        </p>
        <FaRegLifeRing className="text-gray-400 text-3xl mt-7 animate-bounce" />
      </div>
    </div>
  );
};

export default StartPage;
