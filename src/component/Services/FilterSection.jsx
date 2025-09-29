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
    <div className="w-full px-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm">
        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
            <Filter size={16} className="text-gray-500" />
            <span className="hidden sm:inline">Category:</span>
          </label>
          <select
            className="flex-1 md:flex-none p-2 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 w-full md:flex-1">
          <label className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
            <Search size={16} className="text-gray-500" />
            <span className="hidden sm:inline">Search:</span>
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="flex-1 p-2 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
            <ArrowUpDown size={16} className="text-gray-500" />
            <span className="hidden sm:inline">Sort:</span>
          </label>
          <select
            className="flex-1 md:flex-none p-2 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={sortOrder}
            onChange={(e) => handleSorting(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price">Low → High</option>
            <option value="-price">High → Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
