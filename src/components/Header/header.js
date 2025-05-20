import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/context/CartContext';
import { useFavorites } from '../Favourites/context/FavouritesContext';
import { searchGames } from '../../api/gameService';
import './Header.css';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Поиск игр при изменении запроса
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchGames(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    }, 300); // Задержка для debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (gameId) => {
    navigate(`/game/${gameId}`);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="home-button">
          <img src="/images/start.svg" alt="Домой" />
        </Link>
      </div>
      
      <div className="header-center">
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Поиск игр..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.slice(0, 5).map(game => (
                <div
                  key={game.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(game.id)}
                >
                  <img src={game.media.mainImage} alt={game.title} className="search-result-image" />
                  <div className="search-result-info">
                    <span className="search-result-title">{game.title}</span>
                    <span className="search-result-price">{game.specs.price}₽</span>
                  </div>
                </div>
              ))}
              {searchResults.length > 5 && (
                <div className="search-more-results" onClick={handleSearchSubmit}>
                  Показать все результаты ({searchResults.length})
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      <div className="header-right">
        <Link to="/favourites" className="icon-button">
          <img src="/images/favorite.svg" alt="Избранное" />
          {favorites.length > 0 && <span className="favourites-count">{favorites.length}</span>}
        </Link>
        <Link to="/login" className="icon-button">
          <img src="/images/login.svg" alt="Войти" />
        </Link>
        <Link to="/cart" className="icon-button cart-icon">
          <img src="/images/cart.svg" alt="Корзина" />
          {cart.length > 0 && <span className="cart-count">{count}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;