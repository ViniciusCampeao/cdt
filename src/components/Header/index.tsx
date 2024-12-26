import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import cartaologo from '../../assets/images/cartaologo.png';
import { doc, getDoc } from 'firebase/firestore';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [user, setUser] = useState<null | { email: string; isAdmin: boolean }>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      <nav className="md:flex hidden flex-1 justify-end items-center">
        <a href="/" className='text-white font-light mr-4'>
          HOME
        </a>
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
      </nav>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white text-3xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {menuOpen && isMobile && (
        <div className="absolute top-16 left-0 w-full bg-green-500 shadow-lg md:hidden flex flex-col items-center">
          <a href="/" className="text-white font-light py-2" onClick={toggleMenu}>
            HOME
          </a>
          <a href="/contact" className="text-white font-light py-2" onClick={toggleMenu}>
            CONTATO
          </a>
          <a href="/about" className="text-white font-light py-2" onClick={toggleMenu}>
            SOBRE
          </a>
          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin" className="text-white font-light py-2" onClick={toggleMenu}>
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="text-white font-light py-2"
              >
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white font-light py-2" onClick={toggleMenu}>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
