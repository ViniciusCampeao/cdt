import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import cartaologo from '../../assets/images/cartaologo.png';
import { doc, getDoc } from 'firebase/firestore';

const Header: React.FC = () => {
  const [user, setUser] = useState<null | { email: string; isAdmin: boolean }>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUser({ email: user.email!, isAdmin: userDoc.data().isAdmin });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setMenuOpen(false);
      navigate('/login');
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center px-6 py-2 bg-green-500 w-full shadow-lg fixed top-0 z-10 font-semibold font-mono">
      <Link to="/">
        <img src={cartaologo} alt="Cartão de Todos" className="w-24 cursor-pointer" />
      </Link>
      <div className="flex items-center">
        <a href="/contact" className="text-white font-light mr-4">
          CONTATO
        </a>
        <a href="/about" className="text-white font-light mr-4">
          SOBRE 
        </a>
        {user ? (
          <div className="relative">
            <button onClick={toggleMenu} className="text-white font-bold text-xl bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
              {user.email.charAt(0).toUpperCase()}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                {user.isAdmin && (
                  <Link to="/admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-white font-light text-lg">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
