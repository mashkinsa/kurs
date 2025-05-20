import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Cart/context/CartContext';
import { useFavorites } from '../Favourites/context/FavouritesContext';
import './GameCard.css';
import { getTimeDisplay } from '../../api/gameService';

const GameCard = ({ game }) => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorite(game.id) ? removeFromFavorites(game.id) : addToFavorites(game);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ ...game, quantity: 1 });
  };

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <button 
        className={`favorite-btn ${isFavorite(game.id) ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite(game.id) ? "Удалить из избранного" : "Добавить в избранное"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
      
      <div className="game-image">
        <img src={game.media.mainImage} alt={game.title} loading="lazy"/>
      </div>
      
      <div className="game-info">
        <h3>{game.title}</h3>
        
        <div className="game-specs-row">
          <div className="spec-item">
            <span className="spec-label">Возраст</span>
            <span className="spec-value">{game.specs.age.min}+</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Время</span>
            <span className="spec-value">{getTimeDisplay(game)}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Игроки</span>
            <span className="spec-value">{game.specs.players.min}-{game.specs.players.max}</span>
          </div>
        </div>
        
        <p className="short-description">{game.description.short}</p>
        
        <div className="game-footer">
          <div className="price">{game.specs.price}₽</div>
          <button 
            className="add-to-cart" 
            onClick={handleAddToCart}
          >
            В корзину
          </button>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;