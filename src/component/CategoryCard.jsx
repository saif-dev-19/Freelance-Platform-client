import React from 'react';
import default_img from "../assets/images/default.png"

const CategoryCard = ({ category }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
        <img
          src={category.image ? category.image : default_img}
          alt={category.name}
          className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-xl font-bold text-white capitalize drop-shadow-lg">
            {category.name}
          </h3>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
          Explore
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
