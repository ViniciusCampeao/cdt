import React, { useState } from 'react';

const PhoneExtractor: React.FC = () => {
  const [text, setText] = useState('');
  const [phones, setPhones] = useState<string[]>([]);

  const extractPhoneNumbers = (inputText: string) => {
    const phonePattern = /\b(\d{10,11})\b/g;
    const matches = inputText.match(phonePattern);
    if (matches) {
      const formattedNumbers = matches.map(number => {
        if (number.length === 10) {
          return number.slice(0, 2) + '9' + number.slice(2);
        }
        return number;
      });
      setPhones(formattedNumbers);
    } else {
      setPhones([]);
    }
  };

  const handleExtract = () => {
    extractPhoneNumbers(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Extrator de Números de Telefone</h1>
      <textarea
        className="w-full md:w-1/2 p-2 mb-4 border border-gray-300 rounded"
        placeholder="Insira o texto aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={handleExtract}
      >
        Extrair Números
      </button>
      <div className="mt-4 w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-2">Números Extraídos:</h2>
        <ul className="list-disc list-inside">
          {phones.map((phone, index) => (
            <li key={index} className="bg-white p-2 my-1 rounded border border-gray-300">
              {phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhoneExtractor;
