import { useState } from 'react';
import Header from "../Header";
import Footer from "../Footer";

const APK = () => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(`Link copiado: ${text}`);
      setTimeout(() => setCopied(""), 3000);
    }).catch(err => {
      console.error("Erro ao copiar o texto:", err);
    });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Aplicativo cartão de todos</h2>
        <div className="md:w-[60%] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => copyToClipboard('https://play.google.com/store/apps/details?id=com.cartaodetodoswalletapp&hl=pt_BR')}
            className="text-center bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
          >
            Copiar link do Google Play
          </button>
          <button
            onClick={() => copyToClipboard('https://apps.apple.com/br/app/cartão-de-todos/id1536693230')}
            className="text-center bg-green-500 text-white font-bold py-2 px-4 rounded w-full mt-6"
          >
            Copiar link da App Store
          </button>
        </div>
        {copied && <p className="text-green-700 font-bold mt-4">{copied}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default APK;
