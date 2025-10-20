import { useEffect, useState } from "react";
import authApiClient from "../api_services/auth-api-client";
import { Trash2 } from "lucide-react";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await authApiClient.get("/services/");
      setServices(response.data.results || response.data);
    } catch (error) {
        console.log(error);
      setErrorMsg("Failed to load services.",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  console.log("admin",services[1]);

  //Delete Service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setDeleteLoading(id);
    try {
      await authApiClient.delete(`/services/${id}/`);
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete service");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

        {errorMsg && (
          <div className="alert alert-error mb-4 shadow">{errorMsg}</div>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-neutral"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No services found
                    </td>
                  </tr>
                )}
                {services.map((service, index) => (
                  <tr key={service.id}>
                    <td>{index + 1}</td>
                    <td>{service.title}</td>
                    <td>
                      {service.seller?.first_name
                        ? `${service.seller.first_name} ${service.seller.last_name}`
                        : "N/A"}
                    </td>
                    <td>${service.price}</td>
                    <td>{service.category?.name}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="btn btn-error btn-sm text-white"
                        disabled={deleteLoading === service.id}
                      >
                        {deleteLoading === service.id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <Trash2 size={16} />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServices;
