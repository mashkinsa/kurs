import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './Slider.css';

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
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
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50
        }
      }}
    >
      <SwiperSlide>
        <div className="slide-image-container">
          <img 
            src="/images/preview_monopoly.jpg" 
            alt="Акция 1" 
            className="slide-image"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-image-container">
          <img 
            src="/images/sales.jpg" 
            alt="Акция 2" 
            className="slide-image"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-image-container">
          <img 
            src="/images/Bang1.jpg" 
            alt="Акция 3" 
            className="slide-image"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-image-container">
          <img 
            src="/images/Pandemic1.jpg" 
            alt="Акция 4" 
            className="slide-image"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-image-container">
          <img 
            src="/images/Citadels1.jpg" 
            alt="Акция 5" 
            className="slide-image"
          />
        </div>
      </SwiperSlide>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
};

export default Slider;