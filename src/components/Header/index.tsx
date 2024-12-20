import React from "react";
import cartaologo from "../../assets/images/cartaologo.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-2 bg-green-500 fixed w-full top-0 shadow-lg">
      <Link to="/">
        <img
          src={cartaologo}
          alt="Cartão de Todos"
          className="w-24 cursor-pointer"
        />
      </Link>
      <a
        href="https://wa.link/xpopm6"
        className="text-white font-light text-lg"
      >
        Ajuda
      </a>
    </header>
  );
};

export default Header;
