import React, { useEffect, useState } from 'react';
import authApiClient from '../api_services/auth-api-client';

const useFetchUsers = () => {
    const [summary, setSummary] = useState({
    total_users: 0,
    total_sellers: 0,
    total_buyers: 0,
    sellers: [],
    buyers: [],
    top_sellers:[],
    top_buyers:[],
    total_revenue:0
  });

    useEffect(() => {
        const fetchSummary = async () => {
        try {
            await authApiClient.get("/users-summary/").then((res) => setSummary(res.data))
            
        } catch (error) {
            console.error("Failed to fetch summary", error);
        }
        };
        fetchSummary();
    }, []);

    return {summary}
};

export default useFetchUsers;