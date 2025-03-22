import React, { useState, useEffect } from "react";
import { db, auth } from "../../services/firebaseConfig"; // 
import {
  collection,
  addDoc,
  query,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../Footer";
import Header from "../Header";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState<string>(""); // Estado para armazenar o texto do feedback
  const [feedbacks, setFeedbacks] = useState<DocumentData[]>([]); // Lista de feedbacks
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Verificar se o usuário é administrador
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Verificar se o usuário logado é o admin
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "admin@email.com") {
        setIsAdmin(true);
        fetchFeedbacks(); // Carregar feedbacks se for administrador
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Por favor, escreva algo antes de enviar.");
      return;
    }
    try {
      setLoading(true);
      await addDoc(collection(db, "feedbacks"), {
        message: feedback,
        createdAt: new Date(),
      });
      setFeedback("");
      alert("Feedback enviado anonimamente!");
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      alert("Erro ao enviar o feedback. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const q = query(collection(db, "feedbacks"));
      const querySnapshot = await getDocs(q);
      setFeedbacks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg  mx-auto my-12 h-screen">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>

      {!isAdmin ? (
        <>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Escreva seu feedback aqui..."
            className="border p-2 rounded w-full mb-4"
            rows={5}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Enviando..." : "Enviar Feedback Anônimo"}
          </button>
        </>
      ) : (
        // Exibição de feedbacks apenas para o administrador
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Feedbacks Recebidos</h2>
          {feedbacks.length === 0 ? (
            <p>Nenhum feedback recebido ainda.</p>
          ) : (
            feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white shadow rounded p-4 mb-2 border"
              >
                <p>{fb.message}</p>
                <p className="text-sm text-gray-500">
                  Enviado em: {new Date(fb.createdAt.seconds * 1000).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default Feedback;
