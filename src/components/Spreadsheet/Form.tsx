import React from 'react';

interface FormProps {
  recordData: { name: string; number: string; status: string };
  setRecordData: React.Dispatch<React.SetStateAction<{ name: string; number: string; status: string }>>;
  handleAddRecord: (e: React.FormEvent) => void;
  editRecordId: string | null;
}

const Form: React.FC<FormProps> = ({ recordData, setRecordData, handleAddRecord, editRecordId }) => {
  return (
    <form onSubmit={handleAddRecord} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={recordData.name}
          onChange={(e) => setRecordData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Nome"
          required
          className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Número</label>
        <input
          type="text"
          value={recordData.number}
          onChange={(e) => setRecordData((prev) => ({ ...prev, number: e.target.value }))}
          placeholder="Número"
          required
          className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Situação</label>
        <input
          type="text"
          value={recordData.status}
          onChange={(e) => setRecordData((prev) => ({ ...prev, status: e.target.value }))}
          placeholder="Situação"
          required
          className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition">
        {editRecordId ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
};

export default Form;
