import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="m-4 flex flex-col items-center justify-center min-h-screen bg-white mt-20">
      <h1 className="text-4xl text-green-700 mb-8">Obrigado pelo seu pagamento e confiança no nosso time!</h1>
      <p>
        Entraremos em contato caso tenha ocorrido algum problema com a transação! 
      </p>
      <p>
        Caso tenha alguma dúvida, entre em <a 
        href="/contact" 
        className="
        text-green-500 
        underline 
        hover:text-green-600
        "
        >
          contato
          </a>
        
      </p>
    </div>
  );
};

export default ThankYouPage;
