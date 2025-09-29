import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import defaultImage from "../../assets/images/default.png"


const ServiceImages = ({images,title}) => {
    const displayImages = images?.length > 0 ? images : [{ image: defaultImage }];
    return (
        <div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              className="w-full h-96"
            >
              {displayImages.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                    <img
                      src={src.image}
                      alt={`${title} - ${idx + 1}`}
                      className=" w-full h-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
    );
};

export default ServiceImages;