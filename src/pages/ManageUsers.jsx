import { useEffect, useState } from "react";
import authApiClient from "../api_services/auth-api-client";
import { TrashIcon } from "@heroicons/react/24/outline";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await authApiClient.get("/users/");
      setUsers(response.data);
    } catch (error) {
      setErrorMsg("Failed to fetch users.",error);
    } finally {
      setLoading(false);
    }
  };

  console.log("user",users);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setDeletingId(userId);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await authApiClient.delete(`/users/${userId}/`);
      setSuccessMsg("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      setErrorMsg("Failed to delete user.",error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Users</h2>

      {/* Success & Error Messages */}
      {successMsg && (
        <div className="alert alert-success mb-4 shadow-sm">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="alert alert-error mb-4 shadow-sm">{errorMsg}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner text-neutral loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Address</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                        <span
                            className={`badge ${
                                user.role === "Seller"
                                ? "badge-primary"
                                : user.role === "Buyer"
                                ? "badge-secondary"
                                : "badge-neutral"
                            }`}
                        >
                            {user.role ? user.role : "Admin"}
                        </span>
                    </td>
                    <td>{user.phone_number || "-"}</td>
                    <td>{user.address || "-"}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                        className="btn btn-sm btn-error flex items-center gap-1"
                      >
                        {deletingId === user.id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <TrashIcon className="h-4 w-4" />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
