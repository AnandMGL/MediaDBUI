import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper";
import { Link } from "react-router-dom";
import "./index.scss";

export default function Slider() {
  return (
    <div className="slider">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <Link to="">
            <img src="/assets/images/home-slider/slide1.jpg" alt="slide1" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="">
            <img src="/assets/images/home-slider/slide2.jpg" alt="slide2" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="">
            <img src="/assets/images/home-slider/slide3.png" alt="slide3" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
