
import { StarIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router"
import default_img from "../../assets/images/default.png"
import Pagination from "./Pagination"
import { useState } from "react"
import useFetchServices from "../../hooks/useFetchServices"
import useFetchCategories from "../../hooks/useFetchCategories"
import FilterSection from "./FilterSection"
import ServiceItem from "./ServiceItem"



const Services= () => {
    
    const [currentpage,setCurrnetpage] = useState(1)
    const [selectedCategory,setSelectedCategory] = useState("")
    const [searchQuery,setSearchQuery] =useState("")
    const [sortOrder,setSortOrder] = useState("")

    const {services,loading,totalpages} = useFetchServices(currentpage,selectedCategory,searchQuery,sortOrder);
    const categories = useFetchCategories();
    // const fetchproducts =()=>{
    //     setLoading(true)
    //     apiClient.get(`/services/?page=${currentpage}`)
    //     .then((res) => {
    //         console.log(res.data);
    //         setServices(res.data.results),
    //         setTotalpages(Math.ceil(res.data.count / 10));
    //         console.log(res.data.count / res.data.results.length);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    //     .finally(() =>{
    //         setLoading(false)
    //     })
    // }


    
  return (
    
    <div className="min-h-screen bg-[#F8FAFC]">
        <div className="pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-8 mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent mb-3">
                    Explore All Services
                </h1>
                <p className="text-gray-600 text-lg">Find the perfect service for your needs</p>
            </div>
            <FilterSection 
                categories={categories} 
                selectedCategory={selectedCategory}
                handleCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                handleSearchQuery={setSearchQuery}
                sortOrder={sortOrder}
                handleSorting={setSortOrder}
            />
        </div>
        {loading && (
            <div className='flex justify-center items-center py-20'>
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#6D28D9]/20 border-t-[#6D28D9] rounded-full animate-spin"></div>
                </div>
            </div>
        )}

        {!loading && services.length > 0 && (
            <div className="px-8 py-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </div>
            </div>
        )}
        
        {!loading && services.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No services found matching your criteria</p>
            </div>
        )}
        
        <div className="pb-12">
            <Pagination totalpages={totalpages} currentpage={currentpage} handlePageChange={setCurrnetpage}/>
        </div>
    </div>

    
  )
}

export default Services



