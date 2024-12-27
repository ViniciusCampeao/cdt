import React from "react";

const StartPage: React.FC = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-lg md:bg-white p-8 md:shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          Bem-vindo à Forma de Arrecadação
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Estamos aqui para ajudar você a realizar seus pagamentos de forma simples e segura.
        </p>
        <a
          href="/payment"
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-green-600 transition"
        >
          Prosseguir com o Pagamento
        </a>
        <p className="mt-6 text-center text-sm text-gray-500">
          Caso encontre algum problema, clique em{" "}
          <a
            href="/contact"
            className="text-green-500 underline hover:text-green-600"
            rel="noopener noreferrer"
          >
            ajuda
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default StartPage;
