// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './GameDetails.css';
// const GameDetails = () => {
//   const { id } = useParams(); // Получаем ID игры из URL
//   const game = games.find((game) => game.id === id); // Находим игру по ID

//   if (!game) {
//     return <div>Игра не найдена</div>;
//   }

//   return (
//     <div className="game-details">
//       <h1>{game.title}</h1>
//       <div className="game-info-game-details">
//         <div className="game-description">
//           <p>{game.description}</p>
//           <div className="game-stats">
//             <img src={game.age} alt="Возраст" />
//             <img src={game.time} alt="Длительность" />
//             <img src={game.players} alt="Количество игроков" />
//           </div>
//           <p className="game-price">{game.price}</p>
//           <button className="add-to-cart">Добавить в корзину</button>
//         </div>
//         <div className="game-slider">
//           <Swiper
//             modules={[Navigation, Pagination]}
//             navigation
//             pagination={{ clickable: true }}
//             loop
//           >
//             {game.images.map((image, index) => (
//               <SwiperSlide key={index}>
//                 <img src={image} alt={`${game.title} ${index + 1}`} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//       <Link to="/" className="back-button">
//         Назад к каталогу
//       </Link>
//     </div>
//   );
// };

// export default GameDetails;




import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { CartContext } from '../context/CartContext'; // Импортируем контекст
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GameDetails.css';

const games = [
    {
      id: 'black_sheep',
      title: 'Чёрная овечка',
      description: 'Детская настольная игра, в которой игроки пытаются собрать коллекцию животных, живущих на ферме, таких как коровы, овцы, свиньи и куры. На каждом ходу игроки тянут карты из общей колоды и пытаются составить пары животных, но есть особые карты, такие как черная овечка, которая может усложнить игру. Игроки могут обмениваться картами, чтобы быстрее собрать нужные пары. Побеждает тот, кто первым соберет полную коллекцию животных, проявляя при этом стратегию и удачу.',
      age: '/images/Age 7+.png',
      time: '/images/Time 20+.png',
      players: '/images/Players 2-5.png',
      price: '690₽',
      mainImage: '/images/Black Sheep.jpg',
      images: [
        '/images/Black Sheep1.jpg',
        '/images/Black Sheep2.jpg',
        '/images/Black Sheep3.jpg',
      ],
    },
    {
      id: 'bang',
      title: 'Бэнг',
      description: 'Карточная игра в жанре "дикого запада", где игроки берут на себя роли шерифа, его помощников, бандитов и ренегата. Цель игры зависит от роли: шерифу нужно поймать бандитов, а бандитам – устранить шерифа. Игру отличают скрытые роли, интриги и взаимодействия между игроками. Легкая и динамичная, она привлекает элементами блефа и социальной динамики.',
      age: '/images/Age 12+.png',
      time: '/images/Time 20-40.png',
      players: '/images/Players 4-7.png',
      price: '990₽',
      mainImage: '/images/Bang.jpg',
      images: [
        '/images/Bang1.jpg',
        '/images/Bang2.jpg',
        '/images/Bang3.jpg',

      ],
    },
    {
      id: 'carcassone',
      title: 'Каркассон',
      description: 'Классическая игра по укладке плиток, где игроки строят средневековый ландшафт с городами, дорогами, монастырями и полями. Каждое выполненное задание приносит очки, и игроки стараются стратегически размещать свои плитки и миплов. Игра легко осваивается, но предлагает глубокие тактические решения. Постепенное развитие игрового поля делает каждую партию уникальной.',
      age: '/images/Age 7+.png',
      time: '/images/Time 30+.png',
      players: '/images/Players 2-5.png',
      price: '1290₽',
      mainImage: '/images/Carcassone.jpg',
      images: [
        '/images/Carcassonne.jpg',
        '/images/Carcassonne1.jpeg',
        '/images/Carcassonne2.jpg',
      ],
    },
    {
      id: 'machi_koro',
      title: 'Мачи Коро',
      description: 'Лёгкая и быстрая карточная игра, в которой игроки стремятся развить свой маленький город и выполнить четыре главных строительства. Игроки бросают кубики, чтобы активировать здания и получать прибыль, которую затем вкладывают в новые здания. Правила просты, а игра полна случайностей и веселья. Отличный выбор для семейных игр и вечеринок.',
      age: '/images/Age 7+.png',
      time: '/images/Time 30+.png',
      players: '/images/Players 2-5.png',
      price: '1290₽',
      mainImage: '/images/Machi Koro.jpg',
      images: [
        '/images/Machi Koro.jpg',
        '/images/Machi Koro1.jpeg',
        '/images/Machi Koro2.jpg',
        '/images/Machi Koro3.webp',
      ],
    },
    {
      id: 'monopoly',
      title: 'Монополия',
      description: 'Икону настольных игр знают все – здесь игроки покупают, продают и развивают недвижимость, стремясь стать монополистом. Ключевые элементы игры включают сделки с соперниками и управление деньгами. Игра сочетает удачу и стратегию, а партии могут длиться несколько часов. Это одна из самых известных игр в мире, которая часто вызывает острые эмоции.',
      age: '/images/Age 8+.png',
      time: '/images/Time 30+.png',
      players: '/images/Players 2-6.png',
      price: '2990₽',
      mainImage: '/images/Monopoly.jpg',
      images: [
        '/images/Monopoly.jpg',
        '/images/Monopoly1.jpg',
        '/images/Monopoly2.webp',
      ],
    },
    {
      id: 'citadels',
      title: 'Цитадели Делюкс',
      description: 'В этой стратегической игре игроки берут на себя роли герцогов, королей, убийц и других персонажей, стремясь построить самый великолепный город. Каждый ход игроки выбирают персонажа с уникальными способностями, которые влияют на развитие их города и взаимодействие с игроками. Версия «Делюкс» включает дополнительные карты и расширения, добавляющие разнообразие и реиграбельность. Большая стратегия и тактика делают игру глубокой и увлекательной.',
      age: '/images/Age 10+.png',
      time: '/images/Time 30-60.png',
      players: '/images/Players 2-8.png',
      price: '2990₽',
      mainImage: '/images/Citadels.jpg',
      images: [
        '/images/Citadels.jpg',
        '/images/Citadels1.jpg',
        '/images/Citadels2.jpg',
      ],
    },
    {
      id: 'catan',
      title: 'Catan. Колонизаторы',
      description: 'Catan — это стратегическая настольная игра, в которой участники выступают в роли колонистов, стремящихся развить свои поселения на острове. Игроки собирают ресурсы — дерево, шерсть, зерно, кирпич и руду — в зависимости от расположения своих поселений и кидают кубики для определения добычи. Ресурсы используются для строительства дорог, новых поселений и городов, а также для покупки карт развития. Важным аспектом игры является торговля ресурсами между игроками, что добавляет элемент взаимодействия и стратегии. Побеждает тот, кто первым набирает установленное количество победных очков, достигая этого через разработку и торговлю.',
      age: '/images/Age 10+.png',
      time: '/images/Time 60-90.png',
      players: '/images/Players 3-4.png',
      price: '3990₽',
      mainImage: '/images/Catan.jpg',
      images: [
        '/images/Catan.jpg',
        '/images/Catan1.webp',
        '/images/Catan2.jpg',
        '/images/Catan3.webp',
      ],
    },
    {
      id: 'pandemic',
      title: 'Пандемия',
      description: 'Кооперативная игра, в которой группа учёных и врачей объединяется, чтобы предотвратить глобальные эпидемии. Игроки совместно работают, чтобы исследовать лекарства и остановить распространение болезней. Требуется хорошая координация и стратегическое планирование, чтобы успеть вовремя. Эта игра предлагает напряжённую атмосферу и настоящий вызов для команды.',
      age: '/images/Age 10+.png',
      time: '/images/Time 30+.png',
      players: '/images/Players 2-4.png',
      price: '3190₽',
      mainImage: '/images/Pandemic.jpg',
      images: [
        '/images/Pandemic.jpg',
        '/images/Pandemic1.jpg',
        '/images/Pandemic2.webp',
        '/images/Pandemic3.jpg',
        '/images/Pandemic4.webp',
      ],
    },
  ];

const GameDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); // Используем контекст
  const game = games.find((game) => game.id === id);

  if (!game) {
    return <div>Игра не найдена</div>;
  }

  return (
    <div className="game-details">
      <h1>{game.title}</h1>
      <div className="game-info-game-details">
        <div className="game-description">
          <p>{game.description}</p>
          <div className="game-stats">
            <img src={game.age} alt="Возраст" />
            <img src={game.time} alt="Длительность" />
            <img src={game.players} alt="Количество игроков" />
          </div>
          <p className="game-price">{game.price}</p>
          <button className="add-to-cart" onClick={() => addToCart(game)}> {/* Добавляем игру в корзину */}
            Добавить в корзину
          </button>
        </div>
        <div className="game-slider">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
          >
            {game.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`${game.title} ${index + 1}`} />
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