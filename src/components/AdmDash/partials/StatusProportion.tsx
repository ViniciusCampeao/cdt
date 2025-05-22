import React, { useState } from 'react';

interface Sale {
  status: string;
  timestamp: { toDate: () => Date };
  quantidade: number;
}

interface StatusProportionProps {
  statusSummary: {
    ok: number;
    cancelado: number;
    doc: number;
    ligação: number;
    tudo: number;
  };
  totalQuantity: number;
  sales: Sale[];
  selectedVendedora: string | null;
  selectedMonth?: number;
  selectedYear?: number;
  setSelectedMonth?: (month: number) => void;
  setSelectedYear?: (year: number) => void;
}

const StatusProportion: React.FC<StatusProportionProps> = ({
  sales,
  selectedVendedora,
  selectedMonth: externalSelectedMonth,
  selectedYear: externalSelectedYear,
  setSelectedMonth: externalSetSelectedMonth,
  setSelectedYear: externalSetSelectedYear,
}) => {
  // Use estados internos se não foram fornecidos externamente
  const [internalSelectedMonth, setInternalSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [internalSelectedYear, setInternalSelectedYear] = useState<number>(new Date().getFullYear());
  
  // Use os valores externos se fornecidos, ou os internos como fallback
  const selectedMonth = externalSelectedMonth !== undefined ? externalSelectedMonth : internalSelectedMonth;
  const selectedYear = externalSelectedYear !== undefined ? externalSelectedYear : internalSelectedYear;
  
  const handleMonthChange = (month: number) => {
    if (externalSetSelectedMonth) {
      externalSetSelectedMonth(month);
    } else {
      setInternalSelectedMonth(month);
    }
  };
  
  const handleYearChange = (year: number) => {
    if (externalSetSelectedYear) {
      externalSetSelectedYear(year);
    } else {
      setInternalSelectedYear(year);
    }
  };

  // Filtrar vendas por mês e ano
  const filteredSales = sales.filter((sale) => {
    const saleDate = sale.timestamp.toDate();
    return (
      saleDate.getMonth() + 1 === selectedMonth && saleDate.getFullYear() === selectedYear
    );
  });

  // Recalcular statusSummary e totalQuantity com base nas vendas filtradas
  const recalculatedStatusSummary = {
    ok: 0,
    cancelado: 0,
    doc: 0,
    ligação: 0,
    tudo: 0,
  };

  filteredSales.forEach((sale) => {
    if (sale.status in recalculatedStatusSummary) {
      recalculatedStatusSummary[sale.status as keyof typeof recalculatedStatusSummary] += 
        sale.quantidade || 1;
    }
  });

  const recalculatedTotalQuantity = filteredSales.reduce(
    (sum, sale) => sum + (sale.quantidade || 1), 
    0
  );

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mb-8">
      <h2 className="text-xl font-semibold text-center mb-4">
        Proporção de Status (%)
        {selectedVendedora && (
          <span className="block text-sm text-blue-600 mt-1">
            Vendedora: {selectedVendedora}
          </span>
        )}
      </h2>

      {/* Filtros de mês e ano - mostrar apenas se não estiverem sendo controlados externamente */}
      {(!externalSelectedMonth || !externalSelectedYear) && (
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          <div>
            <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">
              Mês:
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              className="border rounded p-2 bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('pt-BR', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1">
              Ano:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="border rounded p-2 bg-white"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
        <div className="bg-green-100 p-3 rounded text-center">
          <h3 className="font-semibold text-green-700">OK</h3>
          <p className="text-lg font-bold">
            {recalculatedTotalQuantity > 0
              ? ((recalculatedStatusSummary.ok / recalculatedTotalQuantity) * 100).toFixed(1)
              : '0'}
            %
          </p>
        </div>
        <div className="bg-red-100 p-3 rounded text-center">
          <h3 className="font-semibold text-red-700">Cancelado</h3>
          <p className="text-lg font-bold">
            {recalculatedTotalQuantity > 0
              ? ((recalculatedStatusSummary.cancelado / recalculatedTotalQuantity) * 100).toFixed(1)
              : '0'}
            %
          </p>
        </div>
        <div className="bg-yellow-100 p-3 rounded text-center">
          <h3 className="font-semibold text-yellow-700">Doc</h3>
          <p className="text-lg font-bold">
            {recalculatedTotalQuantity > 0
              ? ((recalculatedStatusSummary.doc / recalculatedTotalQuantity) * 100).toFixed(1)
              : '0'}
            %
          </p>
        </div>
        <div className="bg-blue-100 p-3 rounded text-center">
          <h3 className="font-semibold text-blue-700">Ligação</h3>
          <p className="text-lg font-bold">
            {recalculatedTotalQuantity > 0
              ? ((recalculatedStatusSummary.ligação / recalculatedTotalQuantity) * 100).toFixed(1)
              : '0'}
            %
          </p>
        </div>
        <div className="bg-purple-100 p-3 rounded text-center">
          <h3 className="font-semibold text-purple-700">Tudo</h3>
          <p className="text-lg font-bold">
            {recalculatedTotalQuantity > 0
              ? ((recalculatedStatusSummary.tudo / recalculatedTotalQuantity) * 100).toFixed(1)
              : '0'}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusProportion;