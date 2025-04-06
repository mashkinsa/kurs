import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Для навигации
import './Login.css'; // Стили для страницы входа

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Хук для навигации

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику для авторизации
    alert(`Вход выполнен: ${email}`);
    navigate('/'); // Перенаправляем на главную страницу после входа
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};

export default Login;