import React, { useState } from 'react';

interface Doctor {
  name: string;
  especialidade: string;
  orientacoes: string;
}

interface DoctorsTableProps {
  doctors: Doctor[];
}

const DoctorsTable: React.FC<DoctorsTableProps> = ({ doctors }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Médicos</h2>
      <input
        type="text"
        placeholder="Pesquisar por especialidade..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />
      <div className="md:border rounded-lg md:shadow-lg md:border-green-600">
        <table className="bg-gray-100 rounded-lg hidden md:block">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">MÉDICO</th>
              <th className="py-2 px-4 border-b">ESPECIALIDADE</th>
              <th className="py-2 px-4 border-b">IDADE DE ATENDIMENTO/ORIENTAÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{doctor.name}</td>
                <td className="py-2 px-4 border-b text-center">{doctor.especialidade}</td>
                <td className="py-2 px-4 border-b text-center">{doctor.orientacoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden w-full bg-gray-100 rounded-lg flex flex-col gap-4">
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className="bg-gray-100 p-4 border border-green-600 rounded-lg">
              <div className="font-bold text-xl mb-2">{doctor.name}</div>
              <div className="mb-2"><strong>Especialidade:</strong> {doctor.especialidade}</div>
              <div><strong>Orientações:</strong> {doctor.orientacoes}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsTable;
