
import { StarIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router"
import default_img from "../../assets/images/default.png"
import useAuthContext from "../../hooks/useAuthContext"

const ServiceCard = ({ service }) => {
  const {user} = useAuthContext();
  return (
    <div className="card w-70 h-[450px] bg-gray-200 text-black shadow-lg hover:shadow-xl transition-shadow duration-300">
      <figure className="px-4 pt-8 ">
        <img
          src={service.images.length > 0 ? service.images[0].image : default_img}
          alt={service.title}
          className="rounded w-full h-48 "
        />
      </figure>
      <div className="card-body  p-4">
        <div className="flex gap-2 mb-2">
          <div className="avatar">
            <div className="w-8 h-8 rounded-full">
              <img src={service.images.length > 0 ? service.images[0].image : default_img} />
            </div>
          </div>
        </div>

        <h3 className="card-title text-sm leading-tight mb-2">{service.title}</h3>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{service.requirements}</p>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{service.rating}</span>
          </div>
          <span className="text-xs text-base-content/50">({service.reviews})</span>
        </div>

        <div className="card-actions justify-between items-center">
          <div className="text-right">
            <span className="text-lg font-bold text-neutral">${service.price}</span>
          </div>
          {user?.role === "Buyer" &&(
            <Link to={`/service`} className="btn btn-sm btn-outline btn-neutral gap-1">
              Order Now
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
