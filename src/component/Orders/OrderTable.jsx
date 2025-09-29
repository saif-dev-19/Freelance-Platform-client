import { useEffect } from "react";
import OrderItems from "./OrderItems";

const OrderTable = ({ services }) => {
  useEffect(()=> {
    console.log(services);
  },[])
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-4 py-3 text-left">Service</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">Delivary Time</th>
          </tr>
        </thead>
        <tbody>
            <OrderItems key={services.id} service={services} />  
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;