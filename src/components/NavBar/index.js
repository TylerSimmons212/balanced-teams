import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import AccountIcon from '../AccountIcon';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { AuthContext } from '../../contexts/AuthContext';
import Image from 'next/image';
import logo from '../../../images/logo.png'

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
          <Button color="inherit" onClick={handlePlayersClick} sx={{backgroundColor: "#FC4445"}}>
            <PeopleAltIcon />
          </Button>
        )}
        {isPlayersPage && (
          <Button color="inherit" onClick={handleHomeClick} sx={{backgroundColor: "#FC4445"}}>
            <HomeIcon />
          </Button>
        )}
        {user && <AccountIcon onLogout={logout} />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;