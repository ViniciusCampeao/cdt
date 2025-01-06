import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const WhatsAppBot = () => {

  return (
    <div>
    <Header />
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h2 className="text-3xl font-bold text-green-700 mb-6">BOT WPP</h2>
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center">  
      <Link
        to="https://mega.nz/file/1M1E3DiJ#8Jj8Pcv3g6JYVBQZ2rcC5Xp6ncrSowNoCgDkxZjjYCE"
        target='_blank'
        className="text-center bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
      >
        Dowload bot disparo Whatsapp
      </Link>
      <Link
        to="/instrucoes"
        className="text-center bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 w-full"
      >
        Instruções de uso
      </Link>
    </div>
  </div>
  <Footer />
  </div>
  );
};

export default WhatsAppBot;
