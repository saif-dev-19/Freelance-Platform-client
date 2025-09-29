import React from "react";

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
      className="w-full min-h-[500px] md:h-[650px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
      style={{ backgroundColor: bg_color }}
    >
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full h-full md:h-[650px] px-4 md:px-8 justify-between gap-6">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h1
            className="text-2xl sm:text-3xl md:text-5xl font-semibold"
            style={{ color: title_color }}
          >
            {title}
          </h1>
          <p
            className="my-4 text-base sm:text-lg md:text-2xl"
            style={{ color: sub_color }}
          >
            {subtitle}
          </p>
          <button className="btn btn-success px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg text-black font-bold rounded-full shadow-md">
            EXPLORE SERVICES
          </button>
        </div>

        {/* Right Images */}
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row justify-center items-center gap-4">
          {image1 && (
            <img
              className="w-2/3 sm:w-1/2 md:max-w-sm drop-shadow-lg rounded-lg"
              src={image1}
              alt="carousel-img1"
            />
          )}
          {image2 && (
            <img
              className="w-2/3 sm:w-1/2 md:max-w-sm drop-shadow-lg rounded-lg"
              src={image2}
              alt="carousel-img2"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CarouselSlide;
