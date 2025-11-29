import { motion } from "framer-motion";
import { Link } from "react-router";

const CarouselSlide = ({
  title,
  subtitle,
  image1,
  image2,
  bg_color,
  title_color,
  sub_color,
}) => {
  return (
    <section
      className="relative w-full h-[600px] md:h-[700px] flex justify-center items-center px-4 md:px-8 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${bg_color} 0%, ${bg_color}dd 100%)`,
      }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center max-w-7xl w-full mx-auto px-4 md:px-8 justify-between gap-8 md:gap-12 z-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 text-center md:text-left space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2"
          >
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
            <span className="text-white text-sm font-semibold">New Features Available</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
            style={{ color: title_color }}
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl font-normal leading-relaxed opacity-90"
            style={{ color: sub_color }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2"
          >
            <Link to="/services">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0F172A] px-8 py-4 text-base font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Explore Services
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 text-base font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Images - Small, separated, transparent background */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center items-center gap-6"
        >
          {image1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <img
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
                src={image1}
                alt="carousel-img1"
              />
            </motion.div>
          )}
          {image2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <img
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
                src={image2}
                alt="carousel-img2"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CarouselSlide;
