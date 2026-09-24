import React from 'react';
import HeroCarousel from '../component/Home/Carousel/HeroCarousel';
import Features from '../component/Home/Features';
import Categories from '../component/Home/Category/Categories';
import ServicesSection from '../component/Services/ServicesSection';
import useFetchUsers from '../hooks/useFetchUsers';

const Home = () => {
    const{summary} = useFetchUsers();

    return (
        <div className="bg-[#F5F7FA]">
            <HeroCarousel />
            <Categories />
            <Features />
            <ServicesSection />
            {/* Top Sellers & Buyers Section */}
            <div className="border-y border-slate-200/70 bg-white px-8 py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#F97316]">The people behind the work</p>
                        <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0F172A] md:text-5xl">
                            Top Community Members
                        </h2>
                        <p className="text-gray-600 text-lg">Meet our most active sellers and buyers</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Top Sellers */}
                        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/50 rounded-3xl overflow-hidden hover:shadow-[0_8px_30px_rgba(109,40,217,0.15)] transition-all duration-500">
                            <div className="bg-[#0F172A] p-8">
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
                            <div className="bg-[#1D4ED8] p-8">
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

            <section className="bg-[#0F172A] px-8 py-24 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 max-w-2xl">
                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#F97316]">Simple by design</p>
                        <h2 className="text-3xl font-black tracking-tight sm:text-5xl">From first brief to finished work.</h2>
                        <p className="mt-5 text-lg leading-relaxed text-slate-300">A clear path for ambitious projects, whether you are hiring your next specialist or building a reputation one great delivery at a time.</p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            { number: '01', title: 'Describe the work', text: 'Share your goal, timeline, and budget. The right brief makes every next step easier.' },
                            { number: '02', title: 'Choose your specialist', text: 'Compare services, ratings, and delivery details before you commit.' },
                            { number: '03', title: 'Make it real', text: 'Collaborate with confidence and keep the work moving toward launch.' },
                        ].map((step) => (
                            <div key={step.number} className="border-t border-white/20 pt-6">
                                <span className="text-sm font-bold text-[#38BDF8]">{step.number}</span>
                                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                                <p className="mt-3 leading-relaxed text-slate-400">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#F5F7FA] px-8 py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
                    <div>
                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#3B82F6]">Built for momentum</p>
                        <h2 className="max-w-2xl text-3xl font-black tracking-tight text-[#0F172A] sm:text-5xl">Good work deserves a better starting point.</h2>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">Find focused expertise without the noise. VirtualBazar keeps discovery, communication, and delivery in one calm workspace.</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Verified profiles</span>
                            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Clear delivery times</span>
                            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Real buyer reviews</span>
                        </div>
                    </div>
                    <div className="rounded-[2rem] bg-[#F97316] p-8 text-[#0F172A] shadow-[0_24px_60px_rgba(249,115,22,0.25)] sm:p-10">
                        <p className="text-sm font-bold uppercase tracking-[0.2em]">Ready when you are</p>
                        <h3 className="mt-5 text-3xl font-black">Your next useful conversation is one click away.</h3>
                        <a href="/services" className="mt-8 inline-flex rounded-xl bg-[#0F172A] px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[#0F172A]">Browse services</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;