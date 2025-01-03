import React, { useState } from 'react';

const PhoneExtractor: React.FC = () => {
  const [text, setText] = useState('');
  const [phones, setPhones] = useState<{ number: string; checked: boolean }[]>([]);

  const extractPhoneNumbers = (inputText: string) => {
    // Atualize a expressão regular para corresponder a números com 8 a 13 dígitos
    const phonePattern = /\b(\d{8,13})\b/g;
    const matches = inputText.match(phonePattern);
    if (matches) {
      const formattedNumbers = matches.map(number => {
        // Formate os números conforme necessário
        if (number.length === 10) {
          return { number: number.slice(0, 2) + '9' + number.slice(2), checked: false };
        }
        return { number, checked: false };
      });
      setPhones(formattedNumbers);
    } else {
      setPhones([]);
    }
  };

  const handleExtract = () => {
    extractPhoneNumbers(text);
  };

  const handleCheckboxChange = (index: number) => {
    setPhones(prevPhones =>
      prevPhones.map((phone, i) =>
        i === index ? { ...phone, checked: !phone.checked } : phone
      )
    );
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
            <li key={index} className="bg-white p-2 my-1 rounded border border-gray-300 flex items-center">
              <input
                type="checkbox"
                checked={phone.checked}
                onChange={() => handleCheckboxChange(index)}
                className="mr-2"
              />
              <a
                href={`https://wa.me/${phone.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 ${phone.checked ? 'line-through text-gray-500' : ''}`}
              >
                {phone.number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhoneExtractor;
