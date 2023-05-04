// src/pages/_app.js
import React from 'react';
import AuthContextProvider from '../contexts/AuthContext';
import PlayersContextProvider from '../contexts/PlayersContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
        <AuthContextProvider>
          <PlayersContextProvider>
            <Component {...pageProps} />
          </PlayersContextProvider>
        </AuthContextProvider>
    </React.Fragment>
  );
}

export default MyApp;
