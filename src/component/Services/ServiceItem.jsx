
import { Link } from "react-router";
import ServiceCard from "./ServiceCard";


const ServiceItem = ({ service , refreshServices}) => {
    if (!service) {
        return <p>Loading...</p>;
    }
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <ServiceCard service={service} refreshServices={refreshServices} />

      </div>
  )
}

export default ServiceItem
