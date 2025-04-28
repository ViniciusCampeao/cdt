import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc } from "firebase/firestore"; // Para buscar o nome do card
import { storage, db } from "../../services/firebaseConfig"; // Certifique-se de importar o Firestore
import Header from "../Header";
import Footer from "../Footer";
import FileToPdfConverter from "../PdfConvert";

const DocumentUploader: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [cardName, setCardName] = useState<string>("Gerenciador de Documentos");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Buscar o nome do card com base no cardId
  const fetchCardName = useCallback(async () => {
    if (!cardId) return;
    try {
      const cardDoc = await getDoc(doc(db, "cards", cardId));
      if (cardDoc.exists()) {
        const cardData = cardDoc.data();
        setCardName(cardData.name || "Card Desconhecido");
        document.title = cardData.name || "Card Desconhecido"; // Atualizar o título da página
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do card:", error);
    }
  }, [cardId]);

  const fetchUploadedFiles = useCallback(async () => {
    if (!cardId) return;
    try {
      setLoading(true);
      const storageRef = ref(storage, `documents/${cardId}/`);
      const fileList = await listAll(storageRef);
      const filesWithUrls = await Promise.all(
        fileList.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item),
        }))
      );
      setUploadedFiles(filesWithUrls);
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
      alert(
        "Erro ao buscar arquivos. Verifique sua conexão ou tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  }, [cardId]);

  useEffect(() => {
    fetchCardName(); // Buscar o nome do card ao carregar o componente
    fetchUploadedFiles(); // Buscar os arquivos do card
  }, [fetchCardName, fetchUploadedFiles]);

  const handleUpload = async () => {
    if (!files.length || !cardId) {
      alert(
        "Selecione arquivos e certifique-se de que um card foi selecionado."
      );
      return;
    }
    try {
      for (const file of files) {
        const fileRef = ref(storage, `documents/${cardId}/${file.name}`);
        await uploadBytes(fileRef, file);
      }
      setFiles([]);
      fetchUploadedFiles();
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      alert("Erro ao enviar arquivo. Tente novamente mais tarde.");
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!cardId) return;
    try {
      const fileRef = ref(storage, `documents/${cardId}/${fileName}`);
      await deleteObject(fileRef);
      setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
      alert("Erro ao excluir arquivo. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="flex flex-col md:flex-row gap-8 p-4 justify-center flex-grow items-center">
        <FileToPdfConverter />
  
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg max-w-md w-full">
          <h1 className="text-xl font-bold mb-4">{cardName}</h1>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);
              const onlyPdfFiles = selectedFiles.filter(
                (file) => file.type === "application/pdf"
              );
              if (onlyPdfFiles.length !== selectedFiles.length) {
                alert("Apenas arquivos PDF são permitidos.");
              }
              setFiles(onlyPdfFiles);
            }}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleUpload}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full"
          >
            Enviar
          </button>
        </div>
  
        {/* Bloco de Arquivos Enviados */}
        <div className="flex flex-col items-start bg-gray-50 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-lg font-semibold mb-4">Arquivos Enviados</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : uploadedFiles.length === 0 ? (
            <p className="text-gray-500">Nenhum arquivo enviado ainda.</p>
          ) : (
            uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white shadow rounded p-2 mb-2 w-full"
              >
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 truncate"
                >
                  {file.name}
                </a>
                <button
                  onClick={() => handleDelete(file.name)}
                  className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                >
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );  
};

export default DocumentUploader;
