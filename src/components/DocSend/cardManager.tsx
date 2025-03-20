import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebaseConfig"; // Importação correta do Firebase
import { collection, addDoc, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth"; // Para tipo User do Firebase Auth

const CardManager: React.FC = () => {
  const [cards, setCards] = useState<DocumentData[]>([]);
  const [cardName, setCardName] = useState<string>(""); // Gerenciamento do nome do card
  const [user, setUser] = useState<User | null>(null); // Ajustado para o tipo correto
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return; // Verificar se `auth` está inicializado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchCards(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCards = async (user: User) => {
    try {
      const isAdmin = user?.email === "admin@email.com"; // Verificar se o usuário é admin
      const q = isAdmin
        ? query(collection(db, "cards")) // Admin visualiza todos os cards
        : query(collection(db, "cards"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      setCards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Erro ao buscar cards:", error);
      alert("Erro ao buscar cards! Tente novamente mais tarde."); // Mensagem ao usuário
    }
  };

  const addCard = async () => {
    if (!cardName.trim() || !user) return;
    try {
      await addDoc(collection(db, "cards"), {
        name: cardName,
        userId: user.uid,
      });
      setCardName("");
      fetchCards(user);
    } catch (error) {
      console.error("Erro ao adicionar card:", error);
      alert("Erro ao adicionar card! Tente novamente mais tarde."); // Mensagem ao usuário
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg max-w-xl mx-auto my-12">
      <h1 className="text-xl font-bold mb-4">Gerenciador de Documentação</h1>
      <input
        type="text"
        placeholder="Nome do Cliente"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button onClick={addCard} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Adicionar Card
      </button>
      <div className="w-full">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(`/cards/${card.id}`)}
            className="p-4 bg-white shadow rounded mb-2 cursor-pointer"
          >
            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardManager;
