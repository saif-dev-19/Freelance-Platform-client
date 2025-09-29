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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Browse popular Services</h2>
          <Link to="/services" className="link link-primary text-sm hover:link-hover">
            Discover More
          </Link>
        </div>

        {loading && (
                    <div className='flex justify-center items-center py-10'>
                        <span className="loading loading-dots text-neutral loading-xl"></span>
                    </div>
                )}
        
        {!loading  && services.length >0 && (
          <div className='flex justify-center items-center'>
                        <Swiper
                        modules = {[Navigation]}
                        spaceBetween = {1}
                        slidesPerView = {1}
                        breakpoints = {{
                            640: {slidesPerView: 2},
                            1024 : {slidesPerView: 3},
                        }}
                        navigation
                        className  = "mt-4 px-4 container "
                        >
                        {services.map((service) => (
                            <SwiperSlide key={service.id} className='flex justify-center'>
                                <ServiceItem service={service} />
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
          
        )}

        {!loading && services.length===0 && (
          <span>No items here</span>
        )}
        
      </div>
    </div>
  )
}

export default ServicesSection
