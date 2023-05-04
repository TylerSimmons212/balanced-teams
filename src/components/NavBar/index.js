import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import AccountIcon from '../AccountIcon';
import { AuthContext } from '../../contexts/AuthContext';

const NavBar = () => {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);
  const isHomePage = router.pathname === '/home';
  const isPlayersPage = router.pathname === '/players';

  const handlePlayersClick = () => {
    router.push('/players');
  };
  const handleHomeClick = () => {
    router.push('/home');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Team Balancer
        </Typography>
        {isHomePage && (
          <Button color="inherit" onClick={handlePlayersClick}>
            Players
          </Button>
        )}
        {isPlayersPage && (
          <Button color="inherit" onClick={handleHomeClick}>
            Home
          </Button>
        )}
        {user && <AccountIcon onLogout={logout} />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
