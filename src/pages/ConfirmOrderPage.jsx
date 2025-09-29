import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import authApiClient from "../api_services/auth-api-client";
import { useParams } from "react-router";
// import { Button, Textarea } from "./ui";

const ConfirmOrderPage =() => {
  const [requirements, setRequirements] = useState("");
  const serviceID = useParams();
  console.log("Service Id",serviceID.serviceID);

  const handleOrder = async () => {
    // if (!requirements.trim()) {
    //   alert("Please enter your requirements before placing the order.");
    //   return;
    // }

    try {

      const response = await authApiClient.post("/orders/",{
          service: Number(serviceID.serviceID),
          requirements: requirements 
      });
      console.log("Service id",serviceID)
      const data = await response.data;
      console.log("Order created:", data);

      alert(`Order placed successfully for service ${serviceID}`);
      setRequirements("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-xl mb-3">
      <h2 className="text-xl font-bold mb-4">Place Order</h2>

      <label className="block text-gray-700 mb-2">Your Requirements</label>
      <textarea
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        placeholder="Describe your project requirements..."
        className="w-full px-3 py-5"
      />

      <button onClick={handleOrder} className="w-full mt-4 btn btn-neutral">
        Place Order
      </button>
    </div>
  );
}

export default ConfirmOrderPage;