import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { CartContext } from '../context/CartContext';
import { games } from './GamesData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GameDetails.css';
import './Slider.css';

const GameDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const game = games.find(game => game.id === id);

  if (!game) {
    return (
      <div className="not-found-container">
        <h2>Игра не найдена</h2>
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
          <p className="game-price">{game.specs.price}</p>
          <button 
            className="add-to-cart" 
            onClick={() => addToCart({
              ...game,
              quantity: 1
            })}
          >
            Добавить в корзину
          </button>
        </div>
        <div className="game-slider">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination
            loop={true}
          >
            {game.media.gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="slide-image-container">
                  <img src={image} alt={`${game.title} ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Link to="/" className="back-button">
        Назад к каталогу
      </Link>
    </div>
  );
};

export default GameDetails;