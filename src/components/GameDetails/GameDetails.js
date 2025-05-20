import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { CartContext } from '../Cart/context/CartContext';
import { fetchGameById } from '../../api/gameService'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GameDetails.css';
import '../Slider/Slider.css';
import Loader from '../Loader/Loader'; 
import ErrorMessage from '../ErrorMessage/ErrorMessage'; 

const GameDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchGameById(id);
        if (!data) {
          throw new Error('Игра не найдена');
        }
        
        setGame(data);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки игры:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  // Состояния загрузки и ошибки
  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="not-found-container">
        <ErrorMessage message={error} />
        <Link to="/" className="back-button">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="game-details">
      <h1>{game.title}</h1>
      <div className="game-info-game-details">
        <div className="game-description">
          <p>{game.description.full}</p>
          <div className="game-stats">
            <img src={game.specs.age.image} alt="Возраст" />
            <img src={game.specs.time.image} alt="Время игры" />
            <img src={game.specs.players.image} alt="Количество игроков" />
          </div>
          <div className="game-price-container">
            <div className="game-price">{game.specs.price}₽</div>
            <button 
              className="add-to-cart" 
              onClick={() => addToCart({
                ...game,
                quantity: 1
              })}
              aria-label={`Добавить ${game.title} в корзину`}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
        
        <div className="game-slider">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            grabCursor={true}
          >
            {game.media.gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="slide-image-container">
                  <img 
                    src={image} 
                    alt={`${game.title} - ${index + 1}`} 
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <Link to="/" className="back-button" aria-label="Вернуться к каталогу">
        Назад к каталогу
      </Link>
    </div>
  );
};

export default GameDetails;