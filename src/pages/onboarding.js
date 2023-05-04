// src/pages/onboarding.js
import React from 'react';
import { useRouter } from 'next/router';
import PlayerForm from '../components/PlayerForm';
import { Container, Box, Typography } from '@mui/material';

const Onboarding = () => {
  const router = useRouter();

  const handlePlayerSubmit = (player) => {
    // Add player to the database
    console.log('Player added:', player);

    // Redirect to the home page
    router.push('/home');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4">
          Add Your First Player
        </Typography>
        <PlayerForm onSubmit={handlePlayerSubmit} showCancelButton={false} />
      </Box>
    </Container>
  );
};

export default Onboarding;