import { StarIcon } from "@heroicons/react/24/solid";
import useAuthContext from "../../hooks/useAuthContext";
import { Link } from "react-router";
import authApiClient from "../../api_services/auth-api-client";

const ServiceCard = ({ service }) => {
  const { user } = useAuthContext();
  const sellerName = [service.seller?.first_name, service.seller?.last_name]
    .filter(Boolean)
    .join(" ") || service.seller?.email || "Seller";
  const serviceImage = service.images?.[0]?.image;
  const sellerInitials = sellerName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const canManageService = Boolean(
    user && (
      service.seller?.id === user.id ||
      (user.is_staff && user.role !== "Seller")
    )
  );

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
    <div className="group mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]/40 hover:shadow-[0_16px_34px_rgba(15,23,42,0.13)]">
      {/* Image Container */}
      <Link to={`/services/${service.id}/`} className="relative block overflow-hidden bg-gray-100">
        <div className="relative aspect-[16/10]">
          {serviceImage ? (
            <img
              src={serviceImage}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#E8F6FF] text-sm font-semibold text-[#0284C7]">
              No image uploaded
            </div>
          )}
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          
          {/* Price Badge */}
          <div className="absolute right-3 top-3 rounded-lg bg-[#0F172A]/90 px-3 py-1.5 text-white shadow-lg backdrop-blur-sm">
            <span className="text-sm font-bold">${service.price}</span>
          </div>
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex flex-1 flex-col space-y-3 p-4 md:p-5">
        <Link to={`/services/${service.id}/`} className="flex-1 space-y-3">
          {/* Seller Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-xs font-bold text-white ring-2 ring-[#38BDF8]/25">
              {sellerInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-[#0F172A]">{sellerName}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Service provider</p>
            </div>
          </div>

          {/* Title */}
          <h3 className="min-h-[3rem] line-clamp-2 text-lg font-black leading-tight text-[#0F172A] transition-colors duration-300 group-hover:text-[#0284C7]">
            {service.title}
          </h3>

          {/* Description */}
          <p className="min-h-[2.25rem] line-clamp-2 text-sm leading-relaxed text-slate-500">
            {service.requirements}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Star Rating Badge */}
            <div className="flex items-center gap-1 rounded-lg border border-amber-200/70 bg-amber-50 px-2.5 py-1">
              <StarIcon className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-bold text-gray-800">
                {service.rating == null ? '0.0' : Number(service.rating).toFixed(1)}
              </span>
            </div>
            
            {/* Review Count Badge - Always Show */}
            {(() => {
              // Handle multiple possible field names for review count
              const reviewCount = service.reviews || service.review_count || service.reviews_count || 0;
              return (
                <div className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 ${
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
        <div className="mt-auto border-t border-slate-100 pt-3">
          {/* Seller buttons */}
          {canManageService && (
            <div className="flex flex-col gap-2">
              <Link 
                to={`/services/${service.id}`} 
                className="w-full rounded-lg bg-[#0F172A] px-4 py-2.5 text-center text-sm font-bold text-white transition-all duration-300 hover:bg-[#F97316] hover:shadow-lg"
              >
                View Details
              </Link>
              <div className="flex gap-2">
                <Link
                  to={`/dashboard/services/edit/${service.id}`}
                  className="flex-1 rounded-lg border border-[#0284C7] bg-white px-4 py-2 text-center text-sm font-bold text-[#0284C7] transition-all hover:bg-[#0284C7] hover:text-white"
                >
                  Edit
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="flex-1 rounded-lg border border-red-400 bg-white px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white"
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
                className="w-full rounded-lg bg-[#0F172A] px-4 py-2.5 text-center text-sm font-bold text-white transition-all duration-300 hover:bg-[#F97316] hover:shadow-lg"
              >
                Order Now
              </Link>
              <Link 
                to={`/services/${service.id}`} 
                className="w-full rounded-lg border border-[#0284C7] bg-white px-4 py-2 text-center text-sm font-bold text-[#0284C7] transition-all hover:bg-[#0284C7] hover:text-white"
              >
                View Details
              </Link>
            </div>
          )}

          {/* Non-logged in or other roles */}
          {user?.role !== "Seller" && user?.role !== "Buyer" && (
            <Link 
              to={`/services/${service.id}`} 
              className="block w-full rounded-lg bg-[#0F172A] px-4 py-2.5 text-center text-sm font-bold text-white transition-all duration-300 hover:bg-[#F97316] hover:shadow-lg"
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
