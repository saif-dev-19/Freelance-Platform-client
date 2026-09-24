
import { Link } from "react-router"
import Pagination from "./Pagination"
import { useState } from "react"
import { useSearchParams } from "react-router"
import useFetchServices from "../../hooks/useFetchServices"
import useFetchCategories from "../../hooks/useFetchCategories"
import FilterSection from "./FilterSection"
import ServiceItem from "./ServiceItem"



const Services= () => {
    const [searchParams] = useSearchParams()
    
    const [currentpage,setCurrnetpage] = useState(1)
    const [selectedCategory,setSelectedCategory] = useState(() => searchParams.get("category_id") || "")
    const [searchQuery,setSearchQuery] =useState("")
    const [sortOrder,setSortOrder] = useState("")

    const handleCategoryChange = (value) => {
        setSelectedCategory(value)
        setCurrnetpage(1)
    }

    const handleSearchQuery = (value) => {
        setSearchQuery(value)
        setCurrnetpage(1)
    }

    const handleSorting = (value) => {
        setSortOrder(value)
        setCurrnetpage(1)
    }

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
    
    <div className="min-h-screen bg-[#EEF3F8]">
        <div className="px-5 pb-8 pt-14 md:px-8">
            <div className="mx-auto mb-8 max-w-7xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#F97316]">Find the right fit</p>
                <h1 className="text-4xl font-black tracking-tight text-[#0F172A] md:text-6xl">
                    Explore services
                </h1>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">Compare focused expertise, clear delivery times, and real ratings in one place.</p>
            </div>
            <FilterSection 
                categories={categories} 
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                searchQuery={searchQuery}
                handleSearchQuery={handleSearchQuery}
                sortOrder={sortOrder}
                handleSorting={handleSorting}
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
            <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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



