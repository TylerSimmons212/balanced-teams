// src/contexts/PlayersContext.js
import { createContext, useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../utils/firebase';

export const PlayersContext = createContext();

const PlayersContextProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'players'), (snapshot) => {
      const playersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContextProvider;
