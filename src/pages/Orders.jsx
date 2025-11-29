import { useEffect, useState } from "react";
import { Link } from "react-router";
import authApiClient from "../api_services/auth-api-client";
import OrderCard from "../component/Orders/OrderCard";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await authApiClient.get("/orders/");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  console.log(orders);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
      console.log(response);
      if (response.status === 200) {
        setOrders((prevOrder) =>
          prevOrder.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {loading ? (
          // Loading State
          <div className='flex flex-col items-center justify-center py-20'>
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-[#6D28D9]/20 border-t-[#6D28D9] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#6D28D9] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-2">
              Loading Your Orders
            </h3>
            <p className="text-gray-600 text-center">Please wait while we fetch your order details...</p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-2">
                My Orders
              </h1>
              <p className="text-gray-600 text-lg">View and manage all your orders</p>
            </div>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} onCancel={handleCancelOrder} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/50">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
                <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
                <Link 
                  to="/services" 
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white font-bold rounded-2xl hover:shadow-[0_8px_30px_rgba(109,40,217,0.3)] transition-all duration-300 hover:scale-105"
                >
                  Browse Services
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;