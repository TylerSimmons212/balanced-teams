// src/utils/protectRoute.js
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const protectRoute = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user]);

    return user ? <WrappedComponent {...props} /> : null;
  };

  return ProtectedComponent;
};

export default protectRoute;
