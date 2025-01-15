import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import VpnImg from "../../assets/images/VPNInstrucoes.png";

const Vpn = () => {

  return (
    <div>
    <Header />
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h2 className="text-3xl font-bold text-green-700 mb-6">VPN</h2>
    <div className="md:w-[60%] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center text-center">  
      <Link
        to="https://www.tunnelbear.com/download"
        target='_blank'
        className="text-center bg-green-500 text-white font-bold py-2 px-4 rounded w-full"
      >
        Site oficial Tunnel Bear VPN
      </Link>
      <img src={VpnImg} alt="vpn" className="w-[100%]" />
    </div>
  </div>
  <Footer />
  </div>
  );
};

export default Vpn;
