import React from 'react';

interface FormProps {
  recordData: { name: string; number: string; status: string; color: string };
  setRecordData: React.Dispatch<React.SetStateAction<{ name: string; number: string; status: string; color: string }>>;
  handleAddRecord: (e: React.FormEvent) => void;
  editRecordId: string | null;
}

const Form: React.FC<FormProps> = ({ recordData, setRecordData, handleAddRecord, editRecordId }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecordData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleAddRecord} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700">Nome:</label>
        <input
          type="text"
          name="name"
          value={recordData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Número:</label>
        <input
          type="text"
          name="number"
          value={recordData.number}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status:</label>
        <input
          type="text"
          name="status"
          value={recordData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Cor:</label>
        <select
          name="color"
          value={recordData.color}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="green">Verde - Cadastrado</option>
          <option value="red">Vermelho - Sem Interesse</option>
          <option value="yellow">Amarelo - Conversando</option>
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        {editRecordId ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
};

export default Form;
