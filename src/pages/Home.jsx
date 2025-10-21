import React, { useEffect } from 'react';
import HeroCarousel from '../component/Home/Carousel/HeroCarousel';
import axios from 'axios';
import Features from '../component/Home/Features';
import Categories from '../component/Home/Category/Categories';
import ServicesSection from '../component/Services/ServicesSection';
import useFetchUsers from '../hooks/useFetchUsers';

const Home = () => {
    const{summary} = useFetchUsers();
    useEffect(() =>{
        axios.get("https://freelance-platform-delta.vercel.app/api/services")
        .then(res => console.log(res.data.results))
    },[])

    return (
        <div>
            <HeroCarousel />
            <Categories />
            <Features />
            <ServicesSection />
            {/* Top Sellers & Buyers Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-3 mb-3">
                {/* Top Sellers */}
                <div className="card bg-white shadow-xl border border-gray-200 rounded-lg">
                <div className="card-body p-8">
                    <h2 className="text-2xl font-bold text-neutral mb-6">Top Sellers</h2>
                    {summary.top_sellers && summary.sellers.length > 0 ? (
                    <ul className="space-y-6">
                        {summary.top_sellers.map((seller, index) => (
                        <li 
                            key={seller.id} 
                            className="flex justify-between items-center border-b border-gray-200 pb-4"
                        >
                            <div className="flex items-center space-x-4">
                            {/* Avatar */}
                            <img 
                                src={seller.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                alt={`${seller.first_name} ${seller.last_name}`} 
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-base font-medium">
                                {index + 1}. {seller.first_name} {seller.last_name}
                                </p>
                                <p className="text-sm text-gray-500">
                                Joined: {new Date(seller.date_joined).toLocaleDateString()}
                                </p>
                            </div>
                            </div>
                            
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="text-gray-500 text-sm">No sellers found.</p>
                    )}
                </div>
                </div>

            {/* Top Buyers */}
            <div className="card bg-white shadow-xl border border-gray-200 rounded-lg">
                <div className="card-body p-8">
                <h2 className="text-2xl font-bold text-neutral mb-6">Top Buyers</h2>
                {summary.top_buyers && summary.buyers.length > 0 ? (
                    <ul className="space-y-6">
                    {summary.top_buyers.map((buyer, index) => (
                        <li 
                        key={buyer.id} 
                        className="flex justify-between items-center border-b border-gray-200 pb-4"
                        >
                        <div className="flex items-center space-x-4">
                            {/* Avatar */}
                            <img 
                            src={buyer.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                            alt={`${buyer.first_name} ${buyer.last_name}`} 
                            className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                            <p className="text-base font-medium">
                                {index + 1}. {buyer.first_name} {buyer.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Joined: {new Date(buyer.date_joined).toLocaleDateString()}
                            </p>
                            </div>
                        </div>
                        
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm">No buyers found.</p>
                )}
                </div>
            </div>
        </div>  
        </div>
    );
};

export default Home;