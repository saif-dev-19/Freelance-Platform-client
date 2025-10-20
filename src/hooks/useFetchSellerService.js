import React, { useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import authApiClient from '../api_services/auth-api-client';

const useFetchSellerService = () => {
    const {user} = useAuthContext();
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
        try {
            await authApiClient.get("/seller-services/")
            .then((res) => setServices(res.data))
            
        } catch (error) {
            console.error("Failed to fetch services", error);
        }
        };
        if (user.role === "Seller") fetchServices();
    }, [user]);

    return {services}
};

export default useFetchSellerService;