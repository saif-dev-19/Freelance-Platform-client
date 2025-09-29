
import { Link } from "react-router";
import ServiceCard from "./ServiceCard";


const ServiceItem = ({ service }) => {
    console.log("services.jsx",service);
    if (!service) {
        return <p>Loading...</p>;
    }
    console.log("services.jsx",service);
  return (
    <Link to={`/services/${service.id}/`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <ServiceCard service={service}/>

      </div>
    </Link>
  )
}

export default ServiceItem
