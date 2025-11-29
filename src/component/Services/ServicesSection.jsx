import { useEffect, useState } from "react"
import ServiceItem from "./ServiceItem"
import apiClient from "../../api_services/api-client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router"
import { Navigation } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/navigation'

const ServicesSection = () => {
  const [services,setServices] = useState([])
  const [loading,setLoading] = useState(false)

    useEffect(()=> {
        setLoading(true)
        apiClient.get("/services")
        .then(res => {
          setServices(res.data.results)
        }).catch((error) => {
          console.log(error);
        }).finally(()=>{
          setLoading(false);
        })
    },[])

      

  return (
    <div className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent">
              Popular Services
            </h2>
            <p className="text-gray-600 text-lg mt-3">Discover top-rated services from talented freelancers</p>
          </div>
          <Link 
            to="/services" 
            className="group flex items-center gap-2 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-[0_8px_30px_rgba(109,40,217,0.3)] transition-all duration-300 hover:scale-105"
          >
            View All Services
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading && (
          <div className='flex justify-center items-center py-20'>
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#6D28D9]/20 border-t-[#6D28D9] rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        
        {!loading  && services.length >0 && (
          <div className='w-full'>
            <Swiper
              modules = {[Navigation]}
              spaceBetween = {32}
              slidesPerView = {1}
              breakpoints = {{
                640: {slidesPerView: 2, spaceBetween: 24},
                1024 : {slidesPerView: 3, spaceBetween: 32},
              }}
              navigation
              className = "service-swiper !pb-12"
            >
              {services.map((service) => (
                <SwiperSlide key={service.id} className='h-auto'>
                  <ServiceItem service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {!loading && services.length===0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No services available at the moment</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesSection
