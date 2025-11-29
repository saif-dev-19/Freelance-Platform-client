
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import cup from "../../../assets/images/cup.webp";
import laptop from "../../../assets/images/laptop.webp";
import iphone from "../../../assets/images/iphone.webp";
import ipad from "../../../assets/images/ipad.webp";




// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CarouselSlide from './CarouselSlide';

const HeroCarousel =() => {

    const slides = [
        {
            title : "Find Top Talent Worldwide",
            subtitle : "Connect with skilled freelancers ready to bring your projects to life",
            image1 : laptop,
            image2 : cup,
            bg_color: "#6D28D9",
            title_color : "white",
            sub_color : "#E9D5FF",

        },
        {
            title : "Premium Services at Your Fingertips",
            subtitle : "Browse thousands of professional services from verified experts",
            image1 : iphone,
            image2: ipad,
            bg_color: "#3B82F6",
            title_color : "white",
            sub_color : "#DBEAFE",

        },
        {
            title : "Build Your Dream Project Today",
            subtitle : "Quality work delivered on time, every time. Start your journey now.",
            image1 : cup,
            image2: laptop,
            bg_color: "#0EA5E9",
            title_color : "white",
            sub_color : "#E0F2FE",

        },
    ]
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide,index) => (
            <SwiperSlide key={index}>
                <CarouselSlide 
                    title= {slide.title}
                    subtitle={slide.subtitle}
                    image1={slide.image1}
                    image2={slide.image2}
                    bg_color={slide.bg_color}
                    title_color = {slide.title_color}
                    sub_color = {slide.sub_color}
                />
            </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default HeroCarousel;
