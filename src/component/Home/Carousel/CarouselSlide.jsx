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
      className="relative flex min-h-[650px] w-full items-center justify-center overflow-hidden px-4 py-16 md:min-h-[720px] md:px-8"
      style={{ 
        background: `linear-gradient(120deg, ${bg_color} 0%, #0F172A 125%)`,
      }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 md:flex-row md:px-8">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full space-y-6 text-center md:w-[54%] md:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">A better way to get work done</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: title_color }}
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl text-base font-normal leading-relaxed opacity-90 sm:text-lg md:text-xl"
            style={{ color: sub_color }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col justify-center gap-4 pt-2 sm:flex-row md:justify-start"
          >
            <Link to="/services">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-white px-8 py-4 text-base font-bold text-[#0F172A] shadow-xl transition-all duration-300 hover:bg-[#F97316] hover:text-white hover:shadow-2xl"
              >
                Explore Services
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border border-white/35 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 pt-3 text-left text-white/80 md:justify-start">
            <div><strong className="block text-2xl text-white">12k+</strong><span className="text-xs uppercase tracking-wider">active briefs</span></div>
            <div><strong className="block text-2xl text-white">4.9/5</strong><span className="text-xs uppercase tracking-wider">client rating</span></div>
            <div><strong className="block text-2xl text-white">48h</strong><span className="text-xs uppercase tracking-wider">quick starts</span></div>
          </div>
        </motion.div>

        {/* Right Images - Small, separated, transparent background */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex w-full items-center justify-center gap-4 md:w-[46%] md:gap-6"
        >
          {image1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0 rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm"
            >
              <img
                className="h-40 w-40 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110 sm:h-48 sm:w-48 md:h-56 md:w-56"
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
              className="mt-16 flex-shrink-0 rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm"
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
