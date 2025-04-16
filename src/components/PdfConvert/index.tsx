import React, { useState } from "react";
import { jsPDF } from "jspdf";

const FileToPdfConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(""); // Limpar erros prévios
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleConvertToPdf = async () => {
    if (!file) {
      setError("Por favor, selecione um arquivo para converter.");
      return;
    }

    const fileName = file.name.split(".")[0]; // Nome do arquivo sem extensão
    const pdf = new jsPDF();

    try {
      if (file.type.startsWith("image/")) {
        // Caso o arquivo seja uma imagem
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const imgData = e.target.result as string;
            pdf.addImage(imgData, "JPEG", 10, 10, 190, 190); // Ajustar a posição e tamanho da imagem
            pdf.save(`${fileName}.pdf`);
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type === "text/plain") {
        // Caso o arquivo seja um texto
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const text = e.target.result as string;
            const lines = text.split("\n");
            lines.forEach((line, index) => {
              pdf.text(line, 10, 10 + index * 10); // Adicionar texto ao PDF
            });
            pdf.save(`${fileName}.pdf`);
          }
        };
        reader.readAsText(file);
      } else {
        setError("Formato de arquivo não suportado. Tente uma imagem ou arquivo de texto.");
      }
    } catch (err) {
      console.error("Erro ao converter para PDF:", err);
      setError("Ocorreu um erro ao converter o arquivo para PDF.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg max-w-md">
      <h1 className="text-xl font-bold mb-4">Conversor de Arquivos para PDF</h1>
      <input
        type="file"
        accept="image/*,text/plain"
        onChange={handleFileChange}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleConvertToPdf}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Converter para PDF
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FileToPdfConverter;
