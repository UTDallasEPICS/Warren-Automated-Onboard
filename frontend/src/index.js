import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <ChakraProvider > */}
      <BrowserRouter>
        <Auth0Provider
          domain="the-warren-center.us.auth0.com"
          clientId="hvsbhpQc5ImpK85Gpoo3Mrlebbfs1ogZ"
          cacheLocation="localstorage"
          authorizationParams={{
            redirect_uri: `http://localhost:3000/login-redirect`,
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
