import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const ServiceImages = ({images,title}) => {
    const displayImages = images || [];
    return (
        <div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
            {displayImages.length === 0 ? (
              <div className="flex h-96 w-full items-center justify-center bg-[#E8F6FF] text-sm font-semibold text-[#0284C7]">
                No image uploaded
              </div>
            ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              className="detail-swiper w-full h-96"
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
            )}
          </div>
        </div>
    );
};

export default ServiceImages;