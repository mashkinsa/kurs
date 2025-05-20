import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/Cart/context/CartContext'; // Импортируем CartProvider
import { FavoritesProvider } from './components/Favourites/context/FavouritesContext';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <FavoritesProvider>
      <CartProvider> {/* Оберни приложение в CartProvider */}
        <App />
      </CartProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);