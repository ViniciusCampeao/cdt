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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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
      setProfileMenuOpen(false);
      navigate('/login');
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <header className="flex justify-between items-center px-6 py-2 bg-green-500 w-full shadow-lg top-0 z-10 font-semibold font-mono">
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
        {user && user.isAdmin && (
          <a href="/admin" className="text-white font-light mr-4">
            DASHBOARD
          </a>
        )}
        {user ? (
          <div className="relative">
            <button onClick={toggleProfileMenu} className="text-white font-bold text-xl bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
              {user.email.charAt(0).toUpperCase()}
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
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
      <div
        className={`fixed top-0 right-0 h-full w-full bg-green-500 shadow-lg md:hidden flex flex-col items-center justify-center transition-transform duration-300 transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-3xl">
          <FaTimes />
        </button>
        <a href="/" className="text-white font-light py-2" onClick={toggleMenu}>
          HOME
        </a>
        <a href="/contact" className="text-white font-light py-2" onClick={toggleMenu}>
          CONTATO
        </a>
        <a href="/about" className="text-white font-light py-2" onClick={toggleMenu}>
          SOBRE
        </a>
        {user && user.isAdmin && (
          <a href="/admin" className="text-white font-light py-2" onClick={toggleMenu}>
            DASHBOARD
          </a>
        )}
        {user ? (
          <>
            <button onClick={toggleProfileMenu} className="text-white font-bold text-xl bg-green-600 rounded-full w-10 h-10 flex items-center justify-center mb-2">
              {user.email.charAt(0).toUpperCase()}
            </button>
            {profileMenuOpen && (
              <div className="w-full flex flex-col items-center bg-green-500">
                <button
                  onClick={handleSignOut}
                  className="text-white font-light py-2"
                >
                  Sair
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" className="text-white font-light py-2" onClick={toggleMenu}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
