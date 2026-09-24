
import { useNavigate } from "react-router"
import useFetchCategories from "../../../hooks/useFetchCategories"


const Categories = () => {
  const categories = useFetchCategories()
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate(`/services?category_id=${category.id}`)
  }

  return (
    <section className="w-full border-b border-slate-200/70 bg-[#F5F7FA] px-8 py-24">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-16 max-w-7xl mx-auto">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#3B82F6]">Find your lane</p>
          <h1 className="text-4xl font-black tracking-tight text-[#0F172A] md:text-5xl">
            Browse by category
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600">Start with a category, compare the signal, and find the specialist that fits your next project.</p>
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
            <p className="relative text-center text-xs text-gray-500 mt-2">
              {category.service_count || 0} {category.service_count === 1 ? 'service' : 'services'}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories
