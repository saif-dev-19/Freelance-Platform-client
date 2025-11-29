import ServiceCard from "./ServiceCard";

const ServiceItem = ({ service, refreshServices }) => {
  if (!service) {
    return <p>Loading...</p>;
  }
  
  return <ServiceCard service={service} refreshServices={refreshServices} />;
}

export default ServiceItem;
