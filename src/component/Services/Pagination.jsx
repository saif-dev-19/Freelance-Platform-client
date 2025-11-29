const Pagination = ({totalpages,currentpage,handlePageChange}) => {
    return (
        <div className='flex justify-center items-center gap-3 py-8'>
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(Math.max(1, currentpage - 1))}
                disabled={currentpage === 1}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    currentpage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-[#6D28D9] border-2 border-[#6D28D9] hover:bg-[#6D28D9] hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.3)]'
                }`}
            >
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {Array.from({length:totalpages},(_,i)=>(
                    <button 
                        key={i} 
                        onClick={()=>handlePageChange(i+1)}
                        className={`min-w-[48px] h-12 rounded-2xl font-bold transition-all duration-300 transform hover:scale-110 ${
                            currentpage === i+1 
                                ? "bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white shadow-[0_4px_12px_rgba(109,40,217,0.3)]" 
                                : "bg-white text-[#0F172A] border-2 border-gray-200 hover:border-[#6D28D9] hover:text-[#6D28D9] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                        }`}
                    > 
                        {i+1}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(Math.min(totalpages, currentpage + 1))}
                disabled={currentpage === totalpages}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    currentpage === totalpages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-[#6D28D9] border-2 border-[#6D28D9] hover:bg-[#6D28D9] hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.3)]'
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;