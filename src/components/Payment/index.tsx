import React from "react";
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import "./partials/styles.css";

interface PaymentFormProps {
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const validateCardNumber = (input: HTMLInputElement) => {
    const value = input.value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    input.value = formattedValue;
    input.setCustomValidity(
      /^(\d{4} ){3}\d{4}$/.test(formattedValue)
        ? ""
        : "Número do cartão inválido"
    );
  };

  const validateExpiryDate = (input: HTMLInputElement) => {
    const value = input.value.replace(/\D/g, "");
    if (value.length > 2) {
      input.value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    input.setCustomValidity(
      /^\d{2}\/\d{2}$/.test(input.value) ? "" : "Data de validade inválida"
    );
  };

  const validateCVV = (input: HTMLInputElement) => {
    input.value = input.value.replace(/\D/g, "").slice(0, 3);
    input.setCustomValidity(/^\d{3}$/.test(input.value) ? "" : "CVV inválido");
  };

  const validateCPF = (input: HTMLInputElement) => {
    let value = input.value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    input.value = value;
    input.setCustomValidity(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(input.value) ? "" : "CPF inválido"
    );
  };



  return (
    <div className="flex flex-col md:flex-row md:gap-6 justify-center p-10 bg-gray-100">
      <div className="benefits-section text-left p-6 bg-white rounded shadow-lg w-full md:max-w-xl mt-8">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Cartão de Todos</h2>
        <p className="mb-4 text-gray-600">Benefícios exclusivos para você:</p>
        <ul className="benefits-list space-y-4 text-gray-700">
          <li className="flex items-start">
            <span className="text-green-500 text-2xl mr-3">✔️</span>
            <span>Descontos em <strong>consultas médicas</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 text-2xl mr-3">✔️</span>
            <span>Descontos em <strong>farmácias</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 text-2xl mr-3">✔️</span>
            <span>Descontos em <strong>exames laboratoriais</strong></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 text-2xl mr-3">✔️</span>
            <span>Vantagens exclusivas em <strong>parceiros</strong></span>
          </li>
        </ul>
        <p className="mt-6 text-xl font-semibold text-gray-800">Valor: 12 parcelas de R$ 29,70</p>
      </div>
      <div className="form-section text-left p-6 bg-white rounded shadow-lg w-full md:max-w-xl mt-8">
        <form
          id="payment-form"
          onSubmit={(e) => {
            e.preventDefault();
            emailjs
              .sendForm("service_ylmdgth", "template_9cur51a", e.currentTarget)
              .then(
                () => {
                  onSubmit();
                  navigate('/thank-you');
                },
                (error: unknown) => {
                  console.log("FAILED...", error);
                }
              );
          }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">Dados do Pagamento</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Seu Nome"
              required
              className="input bg-gray-100 border border-green-500 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              type="text"
              name="cpf"
              placeholder="000.000.000-00"
              required
              className="input bg-gray-100 border border-green-500 rounded-lg p-2"
              onInput={(e) => validateCPF(e.currentTarget)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Cartão</label>
            <select
              name="card_type"
              required
              className="input bg-gray-100 border border-green-500 rounded-lg p-2"
            >
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número do Cartão</label>
            <input
              type="text"
              name="card_number"
              placeholder="1234 5678 9012 3456"
              required
              className="input bg-gray-100 border border-green-500 rounded-lg p-2"
              onInput={(e) => validateCardNumber(e.currentTarget)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
              <input
                type="text"
                name="expiry_date"
                placeholder="MM/YY"
                required
                className="input bg-gray-100 border border-green-500 rounded-lg p-2"
                onInput={(e) => validateExpiryDate(e.currentTarget)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                required
                className="input bg-gray-100 border border-green-500 rounded-lg p-2"
                onInput={(e) => validateCVV(e.currentTarget)}
              />
            </div>
          </div>
          
          <input
            type="submit"
            value="Finalizar"
            className="bg-green-600 text-white w-full py-3 rounded-lg cursor-pointer hover:bg-green-700"
          />
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
