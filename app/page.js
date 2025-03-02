"use client";

import { TopBar } from '@/app/componenets/topbar.jsx';
import NewArrivals from './componenets/newArrivals';
import TopSelling from './componenets/topselling';
import Footer from './componenets/footer';
import { useEffect, useState } from 'react';
import BrowseByCategory from './componenets/browseCategory';
import Image from 'next/image';

export default function Home() {

  const [categories, setCategories] = useState([]);
  const [banner, setBanner] = useState('');

  const fetchCategoryAndBanner = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/category?limit=6`);
      const data = await response.json();
      setCategories(data.categories);
      setBanner(data.websiteBanner[0]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchCategoryAndBanner();
  }, []);

  return (
    <div className="bg-[#191919]">
      <div className="relative w-full min-h-[50vh] lg:min-h-[70vh]">
        {/* Banner Image */}
        <div className="absolute inset-0">
          {banner.image? (
            <Image
            src={banner.image}
            alt="product banner"
            fill
            priority
            className="object-cover brightness-50"
          />
          ): null}
          
        </div>

        <TopBar/>
        
        <div className="relative z-10 flex flex-col justify-center min-h-[50vh] lg:min-h-[70vh] px-4 pb-8 lg:px-20 font-sans container">
          <div className="max-w-2xl mx-auto pt-20">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {banner.heading}
            </h1>
            <p className="lg:text-lg text-sm text-gray-200 mb-8">
              {banner.subHeading}
            </p>
          </div>
        </div>
      </div>
      <div>
        <NewArrivals/>
      </div>
      <div className='h-0.5 lg:w-2/3 w-3/4 bg-[#FFFFFF1A] mx-auto'></div>
      <div>
        <TopSelling/>
      </div>
      <div>
        <BrowseByCategory categories={categories}/>
      </div>
      <div className='pt-36'>
        <Footer />
      </div>
    </div>
  );
} 