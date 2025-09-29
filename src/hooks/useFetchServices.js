import React, { useEffect, useState } from 'react';
import apiClient from '../api_services/api-client';

const useFetchServices = (currentpage,selectedCategory,searchQuery,sortOrder) => {
    const [services,setServices] = useState([])
    const [loading,setLoading] = useState(false)
    const [totalpages,setTotalpages] = useState(0)
    useEffect(()=>{
        const fetchservices=async () =>{
            setLoading(true)
            const url = `/services/?page=${currentpage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`
            try{
                const response = await apiClient.get(url);
                const data = await response.data;
                setServices(data.results),
                setTotalpages(Math.ceil(data.count / 10));
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false)
            }
        };
        fetchservices();
    },[currentpage,selectedCategory,searchQuery,sortOrder])

    return {services,loading,totalpages}
};

export default useFetchServices;