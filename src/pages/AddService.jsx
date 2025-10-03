import { useForm } from "react-hook-form";
import { useState } from "react";
import authApiClient from "../api_services/auth-api-client";
import useFetchCategories from "../hooks/useFetchCategories";

const AddService = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [serviceID, setServiceID] = useState(null);
  const [images, setImages] = useState([]);
  const [imgUploading, setImgUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const categories = useFetchCategories();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await authApiClient.post("/services/", data);

      if (response.status === 201) {
        setServiceID(response.data.id);
        setSuccessMsg("Service created successfully! Now upload images.");
        reset();
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Failed to create service.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) =>{
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files)
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));

  }

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!images.length) {
      setErrorMsg("Please select images to upload.");
      return;
    }

    setImgUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      for (const img of images) {
        const formData = new FormData();
        formData.append("image", img);

        await authApiClient.post(`/services/${serviceID}/images/`, formData);
      }
      setSuccessMsg("Images uploaded successfully!");
      setImages([]);
    } catch (error) {
      setErrorMsg("Failed to upload images.");
      console.log("image error",error);
    } finally {
      setImgUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Service</h2>

        {/* Success & Error */}
        {successMsg && (
          <div className="alert alert-success shadow-sm mb-4">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="alert alert-error shadow-sm mb-4">{errorMsg}</div>
        )}

        {/* If productID not created → show service form */}
        {!serviceID ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`input input-bordered w-full text-black ${
                  errors.title ? "border-red-500" : ""
                }`}
                placeholder="Enter service title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required" })}
                className={`input input-bordered w-full text-black no-spinner ${
                  errors.price ? "border-red-500" : ""
                }`}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements
              </label>
              <textarea
                {...register("requirements", {
                  required: "Requirements are required",
                })}
                className={`textarea textarea-bordered w-full text-black ${
                  errors.requirements ? "border-red-500" : ""
                }`}
                placeholder="What do you need from the buyer?"
              ></textarea>
              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.requirements.message}
                </p>
              )}
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Time (Days)
              </label>
              <input
                type="number"
                {...register("delivery_time", {
                  required: "Delivery time is required",
                  min: { value: 1, message: "Minimum 1 day" },
                })}
                className={`input input-bordered w-full text-black no-spinner ${
                  errors.delivery_time ? "border-red-500" : ""
                }`}
                placeholder="Enter delivery time"
              />
              {errors.delivery_time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.delivery_time.message}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className={`select select-bordered w-full text-black ${
                  errors.category ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-neutral w-full"
            >
              {loading ? "Adding..." : "Add Service"}
            </button>
          </form>
        ) : (
          /* If productID → show image upload */
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              {previewImages.length > 0 && <div className="flex gap-2 mt-2">
                  {previewImages.map((src,idx) => (
                    <img key={idx} src={src} alt="preview" className="w-16 h-16 rounded-md object-cover" />
                  ))}
              </div>}
            </div>

            <button
              onClick={handleImageUpload}
              disabled={imgUploading}
              className="btn btn-neutral w-full"
            >
              {imgUploading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for removing number input spinner */}
      <style>
        {`
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </div>
  );
};

export default AddService;
