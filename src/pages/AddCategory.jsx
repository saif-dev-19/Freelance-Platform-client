import { useForm } from "react-hook-form";
import { useState } from "react";
import authApiClient from "../api_services/auth-api-client";

const AddCategory = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await authApiClient.post("/categories/", data);
      if (response.status === 201) {
        setSuccessMsg("Category added successfully!");
        reset();
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.detail ||
        "Failed to add category. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add New Category
        </h2>

        
        {/* Success & Error Message */}
        {successMsg && (
          <div className="alert alert-success shadow-sm mb-4">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="alert alert-error shadow-sm mb-4">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Category name is required" })}
              className={`input input-bordered w-full text-black ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Optional Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full text-black"
              placeholder="Enter category description"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-neutral w-full"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
