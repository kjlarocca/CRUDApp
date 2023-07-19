import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-auth-kit';

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
    >
    <App />
    </AuthProvider>
  </React.StrictMode>

);
