import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace('₽', '')) * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h1>Корзина</h1>
      {cart.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.mainImage} alt={item.title} />
                <div className="cart-item-info">
                  <h2>{item.title}</h2>
                  <p>{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>Удалить</button>
                  
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Итого: {totalPrice.toFixed(2)}₽</h2>
            <button className="clear-cart" onClick={clearCart}>Очистить корзину</button>
            <Link to="/checkout" className="checkout-button">
              Оформить заказ
            </Link>
          </div>
        </>
      )}
      <Link to="/" className="back-button">
        Назад к каталогу
      </Link>
    </div>
  );
};

export default Cart;