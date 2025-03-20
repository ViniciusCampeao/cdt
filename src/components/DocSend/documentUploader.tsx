import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebaseConfig";

const DocumentUploader: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Use useCallback para evitar recriação da função
  const fetchUploadedFiles = useCallback(async () => {
    if (!cardId) return;
    try {
      setLoading(true);
      const storageRef = ref(storage, `documents/${cardId}/`);
      const fileList = await listAll(storageRef);
      const urls = await Promise.all(fileList.items.map((item) => getDownloadURL(item)));
      setUploadedFiles(urls);
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
      alert("Erro ao buscar arquivos. Verifique sua conexão ou tente novamente mais tarde.");
    } finally {
      setLoading(false); // Certifique-se de desbloquear o loading mesmo em caso de erro
    }
  }, [cardId]);
   // Agora a função depende apenas de cardId

  useEffect(() => {
    fetchUploadedFiles(); // Chama a função no efeito
  }, [fetchUploadedFiles]); // Inclui fetchUploadedFiles como dependência

  const handleUpload = async () => {
    if (!files.length || !cardId) {
      alert("Selecione arquivos e certifique-se de que um card foi selecionado.");
      return;
    }
    try {
      for (const file of files) {
        const fileRef = ref(storage, `documents/${cardId}/${file.name}`);
        await uploadBytes(fileRef, file);
      }
      setFiles([]);
      fetchUploadedFiles(); // Recarrega os arquivos após o upload
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      alert("Erro ao enviar arquivo. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg max-w-xl mx-auto my-12">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Gerenciador de Arquivos</h1>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="border p-2 rounded w-full mb-2"
          />
          <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
            Enviar Arquivos
          </button>
          <div className="w-full">
            {uploadedFiles.map((url, index) => (
              <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="block bg-white shadow rounded p-2 mb-2">
                Documento {index + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentUploader;
