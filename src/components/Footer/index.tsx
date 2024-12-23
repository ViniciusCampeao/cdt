import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import whatsapp from "../../assets/images/whatsapp.png";
import selo from "../../assets/images/selo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-400 to-green-600 text-white py-8 w-full">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex justify-center md:justify-start space-x-6">
          <a
            href="https://www.facebook.com/profile.php?id=100082955937810"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-110"
          >
            <img src={facebook} alt="Facebook" className="h-8" />
          </a>
          <a
            href="https://www.instagram.com/cdtcornelioprocopio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-110"
          >
            <img src={instagram} alt="Instagram" className="h-8" />
          </a>
          <a
            href="https://wa.link/0f53l5"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-110"
          >
            <img src={whatsapp} alt="WhatsApp" className="h-8" />
          </a>
        </div>

        <div className="text-center">
          <img
            src={selo}
            alt="Verificado"
            className="h-12 mb-4 mx-auto transform transition-transform hover:scale-110"
          />
          <p className="text-white text-sm font-light">
            &copy; {new Date().getFullYear()} CARTAO DE TODOS CORNELIO PROCOPIO LTDA
          </p>
        </div>

        <div className="flex justify-center md:justify-end space-x-6">
          <a href="#" className="text-white hover:underline transition-colors hover:text-green-200">
            Ajuda
          </a>
          <a href="#" className="text-white hover:underline transition-colors hover:text-green-200">
            Sobre
          </a>
          <a href="#" className="text-white hover:underline transition-colors hover:text-green-200">
            Contato
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
