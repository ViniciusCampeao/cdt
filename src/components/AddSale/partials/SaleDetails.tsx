import React from 'react';

interface Props {
  matricula: string;
  setMatricula: (matricula: string) => void;
  tipoVenda: string;
  setTipoVenda: (tipoVenda: string) => void;
}

const SaleDetails: React.FC<Props> = ({ matricula, setMatricula, tipoVenda, setTipoVenda }) => (
  <>
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">Matrícula da Venda:</label>
      <input
        type="text"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
        className="border w-full p-2 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">Tipo de Venda:</label>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="tipoVenda"
            value="filiação"
            checked={tipoVenda === 'filiação'}
            onChange={(e) => setTipoVenda(e.target.value)}
            className="mr-2"
          />
          Filiação
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="tipoVenda"
            value="refiliação"
            checked={tipoVenda === 'refiliação'}
            onChange={(e) => setTipoVenda(e.target.value)}
            className="mr-2"
          />
          Refiliação
        </label>
      </div>
    </div>
  </>
);

export default SaleDetails;