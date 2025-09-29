
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
            title : "MOBILE FRIENDLY",
            subtitle : "Responsive design supports all smart phones and tablets!",
            image1 : cup,
            image2 : iphone,
            bg_color: "#c6534a",
            title_color : "white",
            sub_color : "black",

        },
        {
            title : "VITUALBAZAR AGENCY & PORTFOLIO WP THEME",
            subtitle : "You can discover many awesome features and the ease of using this theme",
            image1 : laptop,
            bg_color: "#f7c239",
            title_color : "White",
            sub_color : "gray",

        },
        {
            title : "UNLIMITED COLORS",
            subtitle : "Clean and Powerful Easy to Customize.",
            image1 : ipad,
            image2: cup,
            bg_color: "#afc9c0",
            title_color : "green",
            sub_color : "black",

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
