// src/pages/login.js
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import { Container, Box, Typography } from '@mui/material';

const Login = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  const handleLoginSuccess = () => {
    router.push('/home');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <LoginForm onSuccess={handleLoginSuccess} />
        <Box mt={3}>
          <Typography variant="body1">
            Don&apos;t have an account?{' '}
            <Link href="/signup">
              <a>Create one</a>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
