import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import PlayerForm from '../components/PlayerForm';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { usePlayers } from '../hooks/usePlayers';
import { AuthContext } from '../contexts/AuthContext';

const Onboarding = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { addPlayer } = usePlayers(user?.uid);
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlayerSubmit = async (player) => {
    setIsLoading(true);

    try {
      await addPlayer(player);

      // Redirect to the home page
      router.push('/home');
    } catch (error) {
      console.error('Error adding player:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4">
          Add Your First Player
        </Typography>
        <PlayerForm onSubmit={handlePlayerSubmit} showCancelButton={false} />
        {isLoading && <CircularProgress style={{ marginTop: '20px' }} />}
      </Box>
    </Container>
  );
};

export default Onboarding;
