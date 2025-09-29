import { useEffect, useState } from "react";
import authApiClient from "../api_services/auth-api-client";
import OrderCard from "../component/Orders/OrderCard";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    try{
      authApiClient.get("/orders/").then((res) => setOrders(res.data));
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
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
    <div className="container mx-auto py-8 px-4">
      {loading &&
        (
          <div className='flex justify-center items-center py-10'>
              <span className="loading loading-spinner text-neutral loading-xl"></span>
          </div>
        )}

      {!loading && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Order Details</h1>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onCancel={handleCancelOrder} />
              ))}
          </div>
      )}
    </div>
  );
};

export default Orders;