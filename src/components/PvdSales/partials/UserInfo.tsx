import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';

interface User {
  id: string;
  email: string;
}

interface Props {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserInfo: React.FC<Props> = ({ user, setUser }) => {
  const auth = getAuth();

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          email: currentUser.email || '',
        });
      }
    };

    fetchUser();

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email || '',
        });
      }
    });
  }, [auth, setUser]);

  return (
    <div>
      {user ? (
        <p className="text-center">Usuário autenticado: {user.email}</p>
      ) : (
        <p className="text-center">Nenhum usuário autenticado.</p>
      )}
    </div>
  );
};

export default UserInfo;