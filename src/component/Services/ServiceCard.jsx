import { StarIcon } from "@heroicons/react/24/solid";
import default_img from "../../assets/images/default.png";
import useAuthContext from "../../hooks/useAuthContext";
import { Link } from "react-router";
import authApiClient from "../../api_services/auth-api-client";

const ServiceCard = ({ service }) => {
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await authApiClient.delete(`/services/${service.id}/`);
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Failed to delete service:", error);
      alert("Failed to delete service.");
    }
  };

  return (
    <div className="group w-full max-w-sm mx-auto bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(109,40,217,0.2)] transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <Link to={`/services/${service.id}/`} className="relative block overflow-hidden bg-gray-100">
        <div className="aspect-[4/3] relative">
          <img
            src={service.images.length > 0 ? service.images[0].image : default_img}
            alt={service.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-base font-bold">${service.price}</span>
          </div>
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex-1 flex flex-col p-6 space-y-4">
        <Link to={`/services/${service.id}/`} className="flex-1 space-y-4">
          {/* Seller Info */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#6D28D9]/20 flex-shrink-0">
              <img 
                src={service.images.length > 0 ? service.images[0].image : default_img} 
                alt="seller" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Professional Service</p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[#0F172A] leading-tight line-clamp-2 group-hover:text-[#6D28D9] transition-colors duration-300 min-h-[3.5rem]">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {service.requirements}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Star Rating Badge */}
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1.5 rounded-full border border-amber-200/50">
              <StarIcon className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-gray-800">{service.rating || 0}</span>
            </div>
            
            {/* Review Count Badge - Always Show */}
            {(() => {
              // Handle multiple possible field names for review count
              const reviewCount = service.reviews || service.review_count || service.reviews_count || 0;
              return (
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full border ${
                  reviewCount > 0 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50' 
                    : 'bg-gray-50 border-gray-200/50'
                }`}>
                  <svg className={`w-4 h-4 ${reviewCount > 0 ? 'text-[#3B82F6]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm font-bold ${reviewCount > 0 ? 'text-[#3B82F6]' : 'text-gray-500'}`}>
                    {reviewCount}
                  </span>
                </div>
              );
            })()}
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          {/* Seller buttons */}
          {user?.role === "Seller" && (
            <div className="flex flex-col gap-2">
              <Link 
                to={`/services/${service.id}`} 
                className="w-full text-center px-4 py-3 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#6D28D9]/30 transition-all duration-300"
              >
                View Details
              </Link>
              <div className="flex gap-2">
                <Link
                  to={`/dashboard/services/edit/${service.id}`}
                  className="flex-1 text-center px-4 py-2.5 bg-white border-2 border-[#6D28D9] text-[#6D28D9] text-sm font-semibold rounded-xl hover:bg-[#6D28D9] hover:text-white transition-all duration-300"
                >
                  Edit
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="flex-1 px-4 py-2.5 bg-white border-2 border-red-500 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Buyer buttons */}
          {user?.role === "Buyer" && (
            <div className="flex flex-col gap-2">
              <Link 
                to={`/services/${service.id}`} 
                className="w-full text-center px-4 py-3 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#6D28D9]/30 transition-all duration-300"
              >
                Order Now
              </Link>
              <Link 
                to={`/services/${service.id}`} 
                className="w-full text-center px-4 py-2.5 bg-white border-2 border-[#6D28D9] text-[#6D28D9] text-sm font-semibold rounded-xl hover:bg-[#6D28D9] hover:text-white transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          )}

          {/* Non-logged in or other roles */}
          {user?.role !== "Seller" && user?.role !== "Buyer" && (
            <Link 
              to={`/services/${service.id}`} 
              className="block text-center w-full px-4 py-3 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#6D28D9]/30 transition-all duration-300"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
