import React, { useState, useEffect } from 'react';
import Slider from '../Slider/slider';
import './Catalog.css';
import { fetchGames, filterGames, getTimeDisplay } from '../../api/gameService'; // Импортируем API функции
import Filters from '../Filters/Filters';
import GameCard from '../GameCard/GameCard';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Catalog = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    price: [0, 5000],
    age: [0, 99],
    time: [0, 180],
    players: [2, 8],
    categories: [],
  });
  const [sortBy, setSortBy] = useState('default');

  // Загрузка игр при монтировании компонента
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

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

  // Состояния загрузки и ошибки
  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

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
                aria-label="Сортировка игр"
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
                  getTimeDisplay={getTimeDisplay}
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

export default Catalog;