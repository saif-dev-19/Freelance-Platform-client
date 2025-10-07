import { useState } from "react";
import OrderTable from "./OrderTable";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClient from "../../api_services/auth-api-client";


const OrderCard = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [loading,setLoading] = useState(false)

  console.log("Orders",order);
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await authApiClient.patch(
        `/orders/${order.id}/update_status/`,
        { status: newStatus }
      );
      console.log(response);
      if (response.status === 200) {
        setStatus(newStatus);
        alert(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () =>{
    setLoading(true);
    try{
      const response = await authApiClient.post("/payment/initiate/",{
        amount : order.total_price,
        orderID : order.id
      })

      if(response.data.payment_url){
        setLoading(false)
        console.log("url",response.data.payment_url);
        window.location.href = response.data.payment_url;
      }else{
        alert("Payment Failed")
      }
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div>
        {loading &&
        (
          <div className='flex justify-center items-center py-10'>
              <span className="loading loading-spinner text-neutral loading-xl"></span>
          </div>
        )}
        
        {!loading && (
          <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
            <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Order #{order.id}</h2>
                <p className="text-gray-600 text-sm">Placed on {order.created_at}</p>
              </div>
              <div className="flex gap-2">
                {user.is_staff || user.role === "Seller" ? (
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="px-3 py-1 rounded-full text-white text-sm font-medium bg-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In_progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                ): (
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      order.status === "Pending" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                )}
                {order.status !== "Completed" &&
                  order.status !== "Canceled" &&
                  !user.is_staff && (
                    <button
                      onClick={() => onCancel(order.id)}
                      className="text-blue-700 hover:underline"
                    >
                      Cancel
                    </button>
                  )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-medium text-lg mb-4">Order Items</h3>
              {/* Order Items Table  */}
              <OrderTable services={order.service} />
            </div>
            <div className="border-t p-6 flex flex-col items-end">
              <div className="space-y-2 w-full max-w-[200px]">
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${order.total_price.toFixed(2)}</span>
                </div>
              </div>
              {(!user.is_staff || !user.role === "Seller") && order.status === "Pending" && (
                <button 
                onClick={handlePayment}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  {loading ? "Processing..":"Pay Now"}
                </button>
              )}
            </div>  
        </div>
        )}
    </div>


  );
};

export default OrderCard;