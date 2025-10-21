import { useEffect, useState } from 'react';
import CategoryCard from '../component/CategoryCard';
import apiClient from '../api_services/api-Client';


const Category = () => {
  const [loading, setLoading] = useState(false);

  const [categories,setCategories] = useState([])
  
    useEffect(() =>{
        setLoading(true)
      apiClient.get("/categories")
          .then(res => setCategories(res.data))
          .catch((error) =>{
            console.log(error);
          })
          .finally(() =>{
            setLoading(false)
          })
    },[])

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">All Categories</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
