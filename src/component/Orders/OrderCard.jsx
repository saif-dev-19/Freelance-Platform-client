import { useState } from "react";
import OrderTable from "./OrderTable";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClient from "../../api_services/auth-api-client";


const OrderCard = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [loading,setLoading] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState(order.delivery_message || "");
  const [deliveryUrl, setDeliveryUrl] = useState(order.delivery_url || "");
  const [revisionFeedback, setRevisionFeedback] = useState(order.revision_feedback || "");

  console.log("Orders",order);
  const handleDeliver = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApiClient.post(
        `/orders/${order.id}/deliver/`,
        { message: deliveryMessage, url: deliveryUrl }
      );
      setStatus(response.data.status);
    } catch (error) {
      console.log("Error delivering order", error);
      alert(error.response?.data?.detail || "Could not submit delivery.");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptDelivery = async () => {
    try {
      const response = await authApiClient.post(`/orders/${order.id}/accept_delivery/`);
      setStatus(response.data.status);
    } catch (error) {
      console.log("Error accepting delivery", error);
      alert(error.response?.data?.detail || "Could not accept delivery.");
    }
  };

  const handleRequestRevision = async () => {
    const feedback = window.prompt("What should the seller revise?");
    if (!feedback?.trim()) return;
    try {
      const response = await authApiClient.post(`/orders/${order.id}/request_revision/`, { feedback });
      setRevisionFeedback(response.data.revision_feedback);
      setStatus(response.data.status);
    } catch (error) {
      console.log("Error requesting revision", error);
      alert(error.response?.data?.detail || "Could not request a revision.");
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
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                    status === "Pending" ? "bg-red-500" : status === "Delivered" ? "bg-amber-600" : "bg-green-500"
                  }`}
                >
                  {status === "In_progress" ? "In Progress" : status}
                </span>
                {user.role === "Buyer" && status !== "Delivered" && status !== "Completed" &&
                  status !== "Canceled" && (
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
              {revisionFeedback && user.role === "Seller" && (
                <div className="mt-4 rounded-lg bg-amber-50 p-4 text-amber-900">
                  <strong>Buyer requested a revision:</strong> {revisionFeedback}
                </div>
              )}
              {status === "Delivered" && (
                <div className="mt-4 rounded-lg border p-4 space-y-2">
                  <h4 className="font-semibold">Seller delivery</h4>
                  <p className="whitespace-pre-wrap">{deliveryMessage}</p>
                  {deliveryUrl && <a className="link link-primary break-all" href={deliveryUrl} target="_blank" rel="noreferrer">Open delivery link</a>}
                </div>
              )}
            </div>
            <div className="border-t p-6 flex flex-col items-end">
              <div className="space-y-2 w-full max-w-[200px]">
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${order.total_price.toFixed(2)}</span>
                </div>
              </div>
              {user.role === "Buyer" && order.status === "Pending" && (
                <button 
                onClick={handlePayment}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  {loading ? "Processing..":"Pay Now"}
                </button>
              )}
              {user.role === "Seller" && status === "In_progress" && (
                <form onSubmit={handleDeliver} className="mt-4 w-full space-y-3">
                  <h3 className="font-semibold">Deliver Work</h3>
                  <textarea required value={deliveryMessage} onChange={(event) => setDeliveryMessage(event.target.value)} className="textarea textarea-bordered w-full" placeholder="Describe the completed work or provide delivery details" />
                  <input type="url" value={deliveryUrl} onChange={(event) => setDeliveryUrl(event.target.value)} className="input input-bordered w-full" placeholder="Delivery file or project link (optional)" />
                  {loading ? <button className="btn btn-primary" disabled>Submitting…</button> : <button className="btn btn-primary" type="submit">Submit Delivery</button>}
                </form>
              )}
              {user.role === "Buyer" && status === "Delivered" && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="btn btn-success" onClick={handleAcceptDelivery}>Accept Delivery</button>
                  <button className="btn btn-outline" onClick={handleRequestRevision}>Request Revision</button>
                </div>
              )}
            </div>  
        </div>
        )}
    </div>


  );
};

export default OrderCard;
