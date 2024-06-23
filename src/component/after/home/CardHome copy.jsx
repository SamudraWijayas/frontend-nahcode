import React from "react";
import IconStar from "../../../assets/img/icon/icon-after-star.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


import { ResepMakanan } from "../../../data";

const CardHome = () => {
  return (
    <section className="card" >
      <h1 data-aos="fade-up">Resep Terbaru</h1>
      <div className="item">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1173: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {ResepMakanan.map((data) => (
            <SwiperSlide key={data.id}>
              <a href="">
                <div className="card-1"  data-aos="fade-up" data-aos-delay={data.delay}>
                  <div
                    className="card-img"
                    style={{ backgroundImage: `url(${data.image})` }}
                  ></div>
                  <div
                    className="card-text"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    <div className="duo">
                      <p>{data.cate}</p>
                      <div className="icon-card">
                        <span>{data.rating}</span>
                      </div>
                    </div>
                    <h1>{data.name}</h1>
                    <span>Lihat Resep &gt;&gt;</span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination"></div>
      </div>
    </section>
  );
};

export default CardHome;
