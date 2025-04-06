// src/components/Filters.js
import React, { useState } from 'react';
import './Filters.css';

// Вспомогательные функции для фильтрации
export const getTimeDisplay = (game) => {
  return game.specs.time.max 
    ? `${game.specs.time.min}-${game.specs.time.max} мин`
    : `от ${game.specs.time.min} мин`;
};

export const filterGames = (games, filters) => {
    return games.filter(game => {
      // Фильтрация по цене
      if (game.specs.price < filters.price[0] || game.specs.price > filters.price[1]) {
        return false;
      }
      
      // Фильтрация по возрасту
      if (game.specs.age.min > filters.age[1] || 
          (game.specs.age.max !== null && game.specs.age.max < filters.age[0])) {
        return false;
      }
      
      // Фильтрация по времени игры
      if (game.specs.time.min > filters.time[1] || 
          (game.specs.time.max !== null && game.specs.time.max < filters.time[0])) {
        return false;
      }
      
      // Фильтрация по игрокам
      if (game.specs.players.min > filters.players[1] || 
          game.specs.players.max < filters.players[0]) {
        return false;
      }
      
      // Фильтрация по категориям (исправленная логика)
      if (filters.categories.length > 0) {
        // Игра должна содержать ВСЕ выбранные категории
        return filters.categories.every(cat => game.categories.includes(cat));
      }
      
      return true;
    });
  };

// Константы для фильтров
const FILTER_RANGES = {
  price: { min: 0, max: 9999 },
  time: { min: 0, max: 180 },
  players: { min: 2, max: 8 },
  age: { min: 0, max: 99 }
};

const ALL_CATEGORIES = [
  'детские', 'семейные', 'карточные', 'на компанию', 
  'стратегические', 'экономические', 'приключенческие'
];

const DEFAULT_FILTERS = {
  price: [FILTER_RANGES.price.min, FILTER_RANGES.price.max],
  age: [FILTER_RANGES.age.min, FILTER_RANGES.age.max],
  time: [FILTER_RANGES.time.min, FILTER_RANGES.time.max],
  players: [FILTER_RANGES.players.min, FILTER_RANGES.players.max],
  categories: []
};

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const calculatePercentage = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRangeChange = (name, values) => {
    handleFilterChange({ ...filters, [name]: values });
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    handleFilterChange({ ...filters, categories: newCategories });
  };

  const resetFilters = () => {
    handleFilterChange(DEFAULT_FILTERS);
  };

  // Генерация свойств для range-инпутов
  const getRangeProps = (name) => {
    const range = FILTER_RANGES[name];
    const [min, max] = filters[name];
    return {
      minPercent: calculatePercentage(min, range.min, range.max),
      maxPercent: calculatePercentage(max, range.min, range.max),
      minValue: min,
      maxValue: max,
      label: `${min}-${max}${name === 'price' ? ' ₽' : name === 'time' ? ' мин' : ''}`
    };
  };

  const priceProps = getRangeProps('price');
  const timeProps = getRangeProps('time');
  const playersProps = getRangeProps('players');

  return (
    <div className="filters">
      <h3>Фильтры</h3>

      {/* Фильтр по цене */}
      <div className="filter-group">
        <label>Цена: {priceProps.label}</label>
        <div 
          className="range-input" 
          style={{
            '--min-percent': `${priceProps.minPercent}%`,
            '--max-percent': `${priceProps.maxPercent}%`
          }}
        >
          <input
            type="range"
            min={FILTER_RANGES.price.min}
            max={FILTER_RANGES.price.max}
            value={priceProps.minValue}
            onChange={(e) => handleRangeChange('price', [parseInt(e.target.value), filters.price[1]])}
          />
          <input
            type="range"
            min={FILTER_RANGES.price.min}
            max={FILTER_RANGES.price.max}
            value={priceProps.maxValue}
            onChange={(e) => handleRangeChange('price', [filters.price[0], parseInt(e.target.value)])}
          />
        </div>
      </div>

      {/* Фильтр по времени игры */}
      <div className="filter-group">
        <label>Время игры: {timeProps.label}</label>
        <div 
          className="range-input"
          style={{
            '--min-percent': `${timeProps.minPercent}%`,
            '--max-percent': `${timeProps.maxPercent}%`
          }}
        >
          <input
            type="range"
            min={FILTER_RANGES.time.min}
            max={FILTER_RANGES.time.max}
            value={timeProps.minValue}
            onChange={(e) => handleRangeChange('time', [parseInt(e.target.value), filters.time[1]])}
          />
          <input
            type="range"
            min={FILTER_RANGES.time.min}
            max={FILTER_RANGES.time.max}
            value={timeProps.maxValue}
            onChange={(e) => handleRangeChange('time', [filters.time[0], parseInt(e.target.value)])}
          />
        </div>
      </div>

      {/* Фильтр по количеству игроков */}
      <div className="filter-group">
        <label>Игроков: {playersProps.label}</label>
        <div 
          className="range-input"
          style={{
            '--min-percent': `${playersProps.minPercent}%`,
            '--max-percent': `${playersProps.maxPercent}%`
          }}
        >
          <input
            type="range"
            min={FILTER_RANGES.players.min}
            max={FILTER_RANGES.players.max}
            value={playersProps.minValue}
            onChange={(e) => handleRangeChange('players', [parseInt(e.target.value), filters.players[1]])}
          />
          <input
            type="range"
            min={FILTER_RANGES.players.min}
            max={FILTER_RANGES.players.max}
            value={playersProps.maxValue}
            onChange={(e) => handleRangeChange('players', [filters.players[0], parseInt(e.target.value)])}
          />
        </div>
      </div>

      {/* Фильтр по категориям */}
      <div className="filter-group">
        <label>Категории:</label>
        <div className="categories-list">
          {ALL_CATEGORIES.map(category => (
            <label key={category} className="category-item">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="checkmark"></span>
              {category}
            </label>
          ))}
        </div>
      </div>
      <button className="reset-btn" onClick={resetFilters}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;