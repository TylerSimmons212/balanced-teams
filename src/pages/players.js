import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import PlayerList from '../components/PlayerList';
import protectRoute from '../utils/protectRoute';
import NavBar from '@/components/NavBar';

const Players = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <Container style={{padding: 0}} maxWidth="md">
      <NavBar />
      <Typography variant="h4" gutterBottom style={{textAlign: 'center', marginTop: '20px'}}>
        Players
      </Typography>
      <PlayerList userId={user.uid} />
    </Container>
  );
};

export default protectRoute(Players);
