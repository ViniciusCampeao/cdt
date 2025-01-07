import logo from '../../assets/images/cartaologo.png';
import selo from '../../assets/images/selo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white py-8 w-full overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="hidden md:flex justify-center md:justify-start">
          <img src={logo} alt="logo" className="h-12" />
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

        <div className="flex justify-center md:justify-end flex-col items-center md:items-end text-white uppercase text-sm font-semibold font-mono">
          <a href="/about" className="hover:underline mb-2">
            Sobre
          </a>
          <a href="/contact" className="hover:underline">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
