import React, { useEffect } from 'react';
import HeroCarousel from '../component/Home/Carousel/HeroCarousel';
import axios from 'axios';
import Features from '../component/Home/Features';
import Categories from '../component/Home/Category/Categories';
import ServicesSection from '../component/Services/ServicesSection';

const Home = () => {
    
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
        </div>
    );
};

export default Home;