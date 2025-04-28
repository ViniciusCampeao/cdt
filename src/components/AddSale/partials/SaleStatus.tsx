import React from 'react';

interface Props {
  status: string;
  setStatus: (status: string) => void;
}

const SaleStatus: React.FC<Props> = ({ status, setStatus }) => (
  <div className="mb-4">
    <label className="block text-lg font-medium mb-2">Status da venda:</label>
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="border w-full p-2 rounded"
      required
    >
      <option value="ok">Ok</option>
      <option value="cancelado">Cancelado</option>
      <option value="doc">Doc</option>
      <option value="ligação">Ligação</option>
      <option value="tudo">Tudo</option>
    </select>
  </div>
);

export default SaleStatus;