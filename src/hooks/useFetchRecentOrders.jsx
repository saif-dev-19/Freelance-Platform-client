import { useEffect, useState } from "react";
import authApiClient from "../api_services/auth-api-client";

const useFetchRecentOrders = () => {
  const [recentOrders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authApiClient.get("/recent-orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch seller orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { recentOrders, loading };
};

export default useFetchRecentOrders;
