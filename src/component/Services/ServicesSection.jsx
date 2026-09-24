import { useEffect, useRef, useState } from "react"
import ServiceItem from "./ServiceItem"
import apiClient from "../../api_services/api-client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router"
import { Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import 'swiper/css'
import 'swiper/css/navigation'

const ServicesSection = () => {
  const [services,setServices] = useState([])
  const [loading,setLoading] = useState(false)
  const previousButtonRef = useRef(null)
  const nextButtonRef = useRef(null)

    useEffect(()=> {
        setLoading(true)
        apiClient.get("/services/")
        .then(res => {
          setServices(res.data.results)
        }).catch((error) => {
          console.log(error);
        }).finally(()=>{
          setLoading(false);
        })
    },[])

      

  return (
    <section className="relative overflow-hidden bg-[#EEF3F8] py-24">
      <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-[#38BDF8]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#F97316]/10 blur-3xl" />
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#F97316]">Curated for your next move</p>
            <h2 className="text-4xl font-black tracking-tight text-[#0F172A] md:text-5xl">
              Popular Services
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600">Discover focused services from talented freelancers, with ratings and delivery details that make choosing easier.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button ref={previousButtonRef} type="button" aria-label="Previous service" className="service-nav-button">
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button ref={nextButtonRef} type="button" aria-label="Next service" className="service-nav-button">
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
            <Link
              to="/services"
              className="group flex items-center gap-2 rounded-xl bg-[#0F172A] px-7 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#F97316] hover:shadow-xl"
            >
              View All Services
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
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
              navigation={{ prevEl: previousButtonRef.current, nextEl: nextButtonRef.current }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = previousButtonRef.current
                swiper.params.navigation.nextEl = nextButtonRef.current
              }}
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
    </section>
  )
}

export default ServicesSection
