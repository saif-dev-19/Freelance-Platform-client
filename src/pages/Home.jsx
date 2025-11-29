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
        <div className="bg-[#F8FAFC]">
            <HeroCarousel />
            <Categories />
            <Features />
            <ServicesSection />
            {/* Top Sellers & Buyers Section */}
            <div className="px-8 py-20 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent mb-4">
                            Top Community Members
                        </h2>
                        <p className="text-gray-600 text-lg">Meet our most active sellers and buyers</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Top Sellers */}
                        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/50 rounded-3xl overflow-hidden hover:shadow-[0_8px_30px_rgba(109,40,217,0.15)] transition-all duration-500">
                            <div className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] p-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Top Sellers
                                </h2>
                            </div>
                            <div className="card-body p-8">
                                {summary.top_sellers && summary.sellers.length > 0 ? (
                                    <ul className="space-y-4">
                                        {summary.top_sellers.map((seller, index) => (
                                            <li 
                                                key={seller.id} 
                                                className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 hover:bg-indigo-50 p-3 rounded-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <img 
                                                            src={seller.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                                            alt={`${seller.first_name} ${seller.last_name}`} 
                                                            className="w-14 h-14 rounded-full object-cover ring-4 ring-indigo-100"
                                                        />
                                                        <span className="absolute -top-1 -left-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-semibold text-gray-800">
                                                            {seller.first_name} {seller.last_name}
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
                                    <p className="text-gray-500 text-center py-8">No sellers found.</p>
                                )}
                            </div>
                        </div>

                        {/* Top Buyers */}
                        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/50 rounded-3xl overflow-hidden hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                            <div className="bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] p-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Top Buyers
                                </h2>
                            </div>
                            <div className="card-body p-8">
                                {summary.top_buyers && summary.buyers.length > 0 ? (
                                    <ul className="space-y-4">
                                        {summary.top_buyers.map((buyer, index) => (
                                            <li 
                                                key={buyer.id} 
                                                className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 hover:bg-purple-50 p-3 rounded-lg transition-all duration-200"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <img 
                                                            src={buyer.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                                            alt={`${buyer.first_name} ${buyer.last_name}`} 
                                                            className="w-14 h-14 rounded-full object-cover ring-4 ring-purple-100"
                                                        />
                                                        <span className="absolute -top-1 -left-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-semibold text-gray-800">
                                                            {buyer.first_name} {buyer.last_name}
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
                                    <p className="text-gray-500 text-center py-8">No buyers found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;