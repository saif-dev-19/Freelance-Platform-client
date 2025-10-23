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
    <div className="card w-70 h-[450px] bg-gray-200 rounded-md text-black shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/services/${service.id}/`}>
           <figure className="px-2 pt-2">
              <img
                src={service.images.length > 0 ? service.images[0].image : default_img}
                alt={service.title}
                className="rounded w-full h-48"
              />
          </figure>
      </Link>
      <div className="card-body p-4">
        <Link to={`/services/${service.id}/`}>
            <div>

            <div className="flex gap-2 mb-2">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src={service.images.length > 0 ? service.images[0].image : default_img} />
              </div>
            </div>
            </div>

          <h3 className="card-title text-sm leading-tight mb-2">{service.title}</h3>

          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{service.requirements}</p>

          </div>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{service.rating}</span>
          </div>
          <span className="text-xs text-base-content/50">({service.reviews})</span>
        </div>

        <div className="card-actions flex gap-2 justify-between">
          <div className="text-right">
            <div className="flex">
                <span className="text-lg font-bold text-neutral">${service.price}</span>
            </div>
            

            {/* Seller buttons */}
            <div className="flex gap-2  space-x-1 mt-2">
              {user?.role === "Seller" && (
                <>
                  <Link to={`/services/${service.id}`} className="btn btn-sm btn-outline btn-neutral gap-1">
                    View Details
                  </Link>
                  <Link
                  to={`/dashboard/services/edit/${service.id}`}
                  className="btn btn-sm btn-outline btn-neutral gap-1"
                  >
                  Edit
                </Link>
                  <button onClick={handleDelete} className="btn btn-sm btn-outline btn-neutral gap-1">
                    Delete
                  </button>
                </>
                )}
            </div>
          </div>

          {/* Buyer order button */}
          <div className="flex gap-2 justify-between">
            <div>
                {user?.role === "Buyer" && (
                  <Link to={`/services/${service.id}`} className="btn btn-sm btn-outline btn-neutral gap-1">
                    Order Now
                  </Link>
                )}
              </div>
            
              <div>
                {user?.role !== "Seller" && (
                  <Link to={`/services/${service.id}`} className="btn btn-sm btn-outline btn-neutral gap-1">
                    View Details
                  </Link>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
