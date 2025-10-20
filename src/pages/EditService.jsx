import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useFetchCategories from "../hooks/useFetchCategories";
import authApiClient from "../api_services/auth-api-client";


const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const categories = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await authApiClient.get(`/services/${id}/`);
        const data = res.data;
        console.log("data",data.category.name);
        setValue("title", data.title);
        setValue("requirements", data.requirements);
        setValue("price", data.price);
        setValue("delivery_time", data.delivery_time);
        setSelectedCategory(data.category.name);

        if (data.images && data.images.length > 0) {
          setExistingImages(data.images);
        }
      } catch (error) {
        console.error("Failed to fetch service", error);
      }
    };

    fetchService();
  }, [id, setValue]);

  

  const handleRemoveExistingImage = (imageId) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

 
  const handleNewImages = (e) => {
    setNewImages([...e.target.files]);
  };


  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("requirements", formData.requirements);
      form.append("price", formData.price);
      form.append("delivery_time", formData.delivery_time);

      const selectedCatObj = categories.find(
        (cat) => cat.name === selectedCategory
      );
      if (selectedCatObj) {
        form.append("category_id", selectedCatObj.id);
      }
      console.log("cat",selectedCatObj.id);

      newImages.forEach((file) => form.append("new_images", file));

      const remainingImageIds = existingImages.map((img) => img.id);
      form.append("existing_images", JSON.stringify(remainingImageIds));

      await authApiClient.put(`/services/${id}/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/dashboard/my-services");
    } catch (error) {
      console.error("Failed to update service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Service</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            {...register("title")}
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter service title"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium mb-1">Requirements</label>
          <textarea
            {...register("requirements")}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Enter service requirements"
          ></textarea>
        </div>

        {/* Price & Delivery */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              className="input input-bordered w-full"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Delivery Time (days)</label>
            <input
              {...register("delivery_time")}
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter delivery time"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register("category")}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Existing Images */}
        <div>
          <label className="block text-sm font-medium mb-1">Existing Images</label>
          <div className="flex flex-wrap gap-3">
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={img.image}
                  alt="Existing"
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img.id)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Images */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleNewImages}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditService;
