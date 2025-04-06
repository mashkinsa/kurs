import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Импортируем контекст
import './Header.css';

const Header = () => {
  const { cart } = useContext(CartContext); // Используем контекст
  const showMessage = () => {
    alert('Это будет потом');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="home-button">
          <img src="/images/start.svg" alt="Домой" />
        </Link>
      </div>
      <div className="header-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск"
            className="search-input"
            onClick={showMessage}
          />
        </div>
      </div>
      <div className="header-right">
        <Link to="/login" className="icon-button">
          <img src="/images/login.svg" alt="Войти" />
        </Link>
        <Link to="/cart" className="icon-button"> {/* Ссылка на корзину */}
          <img src="/images/cart.svg" alt="Корзина" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>} {/* Показываем количество товаров в корзине */}
        </Link>
      </div>
    </header>
  );
};

export default Header;