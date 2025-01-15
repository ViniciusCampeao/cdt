import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import contacts from './data/contacts';
import blockedContacts from './data/blockedContacts';

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Lista de Contatos</h2>
        <input
          type="text"
          placeholder="Pesquisar Contatos..."
          className="mb-4 p-2 border-2 border-green-500 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="md:w-[60%] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center mb-6">
          {filteredContacts.map((contact, index) => (
            <div
              key={index}
              className="w-full py-2 px-4 text-lg text-green-600 border-b-2 border-green-500 cursor-pointer hover:bg-green-100"
            >
              <a
                href={`https://wa.me/${contact.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                {contact.name} - {contact.number}
              </a>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-red-700 mb-4">Números Banidos</h2>
        <div className="md:w-[60%] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="py-2 px-4 border">Nome</th>
                <th className="py-2 px-4 border">Número</th>
              </tr>
            </thead>
            <tbody>
              {blockedContacts.map((contact, index) => (
                <tr key={index} className="hover:bg-red-100">
                  <td className="py-2 px-4 border">{contact.name}</td>
                  <td className="py-2 px-4 border">{contact.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactList;
