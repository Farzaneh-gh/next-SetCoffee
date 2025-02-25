"use client";
import Product from "@/components/modules/Product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./MoreProducts.module.css";
const MoreProducts = ({products}) => {
  return (
    <div data-aos="fade-right" className={styles.container}>
      <section >
        <h2 className={styles.title}>More Products :</h2>
        <div
          style={{
            height: "1px",
            width: "100%",
            background: "gray",
            marginTop: "1rem",
          }}
        ></div>
      </section>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper "
      >
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreProducts;
