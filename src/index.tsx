import React from 'react';
import ReactDOM from 'react-dom/client'; // Correto
import { ConfigProvider } from './context/ConfigContext'; // Correto, importando ConfigProvider
import App from './App';
import { AuthProvider } from './context/AuthContext'; // AuthProvider importado corretamente

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>
);