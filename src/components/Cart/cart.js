import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Cart/context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.specs.price * item.quantity, 0);

  const clearCartWithConfirm = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      clearCart();
    }
  };

  const getItemsWord = (count) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const words = ['товар', 'товара', 'товаров'];
    return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
  };
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Корзина</h1>
        <span className="items-count">{count} {getItemsWord(count)}</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
          <Link to="/" className="back-to-catalog">Вернуться к покупкам</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.media.mainImage} alt={item.title} className="item-image" />
                
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <div className="item-price">{item.specs.price} ₽</div>
                  
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                      Удалить
                    </button>
                  </div>
                </div>
                
                <div className="item-total-price">{item.specs.price * item.quantity} ₽</div>
              </div>
            ))}
            
            <button className="clear-cart" onClick={clearCartWithConfirm}>
              Очистить корзину
            </button>
          </div>
          
          <div className="order-summary">
            <h3>Ваш заказ</h3>
            
            <div className="items-list">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  {item.title} x{item.quantity}
                </div>
              ))}
            </div>
            
            <div className="summary-row">
              <span>Товары ({count})</span>
              <span>{totalPrice} ₽</span>
            </div>
            
            <div className="summary-total">
              <span>Итого</span>
              <span>{totalPrice} ₽</span>
            </div>
            
            <Link to="/checkout" className="checkout-button">
              Перейти к оформлению
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;