import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Header from '../Header';
import Footer from '../Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Limpa mensagens de erro anteriores

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        userDoc.data();
        navigate('/');
      } else {
        setErrorMessage('Usuário não encontrado no banco de dados.');
        setLoading(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Erro no login:', error);

      // Tratamento de erros específicos do Firebase
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        setErrorMessage('Email ou senha incorretos.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('Usuário não encontrado.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Formato de email inválido.');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage('Muitas tentativas de login. Tente novamente mais tarde.');
      } else {
        setErrorMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
        <div className="text-left p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Login</h2>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                className="input bg-gray-100 border border-green-500 rounded-lg p-2 w-full"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg transition flex items-center justify-center ${
                loading ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
