import React from 'react';

interface Contact {
  name: string;
  number: string;
}

interface ContactTableProps {
  contacts: Contact[];
}

const ContactTable: React.FC<ContactTableProps> = ({ contacts }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Contatos</h2>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Número</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-center">{contact.name}</td>
              <td className="py-2 px-4 border-b text-center">
                <a
                  href={`https://wa.me/${contact.number.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {contact.number}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
