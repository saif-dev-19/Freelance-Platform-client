
// import React, { useEffect, useState } from "react";
// import useAuthContext from "./useAuthContext";
// import authApiClient from "../api_services/auth-api-client";

// const useFetchSellerService = (
//   currentpage,
//   selectedCategory,
//   searchQuery,
//   sortOrder
// ) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalpages, setTotalpages] = useState(0);
//   const { user } = useAuthContext();

//   useEffect(() => {
//     const fetchServices = async () => {
//       setLoading(true);
//       const url = `/seller-services/?page=${currentpage}&category_id=${selectedCategory || ""}&search=${searchQuery || ""}&ordering=${sortOrder || ""}`;
//       try {
//         const response = await authApiClient.get(url);
//         const data = response.data;

//         // 🧠 Check if paginated response or simple list
//         if (Array.isArray(data)) {
//           setServices(data);
//           setTotalpages(1);
//         } else {
//           setServices(data.results || []);
//           setTotalpages(Math.ceil((data.count || 0) / 10));
//         }
//       } catch (error) {
//         console.error("Failed to fetch seller services:", error);
//         setServices([]); // prevent undefined
//       } finally {
//         setLoading(false);
//       }
//     };

//     // ✅ fetch only if user exists and is seller
//     if (user && user.role === "Seller") {
//       fetchServices();
//     }
//   }, [user, currentpage, selectedCategory, searchQuery, sortOrder]);

//   return { services, loading, totalpages };
// };

// export default useFetchSellerService;


import React, { useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import authApiClient from '../api_services/auth-api-client';

const useFetchSellerService = (currentpage,selectedCategory,searchQuery,sortOrder) => {
    const [services,setServices] = useState([])
    const [loading,setLoading] = useState(false)
    const [totalpages,setTotalpages] = useState(0)
    const {user} = useAuthContext();

    useEffect(()=>{
        const fetchServices=async () =>{
            setLoading(true)
            const url = `/seller-services/?page=${currentpage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`
            try{
                const response = await authApiClient.get(url);
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
        if (user.role === "Seller") fetchServices();
    },[user.role,currentpage,selectedCategory,searchQuery,sortOrder])

    return {services,loading,totalpages}
};

export default useFetchSellerService;




// import React, { useEffect, useState } from 'react';
// import useAuthContext from './useAuthContext';
// import authApiClient from '../api_services/auth-api-client';

// const useFetchSellerService = () => {
//     const {user} = useAuthContext();
//     const [services, setServices] = useState([]);

//     useEffect(() => {
//         const fetchServices = async () => {
//         try {
//             await authApiClient.get("/seller-services/")
//             .then((res) => setServices(res.data))
            
//         } catch (error) {
//             console.error("Failed to fetch services", error);
//         }
//         };
//         if (user.role === "Seller") fetchServices();
//     }, [user]);

//     return {services}
// };

// export default useFetchSellerService;
