import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
export const Slider = () => {
  <Swiper
    spaceBetween={50}
    slidesPerView={3}
    onSlideChange={() => console.log("slide change")}
    onSwiper={(swiper) => console.log(swiper)}
  >
    {slides.map((slide) => (
      <SwiperSlide key={slide.image}>
        
      </SwiperSlide>
    ))}
  </Swiper>;
};
