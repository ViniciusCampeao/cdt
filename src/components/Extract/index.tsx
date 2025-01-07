import React, { useState } from "react";

const PhoneExtractor: React.FC = () => {
  const [numeros, setNumeros] = useState<string>("");
  const [numerosCorrigidos, setNumerosCorrigidos] = useState<string>("");

  const corrigirNumeros = (numeros: string[]): string => {
    const numerosCorrigidos: string[] = numeros.map((numero) => {
      numero = numero.trim();

      if (!numero.startsWith("+55")) {
        numero = "+55" + numero;
      }

      if (numero[3] !== '4' || numero[4] !== '3') {
        numero = numero.slice(0, 3) + '43' + numero.slice(3);
      }

      while (numero.length < 14) {
        numero = numero.slice(0, 5) + '9' + numero.slice(5);
      }

      return numero;
    });

    return numerosCorrigidos.join(", ");
  };

  const processar = () => {
    const listaNumeros = numeros.split(/\s+/).map((num) => num.trim());
    const numerosCorrigidos = corrigirNumeros(listaNumeros);
    setNumerosCorrigidos(numerosCorrigidos);
  };

  return (
    <div className="flex flex-col items-center bg-green-100 p-8 rounded-lg max-w-xl mx-3 md:mx-auto my-12">
      <h1 className="font-sans  md:text-2xl mb-5 text-center">Extração e correção de Números de Telefone</h1>
      <label htmlFor="numeros" className="mb-2 font-sans md:text-lg">
        Insira os números:
      </label>
      <textarea
        id="numeros"
        rows={10}
        className="w-full p-2 font-sans text-base border-2 border-green-500 rounded-lg md:h-full h-40 mb-5"
        value={numeros}
        onChange={(e) => setNumeros(e.target.value)}
      />
      <button
        onClick={processar}
        className="px-4 py-2 md:text-lg bg-green-500 text-white border-none rounded-lg cursor-pointer mb-5"
      >
        Corrigir Números
      </button>
      <label htmlFor="numerosCorrigidos" className="mb-2 font-sans md:text-lg">
        Números Corrigidos:
      </label>
      <textarea
        id="numerosCorrigidos"
        rows={5}
        readOnly
        className="w-full p-2 font-sans text-base border-2 border-green-500 rounded-lg md:h-full h-40 mb-5"
        value={numerosCorrigidos}
      />
    </div>
  );
};

export default PhoneExtractor;
