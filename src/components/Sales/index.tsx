import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Header from '../Header';
import Footer from '../Footer';

const Sales: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null); // Estado para o usuário
  const navigate = useNavigate();
  const auth = getAuth();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null); // Limpa o estado se o usuário não estiver autenticado
      navigate('/login'); // Redireciona para a página de login se não houver usuário
    }
  }, [auth, navigate]);

  const isAdmin = user?.email === 'admin@email.com'; // Verifica se o usuário é o admin

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-6">Painel de Navegação</h1>
          <div className="grid grid-cols-1 gap-4">
            {isAdmin && (
              <>
                <Link className="flex" to="/dash">
                  <button className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 m-5">
                    Painel do Administrador
                  </button>
                </Link>
                <Link className="flex" to="/addsale">
                  <button className="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 m-5">
                    Adicionar Venda
                  </button>
                </Link>
              </>
            )}
            <Link className="flex" to="/dash">
              <button className="w-full p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 m-5">
                Painel do vendedor
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sales;
