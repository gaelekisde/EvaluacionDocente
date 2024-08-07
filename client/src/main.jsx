import React from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import './Main.css'
import App from './App';

// Crear un punto de montaje usando createRoot
const root = createRoot(document.getElementById('root'));

// Renderizar la aplicación dentro del punto de montaje
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
