import React, { useEffect, useState } from 'react';
import authApiClient from '../api_services/auth-api-client';

const useFetchReviews = () => {
    const [reviews,setReviews] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        authApiClient.get("/buyer-reviews/")
        .then((res) => setReviews(res.data))
        .catch((error) => {
            console.error("Failed to fetch orders:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    },[]);

    
    return {reviews,loading}
};

export default useFetchReviews;