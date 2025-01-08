"use client";
import styles from "./Articles.module.css";
import Article from "@/components/modules/Article/Article";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

function Articles() {
  let swiperInstance = 0;
  return (
    <main className="container">
      <section>
        <span className={styles.title}>Articles</span>
        <p className={styles.subtitle}>Fascinating Facts About the World of Coffee</p>
      </section>
      <section className={styles.slider}>
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper home-slider"
          loop={true}
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperInstance = swiper)}
        >
          <SwiperSlide
            onMouseEnter={() => swiperInstance.autoplay.stop()}
            onMouseLeave={() => swiperInstance.autoplay.start()} 
          >
            <Article />
          </SwiperSlide>
          <SwiperSlide
            onMouseEnter={() => swiperInstance.autoplay.stop()} 
            onMouseLeave={() => swiperInstance.autoplay.start()}
          >
            <Article />
          </SwiperSlide>
          <SwiperSlide
            onMouseEnter={() => swiperInstance.autoplay.stop()}
            onMouseLeave={() => swiperInstance.autoplay.start()}
          >
            <Article />
          </SwiperSlide>
          <SwiperSlide
            onMouseEnter={() => swiperInstance.autoplay.stop()} 
            onMouseLeave={() => swiperInstance.autoplay.start()}
          >
            <Article />
          </SwiperSlide>
          <SwiperSlide
            onMouseEnter={() => swiperInstance.autoplay.stop()}
            onMouseLeave={() => swiperInstance.autoplay.start()}
          >
            <Article />
          </SwiperSlide>
          <SwiperSlide
            onMouseEnter={() => swiperInstance.autoplay.stop()}
            onMouseLeave={() => swiperInstance.autoplay.start()}
          >
            <Article />
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  );
}

export default Articles;
