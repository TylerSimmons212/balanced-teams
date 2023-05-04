// src/pages/index.js
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import Login from './login';

const Home = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);

  return user ? null : <Login />;
};

export default Home;
