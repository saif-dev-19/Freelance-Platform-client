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
    <div className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:justify-between md:p-5">
        {/* Category Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A] whitespace-nowrap">
              <div className="rounded-lg bg-[#FFF1E8] p-2">
              <Filter size={18} className="text-[#F97316]" />
            </div>
            <span className="hidden sm:inline">Category</span>
          </label>
          <select
            className="flex-1 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-all hover:bg-white focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 md:flex-none"
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
              <div className="rounded-lg bg-[#E8F6FF] p-2">
              <Search size={18} className="text-[#0284C7]" />
            </div>
            <span className="hidden sm:inline">Search</span>
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="flex-1 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-all placeholder:text-slate-400 hover:bg-white focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20"
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A] whitespace-nowrap">
              <div className="rounded-lg bg-[#EAF8F2] p-2">
              <ArrowUpDown size={18} className="text-[#16A36A]" />
            </div>
            <span className="hidden sm:inline">Sort</span>
          </label>
          <select
            className="flex-1 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-all hover:bg-white focus:border-[#16A36A] focus:outline-none focus:ring-2 focus:ring-[#16A36A]/20 md:flex-none"
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
