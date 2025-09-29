const OrderItems = ({ service }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 font-medium">{service.title}</td>
      <td className="px-4 py-3 text-right">${service.price.toFixed(2)}</td>
      <td className="px-4 py-3 text-right">{service.delivery_time} days</td>
    </tr>
  );
};

export default OrderItems;