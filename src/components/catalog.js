import React, { useState } from 'react';
import Slider from './slider';
import './Catalog.css';
import { games } from './GamesData';
import { Link } from 'react-router-dom';
import Filters, { filterGames, getTimeDisplay } from './Filters';


const Catalog = () => {
  const [filters, setFilters] = useState({
    price: [0, 5000],
    age: [0, 99],
    time: [0, 180],
    players: [2, 8],
    categories: []
  });

  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-asc', 'price-desc'

  // Применяем фильтры и сортировку
  const filteredGames = filterGames(games, filters);

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.specs.price - b.specs.price;
      case 'price-desc':
        return b.specs.price - a.specs.price;
      default:
        return 0;
    }
  });

  return (
    <div>
      <Slider />
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Каталог настольных игр</h1>
        <div className="controls">
          <div className="sorting">
            <label>Сортировка:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена (по возрастанию)</option>
              <option value="price-desc">Цена (по убыванию)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="catalog-content">
        <aside className="filters-sidebar">
          <Filters 
            filters={filters}
            onFilterChange={setFilters}
          />
        </aside>

        <main className="games-grid">
          {sortedGames.length > 0 ? (
            sortedGames.map(game => (
              <GameCard 
                key={game.id}
                game={game}
              />
            ))
          ) : (
            <div className="no-results">
              <h3>Игры не найдены</h3>
              <p>Попробуйте изменить параметры фильтрации</p>
            </div>
          )}
        </main>
      </div>
    </div>
    </div>
  );
};

// Компонент карточки игры
const GameCard = ({ game, viewMode }) => {
  return (
    <div className={`game-card ${viewMode}`}>
      <div className="game-image">
        <img 
          src={game.media.mainImage} 
          alt={game.title}
          loading="lazy"
        />
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
          <Link to={`/game/${game.id}`} className="details-btn">
              Подробнее
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Catalog;