import { useEffect, useState } from 'react';
import authApiClient from '../api_services/auth-api-client';

const useFetchOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        authApiClient.get("/orders/")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch orders:", err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return { orders, loading };
};

export default useFetchOrders;