import React from 'react';
import { useFavorites } from '../Favourites/context/FavouritesContext';
import { Link } from 'react-router-dom';
import GameCard from '../GameCard/GameCard'; 
import './Favourites.css';

const Favorites = () => {
  const { favorites } = useFavorites();

  const getItemsWord = (count) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const words = ['товар', 'товара', 'товаров'];
    return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Избранное</h1>
        <span className="items-count">{favorites.length} {getItemsWord(favorites.length)}</span>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>В избранном пока ничего нет</p>
          <Link to="/" className="back-to-catalog">Вернуться к покупкам</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(game => (
            <div key={game.id} className="favorite-item-wrapper">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;