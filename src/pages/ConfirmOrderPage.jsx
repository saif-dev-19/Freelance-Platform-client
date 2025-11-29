import { useState } from "react";
import authApiClient from "../api_services/auth-api-client";
import { useParams } from "react-router";

const ConfirmOrderPage = () => {
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const serviceID = useParams();
  console.log("Service Id", serviceID.serviceID);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/orders/", {
        service: Number(serviceID.serviceID),
        requirements: requirements,
      });
      console.log("Service id", serviceID);
      const data = await response.data;
      console.log("Order created:", data);

      alert(`Order placed successfully for service ${serviceID}`);
      setRequirements("");
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/50 p-8">
        {loading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-[#6D28D9]/20 border-t-[#6D28D9] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#6D28D9] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-2">
              Processing Your Order
            </h3>
            <p className="text-gray-600 text-center">Please wait while we confirm your order...</p>
          </div>
        ) : (
          // Order Form
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-2">
                Place Your Order
              </h2>
              <p className="text-gray-600">Provide your requirements to get started</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-3">
                  Your Requirements
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe your project requirements in detail..."
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] transition-all resize-none text-gray-800"
                />
              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white py-4 px-6 rounded-2xl font-bold hover:shadow-[0_8px_30px_rgba(109,40,217,0.3)] focus:outline-none focus:ring-2 focus:ring-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrderPage;