// src/hooks/usePlayers.js
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

export const usePlayers = (userId) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const playersRef = collection(db, `users/${userId}/players`);
    const playersQuery = query(playersRef, orderBy('name'));

    const unsubscribe = onSnapshot(playersQuery, (snapshot) => {
      const playersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlayers(playersData);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const addPlayer = async (player) => {
    const playerRef = collection(doc(db, "users", userId), "players");
    await addDoc(playerRef, { ...player });
  };  
  
  const updatePlayer = async (id, updatedPlayer) => {
    const playerRef = doc(db, `users/${userId}/players/${id}`);
    await setDoc(playerRef, { ...updatedPlayer });
  };  

  const deletePlayer = async (id) => {
    const playerRef = doc(db, `users/${userId}/players/${id}`);
    await deleteDoc(playerRef);
  };

  return { players, addPlayer, updatePlayer, deletePlayer };
};
