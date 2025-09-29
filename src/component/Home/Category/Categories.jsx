
import { Link, Navigate, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import apiClient from "../../../api_services/api-client"

const Categories = () => {
  const [categories,setCategories] = useState([])

  useEffect(() =>{
    apiClient.get("/categories")
        .then(res => setCategories(res.data))
  })

  const nevigate = useNavigate();

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category.title)
  }

  return (
    <div className="w-full px-8 py-4  mx-auto bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Choose your category</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg shadow transition duration-300"
        onClick={() => nevigate('/categories')}>View more</button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="group bg-white rounded-lg border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-400 hover:-translate-y-0.5"
            style={{
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* Icon Container */}
            {/* <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <span className="text-xl">{category.description}</span>
              </div>
            </div> */}

            {/* Category Title */}
            <h3 className="text-center text-sm font-medium text-gray-900 leading-tight">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
