
import { StarIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import useFetchServices from "../../hooks/useFetchServices"
import useFetchCategories from "../../hooks/useFetchCategories"
import FilterSection from "./FilterSection"
import ServiceItem from "./ServiceItem"
import AuthContext from "../../context/AuthContext"
import apiClient from "../../api_services/api-client"



const MyServices= () => {
    
    const [currentpage,setCurrnetpage] = useState(1)
    const [selectedCategory,setSelectedCategory] = useState("")
    const [searchQuery,setSearchQuery] =useState("")
    const [sortOrder,setSortOrder] = useState("")
    const {user} = AuthContext();
    const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get("/services/");
        const myServices = response.data.results.filter(
          (service) => service.seller === user.id || service.seller?.id === user.id
        );
        setServices(myServices);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };

    if (user) fetchServices();
  }, [user]);
    const {loading,totalpages} = useFetchServices(currentpage,selectedCategory,searchQuery,sortOrder);
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
    
    <div className="min-h-screen bg-white">
        <div>
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
                    <div className='flex justify-center items-center py-10'>
                        <span className="loading loading-spinner text-neutral loading-xl"></span>
                    </div>
        )}

        {!loading &&(
            <div className="grid grid-cols-1 px-8 py-8 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <ServiceItem service={service} />
                    ))}
            </div>
        )}
            <Pagination totalpages={totalpages} currentpage={currentpage} handlePageChange={setCurrnetpage}/>
    </div>

    
  )
}

export default MyServices



