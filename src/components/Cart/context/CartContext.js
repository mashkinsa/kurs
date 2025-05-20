import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const getToastId = (id) => `game-${id}`;

  const addToCart = useCallback((game) => {
    setCart(prevCart => {
      const existingGame = prevCart.find(item => item.id === game.id);
      const toastId = getToastId(game.id);

      if (existingGame) {
        toast.success(`Количество "${game.title}" увеличено!`, {
          toastId,
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          updateId: toastId 
        });
        return prevCart.map(item =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      toast.success(`"${game.title}" добавлен в корзину!`, {
        toastId,
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      return [...prevCart, { ...game, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((gameId) => {
    setCart(prevCart => {
      return prevCart.filter(item => item.id !== gameId);
    });
  }, []);

  const increaseQuantity = useCallback((gameId) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === gameId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((gameId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === gameId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};