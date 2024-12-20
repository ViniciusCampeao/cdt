import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white mt-20">
      <h1 className="text-4xl text-green-700 mb-8">Obrigado pelo seu pagamento!</h1>
      <p>
        Entraremos em contato caso tenha ocorrido algum problema com a transação.
      </p>
    </div>
  );
};

export default ThankYouPage;
