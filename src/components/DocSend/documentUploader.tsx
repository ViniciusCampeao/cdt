import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../services/firebaseConfig";
import Header from "../Header";
import Footer from "../Footer";

const DocumentUploader: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState<string>("");

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
      alert("Erro ao buscar arquivos. Verifique sua conexão ou tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [cardId]);

  useEffect(() => {
    fetchUploadedFiles();
  }, [fetchUploadedFiles]);

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
      fetchUploadedFiles();
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      alert("Erro ao enviar arquivo. Tente novamente mais tarde.");
    }
  };

  const handleRename = async (oldName: string) => {
    if (!cardId || !newFileName.trim()) return;
    try {
      const oldFileRef = ref(storage, `documents/${cardId}/${oldName}`);
      const newFileRef = ref(storage, `documents/${cardId}/${newFileName}`);
      
      // Baixar o arquivo original e enviá-lo com o novo nome
      const response = await fetch(await getDownloadURL(oldFileRef));
      const blob = await response.blob();
      await uploadBytes(newFileRef, blob);

      // Excluir o arquivo original
      await deleteObject(oldFileRef);

      setRenamingFile(null);
      setNewFileName("");
      fetchUploadedFiles();
    } catch (error) {
      console.error("Erro ao renomear arquivo:", error);
      alert("Erro ao renomear arquivo. Tente novamente mais tarde.");
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!cardId) return;
    try {
      const fileRef = ref(storage, `documents/${cardId}/${fileName}`);
      await deleteObject(fileRef); // Excluir arquivo do Firebase Storage
      setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName)); // Atualizar estado local
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
      alert("Erro ao excluir arquivo. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
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
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white shadow rounded p-2 mb-2">
                  {renamingFile === file.name ? (
                    <>
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="border p-2 rounded w-full mr-2"
                        placeholder="Novo nome do arquivo"
                      />
                      <button
                        onClick={() => handleRename(file.name)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setRenamingFile(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                        {file.name}
                      </a>
                      <button
                        onClick={() => setRenamingFile(file.name)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                      >
                        Renomear
                      </button>
                      <button
                        onClick={() => handleDelete(file.name)}
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DocumentUploader;
