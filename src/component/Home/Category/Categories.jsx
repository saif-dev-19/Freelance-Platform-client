
import { Link, Navigate } from "react-router"
import { useEffect, useState } from "react"
import apiClient from "../../../api_services/api-client"


const Categories = () => {
  const [categories,setCategories] = useState([])

  useEffect(() =>{
    apiClient.get("/categories")
        .then(res => setCategories(res.data))
  })

  // const nevigate = useNavigate();

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category.title)
  }

  return (
    <div className="w-full px-8 py-20 mx-auto bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-16 max-w-7xl mx-auto">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#0EA5E9] bg-clip-text">
            Browse by Category
          </h1>
          <p className="text-gray-600 text-lg mt-3">Explore services across different categories</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-7xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="group relative bg-white rounded-2xl border border-gray-200/50 p-6 cursor-pointer transition-all duration-500 hover:shadow-[0_8px_30px_rgba(109,40,217,0.15)] hover:border-[#6D28D9]/30 hover:-translate-y-2 overflow-hidden"
          >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/0 to-[#3B82F6]/0 group-hover:from-[#6D28D9]/5 group-hover:to-[#3B82F6]/5 transition-all duration-500"></div>
            
            {/* Icon Container */}
            <div className="relative flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6D28D9]/10 to-[#3B82F6]/10 rounded-2xl flex items-center justify-center group-hover:from-[#6D28D9]/20 group-hover:to-[#3B82F6]/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-3xl">📁</span>
              </div>
            </div>

            {/* Category Title */}
            <h3 className="relative text-center text-sm font-bold text-[#0F172A] leading-tight group-hover:text-[#6D28D9] transition-colors duration-300">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
