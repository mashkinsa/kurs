// Базовый URL для API (файл в public)
const API_BASE = process.env.PUBLIC_URL || '';

// Получение всех игр
export const fetchGames = async () => {
  try {
    const response = await fetch(`${API_BASE}/games.json`);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    return data.games; // Возвращаем массив игр
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Пробрасываем ошибку для обработки в компонентах
  }
};


export const fetchGameById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/games.json`);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    return data.games.find(game => game.id === id);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


// Фильтрация игр
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
    
    // Фильтрация по категориям
    if (filters.categories.length > 0) {
      return filters.categories.every(cat => game.categories.includes(cat));
    }
    
    return true;
  });
};

// Вспомогательная функция для отображения времени
export const getTimeDisplay = (game) => {
  return game.specs.time.max 
    ? `${game.specs.time.min}-${game.specs.time.max} мин`
    : `от ${game.specs.time.min} мин`;
};


export const searchGames = async (query) => {
  try {
    const response = await fetch(`${API_BASE}/games.json`);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];
    
    return data.games.filter(game => {
      return (
        game.title.toLowerCase().includes(normalizedQuery)
      );
    });
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};