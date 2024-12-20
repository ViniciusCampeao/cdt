import React from "react";
import { Link } from "react-router-dom";

const StartPage: React.FC = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-[50%] bg-white">
      <h1 className="text-4xl text-green-700 mb-8">
        Bem-vindo à Forma de Arrecadação
      </h1>
      <Link
        to="/payment"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Prosseguir com o Pagamento
      </Link>
      <p className="mt-4">
        Você será redirecionado para a nossa pagina de pagamento online,
        qualquer problema clique em <a href="https://wa.link/xpopm6">ajuda</a>
      </p>
    </div>
    </div>
  
  );
};

export default StartPage;
