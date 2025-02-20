import React from "react";
import { FaSpinner } from "react-icons/fa";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Obrigado pela confiança no nosso time!
        </h1>
        <p className="text-gray-700 mb-4">
          Seu pagamento está em análise. <FaSpinner className="inline-block animate-spin" />
        </p>
        <p className="text-gray-700 mb-4">
          Se ocorrer algum problema, nossas vendedoras entrarão em contato!
        </p>
        <p className="text-gray-700">
          Caso tenha alguma dúvida, entre em 
          <a
            href="/contact"
            className="text-green-500 underline hover:text-green-600 ml-1 transition-colors duration-200"
          >
            contato
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
