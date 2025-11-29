import { Search, Filter, ArrowUpDown } from "lucide-react";

export default function FilterSection({
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
}) {
  return (
    <div className="w-full px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-white p-8 rounded-3xl border border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A] whitespace-nowrap">
            <div className="p-2.5 bg-gradient-to-br from-[#6D28D9]/10 to-[#3B82F6]/10 rounded-xl">
              <Filter size={20} className="text-[#6D28D9]" />
            </div>
            <span className="hidden sm:inline">Category</span>
          </label>
          <select
            className="flex-1 md:flex-none px-5 py-3 border-2 border-gray-200 text-[#0F172A] text-sm font-medium rounded-2xl focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] focus:outline-none bg-[#F8FAFC] hover:bg-white transition-all"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 w-full md:flex-1">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A] whitespace-nowrap">
            <div className="p-2.5 bg-gradient-to-br from-[#3B82F6]/10 to-[#0EA5E9]/10 rounded-xl">
              <Search size={20} className="text-[#3B82F6]" />
            </div>
            <span className="hidden sm:inline">Search</span>
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="flex-1 px-5 py-3 border-2 border-gray-200 text-[#0F172A] text-sm font-medium rounded-2xl focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] focus:outline-none bg-[#F8FAFC] hover:bg-white transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A] whitespace-nowrap">
            <div className="p-2.5 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-xl">
              <ArrowUpDown size={20} className="text-[#0EA5E9]" />
            </div>
            <span className="hidden sm:inline">Sort</span>
          </label>
          <select
            className="flex-1 md:flex-none px-5 py-3 border-2 border-gray-200 text-[#0F172A] text-sm font-medium rounded-2xl focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] focus:outline-none bg-[#F8FAFC] hover:bg-white transition-all"
            value={sortOrder}
            onChange={(e) => handleSorting(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price">Price: Low → High</option>
            <option value="-price">Price: High → Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
