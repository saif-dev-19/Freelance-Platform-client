import React from 'react';
import default_img from "../assets/images/default.png"

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300">
      <img
        src={category.image ? category.image : default_img}
        alt={category.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium text-gray-700 capitalize">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
