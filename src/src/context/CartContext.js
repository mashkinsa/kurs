import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Добавить игру в корзину
  const addToCart = (game) => {
    setCart((prevCart) => {
      const existingGame = prevCart.find((item) => item.id === game.id);
      if (existingGame) {
        return prevCart.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...game, quantity: 1 }];
    });
  };

  // Удалить игру из корзины
  const removeFromCart = (gameId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== gameId));
  };

  // Увеличить количество игры
  const increaseQuantity = (gameId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === gameId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Уменьшить количество игры
  const decreaseQuantity = (gameId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === gameId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Очистить корзину
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};