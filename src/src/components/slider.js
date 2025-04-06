import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Импортируем Swiper и SwiperSlide
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Импортируем модули
import 'swiper/css'; // Основные стили Swiper
import 'swiper/css/navigation'; // Стили для навигации
import 'swiper/css/pagination'; // Стили для пагинации
import 'swiper/css/autoplay'; // Стили для автопрокрутки

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Подключаем модули
      slidesPerView={3}
      spaceBetween={50}
      centeredSlides={true}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        clickable: true,
      }}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      onSlideChange={(swiper) => {
        const slides = swiper.slides;
        slides.forEach((slide) => {
          slide.style.opacity = '0.5';
        });
        slides[swiper.activeIndex].style.opacity = '1';
      }}
    >
      <SwiperSlide>
        <img src="/images/preview_monopoly.jpg" alt="Акция 1" className="img-fluid" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/sales.jpg" alt="Акция 2" className="img-fluid" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Bang1.jpg" alt="Акция 3" className="img-fluid" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Carcassonne1.jpeg" alt="Акция 4" className="img-fluid" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Citadels1.jpg" alt="Акция 5" className="img-fluid" />
      </SwiperSlide>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
};

export default Slider;