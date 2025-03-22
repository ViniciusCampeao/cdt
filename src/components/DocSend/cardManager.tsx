import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  DocumentData,
} from "firebase/firestore"; // Adicionado updateDoc
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import Header from "../Header";
import Footer from "../Footer";

const CardManager: React.FC = () => {
  const [cards, setCards] = useState<DocumentData[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [cardName, setCardName] = useState<string>("");
  const [filterName, setFilterName] = useState<string>(""); // Filtro por nome
  const [filterDate, setFilterDate] = useState<string>(""); // Filtro por data
  const [user, setUser] = useState<User | null>(null);
  const [pageTitle, setPageTitle] = useState<string>("Gerenciador de Documentação"); // Estado para título
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchCards(user);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.title = pageTitle; // Atualizar o título do documento
  }, [pageTitle]); // Mudança no título do estado

  const fetchCards = async (user: User) => {
    try {
      const isAdmin = user?.email === "admin@email.com";
      const q = isAdmin
        ? query(collection(db, "cards"))
        : query(collection(db, "cards"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      setCards(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString().split("T")[0] || "Sem Data",
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar cards:", error);
      alert("Erro ao buscar cards! Tente novamente mais tarde.");
    }
  };

  const addCard = async () => {
    if (!cardName.trim() || !user) return;
    try {
      const newCard = {
        name: cardName,
        userId: user.uid,
        createdAt: new Date(), // Adicionando a data de criação
        color: "white", // Cor inicial
      };
      await addDoc(collection(db, "cards"), newCard);
      setPageTitle(cardName); // Atualizar título com o nome do card
      setCardName("");
      fetchCards(user);
    } catch (error) {
      console.error("Erro ao adicionar card:", error);
      alert("Erro ao adicionar card! Tente novamente mais tarde.");
    }
  };

  const toggleSelectCard = (cardId: string) => {
    const card = cards.find((card) => card.id === cardId);
    if (card) {
      setPageTitle(card.name); // Atualizar título com o nome do card selecionado
    }
    setSelectedCards((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    );
  };

  const deleteSelectedCards = async () => {
    if (!user || selectedCards.length === 0) return;
    try {
      await Promise.all(selectedCards.map((cardId) => deleteDoc(doc(db, "cards", cardId))));
      setPageTitle("Gerenciador de Documentação"); // Resetar título após exclusão
      setSelectedCards([]);
      fetchCards(user);
    } catch (error) {
      console.error("Erro ao excluir cards:", error);
      alert("Erro ao excluir cards! Tente novamente mais tarde.");
    }
  };

  const changeCardColor = async (cardId: string, currentColor: string) => {
    try {
      const newColor = currentColor === "yellow" ? "white" : "yellow"; // Alterna entre amarelo e branco
      const cardRef = doc(db, "cards", cardId);
      await updateDoc(cardRef, { color: newColor }); // Atualiza a cor do card no Firestore
      setCards((prev) =>
        prev.map((card) => (card.id === cardId ? { ...card, color: newColor } : card))
      );
    } catch (error) {
      console.error("Erro ao alterar a cor do card:", error);
      alert("Erro ao alterar a cor do card! Tente novamente mais tarde.");
    }
  };

  const filteredCards = cards.filter((card) => {
    const matchesName = filterName
      ? card.name.toLowerCase().includes(filterName.toLowerCase())
      : true;
    const matchesDate = filterDate ? card.createdAt === filterDate : true;
    return matchesName && matchesDate;
  });

  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <Header />
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg w-[50%] my-12 shadow">
        <h1 className="text-xl font-bold mb-4">{pageTitle}</h1> {/* Exibindo o título dinâmico */}
        <input
          type="text"
          placeholder="PR + Nome vendedor"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={addCard} className="bg-green-400 text-white px-4 py-2 rounded mb-4 ">
          Adicionar Card
        </button>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={deleteSelectedCards}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          disabled={selectedCards.length === 0}
        >
          Excluir Selecionados
        </button>
        <div className="w-full">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className={`p-4 shadow rounded mb-2 flex items-center cursor-pointer`}
              style={{ backgroundColor: card.color }} // Define a cor do card dinamicamente
            >
              <input
                type="checkbox"
                checked={selectedCards.includes(card.id)}
                onChange={() => toggleSelectCard(card.id)}
                className="mr-2"
              />
              <span
                onClick={() => {
                  navigate(`/cards/${card.id}`);
                  setPageTitle(card.name); // Atualiza o título ao navegar
                }}
                className="flex-1"
              >
                {card.name} - {card.createdAt}
              </span>
              <button
                onClick={() => changeCardColor(card.id, card.color)}
                className="text-black px-4 py-2 rounded ml-2 border-2 border-black hover:scale-105 transition-transform duration-200"
              >
                Marcar
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardManager;
