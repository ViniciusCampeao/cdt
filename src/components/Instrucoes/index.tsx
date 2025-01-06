import Footer from "../Footer";
import Header from "../Header";

const Instrucoes = () => {
  return(
    <div>
      <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Instruções de uso</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center">
        <p>
          Para usar o bot de disparo de mensagens no Whatsapp, acesse o link abaixo e assista o vídeo tutorial.
        </p>
        <a
          href="https://youtu.be/mfab1j0Lc74"
          target='_blank'
          className="text-center bg-green-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
        >
          Vídeo tutorial          
        </a>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Instrucoes;