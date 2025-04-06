import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GameDetails.css';
const games = [
    {
        id: "black_sheep",      
        title: "Чёрная овечка",
        description: "Весёлая карточная игра для любой компании. Соберите животных для своего зоопарка!",
        age: "../images/Age 7+.png",
        time: "../images/Time 20+.png",
        players: "../images/Players 2-5.png",
        price: "690₽",
        link: "../boardgames/Black Sheep.html",
        img: "../images/Black Sheep.jpg"
    },
    {
        id: "bang",     
        title: "Бэнг!",
        description: "Стрельба, интриги и выживание в духе Дикого Запада!",
        age: "../images/Age 12+.png",
        time: "../images/Time 20-40.png",
        players: "../images/Players 4-7.png",
        price: "990₽",
        link: "../boardgames/Bang.html",
        img: "../images/Bang.jpg"
    },
    {
        id: "carcassone",       
        title: "Каркассон",
        description: "Создайте пейзажи средневековой Франции.",
        age: "../images/Age 7+.png",
        time: "../images/Time 30+.png",
        players: "../images/Players 2-5.png",
        price: "1290₽",
        link: "../boardgames/Carcassonne.html",
        img: "../images/Carcassonne.jpg"
    },
    {
        id:"machi_koro",
        title: "Мачи Коро",
        description: "Постройте свой город и станьте первым мэром, кто построил самый красивый город",
        age: "../images/Age 7+.png",
        time: "../images/Time 30+.png",
        players: "../images/Players 2-5.png",
        price: "1290₽",
        link: "../boardgames/Machi Koro.html",
        img: "../images/Machi Koro.jpg"
    },
    {
        id:"monopoly",
        title: "Монополия",
        description: "Классическая игра про недвижимость.",
        age: "../images/Age 12+.png",
        time: "../images/Time 20-40.png",
        players: "../images/Players 4-7.png",
        price: "2990₽",
        link: "../boardgames/Monopoly.html",
        img: "../images/Monopoly.jpg"
    },
    {
        id:"citadels",
        title: "Цитадели Делюкс",
        description: "Стратегическая игра о строительстве города и выборе скрытых ролей.",
        age: "../images/Age 10+.png",
        time: "../images/Time 30+.png",
        players: "../images/Players 2-5.png",
        price: "2990₽",
        link: "../boardgames/Citadels.html",
        img: "../images/Citadels.jpg"
    },
    { 
        id: "catan",
        title: "Catan. Колонизаторы",
        description: "Торгуйте с другими игроками и стройте дороги и города, чтобы первым набрать очки.",
        age: "../images/Age 10+.png",
        time: "../images/Time 60-90.png",
        players: "../images/Players 3-4.png",
        price: "3990₽",
        link: "../boardgames/Catan.html",
        img: "../images/Catan.jpg"
    },
    {
        id:"pandemic",
        title: "Пандемия",
        description: "Кооперативная игра о спасении мира от смертельных вирусов.",
        age: "../images/Age 10+.png",
        time: "../images/Time 30+.png",
        players: "../images/Players 2-4.png",
        price: "3190₽",
        link: "../boardgames/Pandemic.html",
        img: "../images/Pandemic.jpg"
    },

];


const Catalog = () => {
  const [visibleGames, setVisibleGames] = useState(3);

  const handleShowMore = () => {
    setVisibleGames((prevVisibleGames) => prevVisibleGames + 3);
  };

  return (
    <div className="container">
      <div className="catalog">
        {games.slice(0, visibleGames).map((game) => (
          <div className="game" key={game.id}>
            <img src={game.img} alt={game.title} />
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <div className="game-info">
              <img src={game.age} alt="Возраст" />
              <img src={game.time} alt="Время" />
              <img src={game.players} alt="Игроки" />
            </div>
            <h3>{game.price}</h3>
            <Link to={`/game/${game.id}`} className="details-button">
              Подробнее
            </Link>
          </div>
        ))}
      </div>
      {visibleGames < games.length && (
        <button className="btn btn-primary" onClick={handleShowMore}>
          Показать ещё
        </button>
      )}
    </div>
  );
};

export default Catalog;