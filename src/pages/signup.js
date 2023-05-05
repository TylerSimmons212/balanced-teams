// src/pages/signup.js
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import SignupForm from '../components/SignUpForm';
import { Container, Box, Typography } from '@mui/material';

const Signup = () => {
  const router = useRouter();

  const handleSignupSuccess = () => {
    router.push('/onboarding');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>
        <SignupForm onSuccess={handleSignupSuccess} />
      </Box>
    </Container>
  );
};

export default Signup;
