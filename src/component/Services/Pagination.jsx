import React from 'react';

const Pagination = ({totalpages,currentpage,handlePageChange}) => {
    return (
        <div className='flex justify-center mb-5 bg-white'>
            {Array.from({length:totalpages},(_,i)=>(
                <button key={i} 
                    onClick={()=>handlePageChange(i+1)}
                    className={`mx-1 px-3 py-1 rounded
                        ${currentpage === i+1 ? "bg-cyan-900" : "bg-gray-300"}
                        `}
                > 
                    {i+1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;